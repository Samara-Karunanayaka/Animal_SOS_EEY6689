namespace AnimalRescueBackend.Models;

public class Assignment
{
    public int Id { get; set; }

    public int CaseId { get; set; }

    public int RescuerId { get; set; }

    public string Status { get; set; } = "ASSIGNED";

    public double DistanceKm { get; set; }
}
