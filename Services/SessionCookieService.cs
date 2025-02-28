namespace AspNetReactPOC.Services;

using Microsoft.AspNetCore.Http;
using System;

public class SessionCookieService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public SessionCookieService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public void SetSessionAndCookie(string key, string value, bool httpOnly = false)
    {
        var context = _httpContextAccessor.HttpContext;
        if (context == null) return;

        // Set Session
        context.Session.SetString(key, value);

        // Set Cookie
        context.Response.Cookies.Append(key, value, new CookieOptions
        {
            HttpOnly = httpOnly,
            SameSite = SameSiteMode.Strict,
            Secure = true, // Enforce HTTPS
            Expires = DateTime.UtcNow.AddMinutes(30) // Set expiration time (adjustable)
        });
    }

    public void ClearSessionAndCookie(string key)
    {
        var context = _httpContextAccessor.HttpContext;
        if (context == null) return;

        context.Session.Remove(key);
        context.Response.Cookies.Delete(key);

        // Remove the cookie by setting it to expire in the past
        var options = new CookieOptions
        {
            Expires = DateTime.UtcNow.AddDays(-1), // Expire the cookie
            HttpOnly = false,
            SameSite = SameSiteMode.Strict,
            Secure = true, // Enforce HTTPS
        };

        context?.Response.Cookies.Append(key, "", options);
    }
}