using Microsoft.AspNetCore.Mvc;

namespace AnimalRescueBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatbotController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public ChatbotController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    // Animal Rescue Knowledge Base
    private static readonly Dictionary<string, KnowledgeItem> _knowledgeBase = new()
    {
        ["reporting"] = new KnowledgeItem
        {
            Keywords = new[] { "report", "stray", "injured", "abandoned", "found", "rescue" },
            Content = @"
How to Report an Animal:
1. Take photos of the animal from a safe distance
2. Note the location, time, and condition
3. Call our 24/7 hotline: +94 11 234 1900
4. Or use our online reporting form at /report
5. Provide as much detail as possible about the animal's appearance, behavior, and location
6. If the animal is in immediate danger, contact local authorities first
            "
        },
        ["adoption"] = new KnowledgeItem
        {
            Keywords = new[] { "adopt", "adoption", "take home", "foster", "pet" },
            Content = @"
Adoption Process:
1. Browse available animals on our adoption page
2. Fill out an adoption application
3. Meet and greet with the animal
4. Home visit to ensure suitability
5. Pay adoption fee ($50-200 depending on animal)
6. Sign adoption contract
7. Take your new family member home!

Requirements:
- Must be 18+ years old
- Valid ID and proof of address
- References may be required
- Some animals require fenced yards or specific living conditions
            "
        },
        ["donation"] = new KnowledgeItem
        {
            Keywords = new[] { "donate", "donation", "support", "help", "money", "fund" },
            Content = @"
Ways to Support Us:
1. Monetary Donations: Visit /donate for one-time or recurring gifts
2. Supplies: We need food, bedding, toys, and medical supplies
3. Volunteering: Help with animal care, events, or administrative tasks
4. Sponsorship: Sponsor a specific animal's care
5. Wish List: Check our Amazon wishlist for needed items

Tax-deductible donations accepted. Every contribution helps save lives!
            "
        },
        ["volunteering"] = new KnowledgeItem
        {
            Keywords = new[] { "volunteer", "help", "assist", "time", "work" },
            Content = @"
Volunteer Opportunities:
1. Animal Care: Feeding, walking, cleaning
2. Event Support: Adoption events, fundraisers
3. Administrative: Data entry, phone support
4. Foster Care: Provide temporary homes
5. Transportation: Help transport animals

Requirements:
- Complete volunteer application
- Attend orientation session
- Commit to regular schedule
- Background check may be required

Contact: volunteers@animalrescue.lk
            "
        },
        ["tracking"] = new KnowledgeItem
        {
            Keywords = new[] { "track", "status", "case", "update", "progress" },
            Content = @"
Track Your Case:
1. Go to /track-cases
2. Enter your case number (provided when you reported)
3. View real-time updates on rescue progress
4. Receive notifications via email/SMS
5. Contact us if you have questions about your case

We update cases regularly and aim to resolve them as quickly as possible.
            "
        },
        ["emergency"] = new KnowledgeItem
        {
            Keywords = new[] { "emergency", "urgent", "danger", "hurt", "dying", "immediate" },
            Content = @"
Emergency Situations:
If an animal is in immediate danger:
1. Call emergency services: 911
2. Then call our hotline: +94 11 234 1900
3. Do not attempt to handle dangerous situations yourself
4. Provide exact location and description

For animal cruelty or abuse:
- Contact local animal control
- Report to authorities
- Document with photos if safe

We work closely with law enforcement for emergency rescues.
            "
        }
    };

    [HttpPost("chat")]
    public async Task<IActionResult> Chat([FromBody] ChatRequest request)
    {
        try
        {
            // Find relevant knowledge (RAG)
            var relevantInfo = FindRelevantKnowledge(request.Message);

            var systemMessage = @"You are an AI assistant for an animal rescue system called Animal Rescue Assistant.
Help users with reporting injured or stray animals, adoption processes, donations, volunteering, tracking rescue cases, and general animal welfare information.
Be friendly, helpful, and provide accurate information. If users need urgent help, direct them to call emergency services.

" + (relevantInfo.Any() ? $"Relevant Information:\n{string.Join("\n\n", relevantInfo)}\n\n" : "") + @"User message: " + request.Message + @"

Please provide a helpful response based on the available information. If the user is asking about something not covered in the knowledge base, provide general guidance and suggest contacting us for specific help.";

            var apiKey = _configuration["GoogleAI:ApiKey"];
            
            // Check if API key is configured
            if (string.IsNullOrEmpty(apiKey))
            {
                return Ok(new ChatResponse
                {
                    Message = "Google API key not configured. Using knowledge base response: " + 
                              GetKnowledgeBaseFallback(request.Message),
                    Timestamp = DateTime.Now
                });
            }

            var httpClient = _httpClientFactory.CreateClient();

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = systemMessage }
                        }
                    }
                }
            };

            var jsonContent = System.Text.Json.JsonSerializer.Serialize(requestBody);
            var httpContent = new StringContent(jsonContent, System.Text.Encoding.UTF8, "application/json");

            try
            {
                var response = await httpClient.PostAsync(
                    $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={apiKey}",
                    httpContent);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var geminiResponse = System.Text.Json.JsonSerializer.Deserialize<GeminiResponse>(responseContent);

                    return Ok(new ChatResponse
                    {
                        Message = geminiResponse?.candidates?[0]?.content?.parts?[0]?.text ?? "I couldn't generate a response.",
                        Timestamp = DateTime.Now
                    });
                }
                else
                {
                    // Fallback to knowledge base if Google API fails
                    var fallbackResponse = GetKnowledgeBaseFallback(request.Message);
                    return Ok(new ChatResponse
                    {
                        Message = fallbackResponse,
                        Timestamp = DateTime.Now
                    });
                }
            }
            catch (Exception)
            {
                // Network error or timeout - use knowledge base fallback
                var fallbackResponse = GetKnowledgeBaseFallback(request.Message);
                return Ok(new ChatResponse
                {
                    Message = fallbackResponse,
                    Timestamp = DateTime.Now
                });
            }
        }
        catch (Exception)
        {
            return Ok(new ChatResponse
            {
                Message = GetKnowledgeBaseFallback(request.Message),
                Timestamp = DateTime.Now
            });
        }
    }

    private string GetKnowledgeBaseFallback(string userMessage)
    {
        var relevantTopics = new List<(string Content, int Relevance)>();
        var message = userMessage.ToLower();

        foreach (var item in _knowledgeBase)
        {
            var relevance = item.Value.Keywords.Count(keyword => message.Contains(keyword));
            if (relevance > 0)
            {
                relevantTopics.Add((item.Value.Content, relevance));
            }
        }

        if (relevantTopics.Any())
        {
            var bestMatch = relevantTopics.OrderByDescending(x => x.Relevance).First().Content;
            return $"Based on our animal rescue knowledge base:\n\n{bestMatch}\n\nFor more personalized assistance, please contact our team at +94 11 234 1900.";
        }

        return @"Thank you for reaching out! I'm the Animal Rescue Assistant. I can help you with:
- Reporting an injured or stray animal
- Adoption processes
- Making donations  
- Volunteering opportunities
- Tracking rescue cases

What can I help you with today? Or call our 24/7 hotline: +94 11 234 1900";
    }

    private List<string> FindRelevantKnowledge(string userMessage)
    {
        var message = userMessage.ToLower();
        var relevantTopics = new List<(string Content, int Relevance)>();

        foreach (var item in _knowledgeBase)
        {
            var relevance = item.Value.Keywords.Count(keyword => message.Contains(keyword));
            if (relevance > 0)
            {
                relevantTopics.Add((item.Value.Content, relevance));
            }
        }

        return relevantTopics
            .OrderByDescending(x => x.Relevance)
            .Take(2)
            .Select(x => x.Content)
            .ToList();
    }
}

public class ChatRequest
{
    public string Message { get; set; } = string.Empty;
}

public class ChatResponse
{
    public string Message { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
}

public class KnowledgeItem
{
    public string[] Keywords { get; set; } = Array.Empty<string>();
    public string Content { get; set; } = string.Empty;
}

public class GeminiResponse
{
    public Candidate[]? candidates { get; set; }
}

public class Candidate
{
    public Content? content { get; set; }
}

public class Content
{
    public Part[]? parts { get; set; }
}

public class Part
{
    public string? text { get; set; }
}