using Microsoft.AspNetCore.Mvc;
using AnimalRescueBackend.Models;
using AnimalRescueBackend.Services;

namespace AnimalRescueBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RescueCasesController : ControllerBase
{
    private static List<RescueCase> cases = new();
    private readonly AssignmentService _assignmentService;

    public RescueCasesController()
    {
        _assignmentService = new AssignmentService();
    }

    // GET: api/rescuecases
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(cases);
    }

    // POST: api/rescuecases
    [HttpPost]
    public IActionResult Create([FromBody] RescueCase newCase)
    {
        newCase.Id = cases.Count + 1;
        newCase.Status = "PENDING";

        cases.Add(newCase);

        return Ok(newCase);
    }

    // PATCH: api/rescuecases/{id}/status
    [HttpPatch("{id}/status")]
    public IActionResult UpdateStatus(int id, [FromBody] string status)
    {
        var existing = cases.FirstOrDefault(x => x.Id == id);
        if (existing == null) return NotFound();

        existing.Status = status;

        return Ok(existing);
    }
}
