using ContactApp.Data;
using ContactApp.Models;
using ContactApp.Models_DTO.Request;
using ContactApp.Models_DTO.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ContactsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ContactsController> _logger;

    public ContactsController(ApplicationDbContext context, ILogger<ContactsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    private User AuthenticatedUser => HttpContext.Items["AuthenticatedUser"] as User;


    [HttpGet]
    public async Task<IActionResult> GetContacts()
    {
        var user = AuthenticatedUser;
        if (user == null)
        {
            return Unauthorized();
        }

        var contacts = await _context.Contacts
            .Where(c => c.UserId == user.Id)
            .AsNoTracking()
            .Select(c => new ContactResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                PhoneNumber = c.PhoneNumber
            })
            .ToListAsync();

        return Ok(contacts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetContact(int id)
    {
        var user = AuthenticatedUser;
        if (user == null)
        {
            return Unauthorized();
        }

        var contact = await _context.Contacts.FindAsync(id);
        if (contact == null)
        {
            return NotFound();
        }
        return Ok(contact);
    }

    [HttpPost]
    public async Task<IActionResult> AddContact([FromBody] ContactDto contactDto)
    {
        var user = AuthenticatedUser;
        if (user == null)
        {
            return Unauthorized();
        }

        var contact = new Contact
        {
            Name = contactDto.Name,
            PhoneNumber = contactDto.PhoneNumber,
            UserId = user.Id
        };

        _context.Contacts.Add(contact);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetContacts), new { id = contact.Id }, contact);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateContact(int id, [FromBody] ContactDto contactDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = AuthenticatedUser;
        if (user == null)
        {
            return Unauthorized();
        }

        var contact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id && c.UserId == user.Id);

        if (contact == null)
        {
            return NotFound();
        }

        contact.Name = contactDto.Name;
        contact.PhoneNumber = contactDto.PhoneNumber;

        _context.Entry(contact).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContact(int id)
    {
        var user = AuthenticatedUser;
        if (user == null)
        {
            return Unauthorized();
        }

        var contact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id && c.UserId == user.Id);

        if (contact == null)
        {
            return NotFound();
        }

        _context.Contacts.Remove(contact);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
