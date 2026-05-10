using AnimalRescueBackend.Models;

namespace AnimalRescueBackend.Services;

public class AssignmentService
{
    private readonly GeoService _geoService;

    public AssignmentService()
    {
        _geoService = new GeoService();
    }

    public Rescuer GetBestRescuer(RescueCase caseItem, List<Rescuer> rescuers)
    {
        Rescuer best = null;
        double bestScore = double.MaxValue;

        foreach (var r in rescuers)
        {
            if (!r.IsAvailable) continue;

            double distance = _geoService.CalculateDistance(
                caseItem.Latitude,
                caseItem.Longitude,
                r.Latitude,
                r.Longitude
            );

            double score = distance;

            if (caseItem.Priority == "HIGH")
                score *= 0.5;
            else if (caseItem.Priority == "LOW")
                score *= 1.5;

            if (score < bestScore)
            {
                bestScore = score;
                best = r;
            }
        }

        return best;
    }
}
