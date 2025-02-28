namespace AspNetReactPOC.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using AspNetReactPOC.Services;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private static readonly Dictionary<string, string> users = new()
    {
        { "admin@gmail.com", "Admin@123" },
        { "user@gmail.com", "Test@123" }
    };

    private static readonly Dictionary<string, string> roles = new()
    {
        { "admin@gmail.com", "admin" },
        { "user@gmail.com", "user" }
    };

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request, [FromServices] SessionCookieService sessionCookieService)
    {
        if (users.ContainsKey(request.Email) && users[request.Email] == request.Password)
        {
            sessionCookieService.SetSessionAndCookie("username", request.Email);
            sessionCookieService.SetSessionAndCookie("role", roles[request.Email]);

            return Ok(new { message = "Login successful", username = request.Email, role = roles[request.Email] });
        }
        return Unauthorized(new { message = "Invalid credentials" });
    }

    [HttpPost("logout")]
    public IActionResult Logout([FromServices] SessionCookieService sessionCookieService)
    {
        sessionCookieService.ClearSessionAndCookie("username");
        sessionCookieService.ClearSessionAndCookie("role");
        HttpContext.Session.Clear();
        
        return Ok(new { message = "Logged out successfully" });
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}