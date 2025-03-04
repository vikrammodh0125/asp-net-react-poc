namespace AspNetReactPOC.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using AspNetReactPOC.Services;
using System.Collections.Generic;
using System.Linq;
using AspNetReactPOC.Models;
using AspNetReactPOC.Data;

[Route("api/user-management")]
[ApiController]
public class UserManagementController : ControllerBase
{
    private static readonly List<User> users = new()
    {
        new User { Id = 1, Name = "Vikram Modh", Email = "vikram.modh@gmail.com" },
        new User { Id = 2, Name = "Manav Oza", Email = "manav.oza@gmail.com" },
        new User { Id = 3, Name = "John Doe", Email = "john.doe@gmail.com" }
    };
    private readonly SessionCookieService _sessionService;
    private readonly AppDbContext _dbContext;

    public UserManagementController(AppDbContext dbContext) {
        _dbContext = dbContext;
    }

    [HttpGet("me")]
    public IActionResult GetCurrentUser([FromServices] SessionCookieService sessionCookieService)
    {
        var username = HttpContext.Session.GetString("username");
        var role = HttpContext.Session.GetString("role");

        if (string.IsNullOrEmpty(username))
        {
            sessionCookieService.ClearSessionAndCookie("username");
            sessionCookieService.ClearSessionAndCookie("role");
            HttpContext.Session.Clear();
            return Unauthorized(new { message = "User not logged in" });
        }

        return Ok(new { email = username, role });
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _dbContext.Users.ToListAsync();
        return Ok(users);
    }

    [HttpGet("notes")]
    public async Task<IActionResult> GetNotes()
    {
        var notes = await _dbContext.Notes.ToListAsync();
        return Ok(notes);
    }

    [HttpPost]
    public IActionResult CreateUser([FromBody] User newUser)
    {
        var role = HttpContext.Session.GetString("role");
        if (role != "admin") return Forbid();

        if (users.Any(u => u.Email == newUser.Email))
        {
            return BadRequest(new { message = "User with this email already exists" });
        }

        newUser.Id = users.Max(u => u.Id) + 1; // Auto-increment ID
        users.Add(newUser);

        return CreatedAtAction(nameof(GetUsers), new { id = newUser.Id }, newUser);
    }

    [HttpPost("upsert")]
    public async Task<IActionResult> UpsertUsersWithNotes([FromBody] UserNoteRequest request)
    {
        using var transaction = await _dbContext.Database.BeginTransactionAsync();
        try
        {
            // Process Users
            await ProcessUsers(request.Users);

            // Process Notes
            await ProcessNotes(request.Notes);

            await _dbContext.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok(new { message = "Users and Notes processed successfully" });
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, new { message = "Failed to process users and notes", error = ex.Message });
        }
    }

    private async Task ProcessUsers(List<UserDTO> users)
    {
        foreach (var userDto in users)
        {
            var existingUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);

            if (existingUser != null)
            {
                if (userDto.IsDeleted)
                {
                    _dbContext.Users.Remove(existingUser);
                }
                else
                {
                    existingUser.Name = userDto.Name;
                }
            }
            else if (!userDto.IsDeleted)
            {
                await _dbContext.Users.AddAsync(new User
                {
                    Name = userDto.Name,
                    Email = userDto.Email
                });
            }
        }
    }

    private async Task ProcessNotes(List<NoteDTO> notes)
    {
        foreach (var noteDto in notes)
        {
            var existingNote = await _dbContext.Notes.FindAsync(noteDto.Id);

            if (existingNote != null)
            {
                if (noteDto.IsDeleted)
                {
                    _dbContext.Notes.Remove(existingNote);
                }
                else
                {
                    existingNote.Content = noteDto.Content;
                }
            }
            else if (!noteDto.IsDeleted)
            {
                await _dbContext.Notes.AddAsync(new Note
                {
                    Content = noteDto.Content
                });
            }
        }
    }

    public class UserNoteRequest
    {
        public List<UserDTO> Users { get; set; } = new();
        public List<NoteDTO> Notes { get; set; } = new();
    }

    public class UserDTO
    {
        public int Id { get; set; }  // Optional for new users
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsDeleted { get; set; } = false; // New field
    }

    public class NoteDTO
    {
        public int Id { get; set; }  // Optional for new notes
        public string Content { get; set; }
        public bool IsDeleted { get; set; } = false; // New field
    }
}