namespace AspNetReactPOC.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using AspNetReactPOC.Services;
using System.Collections.Generic;
using System.Linq;

[Route("api/users")]
[ApiController]
public class UserController : ControllerBase
{
    private static readonly List<User> users = new()
    {
        new User { Id = 1, Name = "Vikram Modh", Email = "vikram.modh@gmail.com" },
        new User { Id = 2, Name = "Manav Oza", Email = "manav.oza@gmail.com" },
        new User { Id = 3, Name = "John Doe", Email = "john.doe@gmail.com" }
    };
    private readonly SessionCookieService _sessionService;

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

    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok(users);
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

    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}