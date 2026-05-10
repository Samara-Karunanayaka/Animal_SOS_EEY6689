using Microsoft.AspNetCore.Mvc;
using AnimalRescueBackend.Services;
using AnimalRescueBackend.Models;

namespace AnimalRescueBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssignmentController : ControllerBase
{
    private readonly AssignmentService _assignmentService;

    public AssignmentController()
    {
        _assignmentService = new AssignmentService();
    }

    // Assign a case to nearest volunteer
    [HttpPost("assign/{caseId}")]
    public IActionResult AssignCase(int caseId)
    {
        var result = _assignmentService.AssignToNearestVolunteer(caseId);

        if (result == null)
            return NotFound("No suitable volunteer found or case not found");

        return Ok(result);
    }

    // Get assignment result (optional)
    [HttpGet("status/{caseId}")]
    public IActionResult GetAssignmentStatus(int caseId)
    {
        var result = _assignmentService.GetAssignmentStatus(caseId);

        if (result == null)
            return NotFound("Assignment not found");

        return Ok(result);
    }
}
