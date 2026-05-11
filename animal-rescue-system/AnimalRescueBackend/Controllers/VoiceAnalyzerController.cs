using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace AnimalRescueBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VoiceAnalyzerController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public VoiceAnalyzerController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    // ── Keyword lists ────────────────────────────────────────────────────────
    private static readonly string[] HighUrgencyWords =
    {
        "emergency","urgent","critical","dying","dead","bleeding","hit","accident",
        "immediately","serious","severe","trapped","drowning","attack","pain",
        "suffering","collapsed","unconscious","broken","blood"
    };
    private static readonly string[] MediumUrgencyWords =
    {
        "hurt","limping","sick","weak","stray","lost","scared","hungry","wound",
        "struggling","thin","malnourished","shaking","injured","injury"
    };
    private static readonly string[] DistressWords =
    {
        "please","emergency","help","urgent","immediately","dying",
        "terrible","horrible","awful","poor","desperate","bad"
    };

    // ── POST api/voiceanalyzer/analyze ───────────────────────────────────────
    [HttpPost("analyze")]
    public async Task<IActionResult> AnalyzeVoice([FromBody] VoiceAnalyzeRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Transcript))
            return BadRequest(new { error = "Transcript cannot be empty." });

        try
        {
            VoiceAnalyzeResponse result;
            var apiKey = _configuration["GoogleAI:ApiKey"];

            if (!string.IsNullOrEmpty(apiKey))
            {
                var geminiResult = await AnalyzeWithGemini(request.Transcript, apiKey);
                result = geminiResult ?? AnalyzeWithKeywords(request.Transcript);
            }
            else
            {
                result = AnalyzeWithKeywords(request.Transcript);
            }

            // ── Save to database ─────────────────────────────────────────────
            await SaveToDatabase(request.Transcript, result);

            return Ok(result);
        }
        catch (Exception ex)
        {
            var fallback = AnalyzeWithKeywords(request.Transcript);
            await SaveToDatabase(request.Transcript, fallback);
            return Ok(fallback);
        }
    }

    // ── GET api/voiceanalyzer/history — get all saved results ────────────────
    [HttpGet("history")]
    public async Task<IActionResult> GetHistory()
    {
        try
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            var results = new List<VoiceAnalysisRecord>();

            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            var query = "SELECT TOP 50 * FROM VoiceAnalysisResults ORDER BY CreatedAt DESC";
            using var command = new SqlCommand(query, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                results.Add(new VoiceAnalysisRecord
                {
                    Id             = reader.GetInt32(0),
                    Transcript     = reader.GetString(1),
                    Urgency        = reader.GetString(2),
                    Sentiment      = reader.GetString(3),
                    Tone           = reader.GetString(4),
                    Confidence     = reader.GetDouble(5),
                    Keywords       = reader.GetString(6),
                    Summary        = reader.GetString(7),
                    AnalysisSource = reader.GetString(8),
                    CreatedAt      = reader.GetDateTime(9),
                });
            }

            return Ok(results);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Could not retrieve history: " + ex.Message });
        }
    }

    // ── Save to SQL Server ───────────────────────────────────────────────────
    private async Task SaveToDatabase(string transcript, VoiceAnalyzeResponse result)
    {
        try
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            if (string.IsNullOrEmpty(connectionString)) return;

            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            var query = @"
                INSERT INTO VoiceAnalysisResults 
                    (Transcript, Urgency, Sentiment, Tone, Confidence, Keywords, Summary, AnalysisSource)
                VALUES 
                    (@Transcript, @Urgency, @Sentiment, @Tone, @Confidence, @Keywords, @Summary, @AnalysisSource)";

            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Transcript",     transcript);
            command.Parameters.AddWithValue("@Urgency",        result.Urgency);
            command.Parameters.AddWithValue("@Sentiment",      result.Sentiment);
            command.Parameters.AddWithValue("@Tone",           result.Tone);
            command.Parameters.AddWithValue("@Confidence",     result.Confidence);
            command.Parameters.AddWithValue("@Keywords",       string.Join(", ", result.Keywords));
            command.Parameters.AddWithValue("@Summary",        result.Summary);
            command.Parameters.AddWithValue("@AnalysisSource", result.AnalysisSource);

            await command.ExecuteNonQueryAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Database save error: {ex.Message}");
        }
    }

    // ── Gemini AI Analysis ───────────────────────────────────────────────────
    private async Task<VoiceAnalyzeResponse?> AnalyzeWithGemini(string transcript, string apiKey)
    {
        try
        {
            var httpClient = _httpClientFactory.CreateClient();

            var prompt = $@"You are an AI assistant for an animal rescue emergency system.
Analyze the following voice transcript from someone reporting an animal in need.

Transcript: ""{transcript}""

Respond ONLY with a valid JSON object in this exact format (no extra text):
{{
  ""urgency"": ""High"" or ""Medium"" or ""Low"",
  ""sentiment"": ""Very Urgent"" or ""Urgent"" or ""Concerned"" or ""Calm"",
  ""tone"": ""High-pitched"" or ""Normal"" or ""Calm"",
  ""confidence"": a number between 0.60 and 0.98,
  ""keywords"": [""word1"", ""word2"", ""word3""],
  ""summary"": ""One sentence summary of the situation"",
  ""analysisSource"": ""Gemini AI""
}}

Rules:
- urgency is High if there are emergency words like bleeding, dying, accident, hit by car
- urgency is Medium if animal is hurt, sick, limping, or stray
- urgency is Low if animal seems okay but needs help
- keywords should be the most important words (max 6)";

            var requestBody = new
            {
                contents = new[]
                {
                    new { parts = new[] { new { text = prompt } } }
                }
            };

            var jsonContent = System.Text.Json.JsonSerializer.Serialize(requestBody);
            var httpContent = new StringContent(jsonContent, System.Text.Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync(
                $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={apiKey}",
                httpContent);

            if (!response.IsSuccessStatusCode) return null;

            var responseContent = await response.Content.ReadAsStringAsync();
            var geminiResponse  = System.Text.Json.JsonSerializer.Deserialize<GeminiAnalyzeResponse>(responseContent);
            var rawText         = geminiResponse?.candidates?[0]?.content?.parts?[0]?.text;

            if (string.IsNullOrEmpty(rawText)) return null;

            rawText = rawText.Trim();
            if (rawText.StartsWith("```json")) rawText = rawText.Substring(7);
            if (rawText.StartsWith("```"))     rawText = rawText.Substring(3);
            if (rawText.EndsWith("```"))       rawText = rawText.Substring(0, rawText.Length - 3);
            rawText = rawText.Trim();

            return System.Text.Json.JsonSerializer.Deserialize<VoiceAnalyzeResponse>(rawText,
                new System.Text.Json.JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
        catch { return null; }
    }

    // ── Keyword Fallback ─────────────────────────────────────────────────────
    private VoiceAnalyzeResponse AnalyzeWithKeywords(string transcript)
    {
        var lower        = transcript.ToLower();
        var words        = lower.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        var highCount    = HighUrgencyWords.Count(w => lower.Contains(w));
        var medCount     = MediumUrgencyWords.Count(w => lower.Contains(w));
        var distressCount = DistressWords.Count(w => lower.Contains(w));

        var urgency   = highCount >= 1 ? "High" : medCount >= 1 ? "Medium" : "Low";
        var sentiment = distressCount >= 3 ? "Very Urgent" :
                        distressCount >= 2 ? "Urgent" :
                        distressCount >= 1 ? "Concerned" : "Calm";
        var tone      = urgency == "High" ? "High-pitched" : urgency == "Medium" ? "Normal" : "Calm";

        var stopWords = new HashSet<string>
        {
            "that","this","with","have","from","they","will","been","were",
            "your","what","when","where","there","their","about","which",
            "would","could","should","just","then","than","into","some","also"
        };

        var keywords   = words
            .Select(w => System.Text.RegularExpressions.Regex.Replace(w, "[^a-z]", ""))
            .Where(w => w.Length > 3 && !stopWords.Contains(w))
            .Distinct().Take(6).ToList();

        var confidence = Math.Min(0.97, 0.60 + (highCount + medCount) * 0.07);

        return new VoiceAnalyzeResponse
        {
            Urgency        = urgency,
            Sentiment      = sentiment,
            Tone           = tone,
            Confidence     = Math.Round(confidence, 2),
            Keywords       = keywords,
            Summary        = $"Animal situation reported with {urgency.ToLower()} urgency level.",
            AnalysisSource = "Keyword Analysis"
        };
    }
}

// ── Models ───────────────────────────────────────────────────────────────────
public class VoiceAnalyzeRequest
{
    public string Transcript { get; set; } = string.Empty;
}

public class VoiceAnalyzeResponse
{
    public string Urgency         { get; set; } = string.Empty;
    public string Sentiment       { get; set; } = string.Empty;
    public string Tone            { get; set; } = string.Empty;
    public double Confidence      { get; set; }
    public List<string> Keywords  { get; set; } = new();
    public string Summary         { get; set; } = string.Empty;
    public string AnalysisSource  { get; set; } = string.Empty;
}

public class VoiceAnalysisRecord
{
    public int    Id             { get; set; }
    public string Transcript     { get; set; } = string.Empty;
    public string Urgency        { get; set; } = string.Empty;
    public string Sentiment      { get; set; } = string.Empty;
    public string Tone           { get; set; } = string.Empty;
    public double Confidence     { get; set; }
    public string Keywords       { get; set; } = string.Empty;
    public string Summary        { get; set; } = string.Empty;
    public string AnalysisSource { get; set; } = string.Empty;
    public DateTime CreatedAt    { get; set; }
}

public class GeminiAnalyzeResponse
{
    public AnalyzeCandidate[]? candidates { get; set; }
}
public class AnalyzeCandidate
{
    public AnalyzeContent? content { get; set; }
}
public class AnalyzeContent
{
    public AnalyzePart[]? parts { get; set; }
}
public class AnalyzePart
{
    public string? text { get; set; }
}
