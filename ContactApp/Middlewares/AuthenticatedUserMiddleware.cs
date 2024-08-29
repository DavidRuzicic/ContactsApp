using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using ContactApp.Data;

public class AuthenticatedUserMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<AuthenticatedUserMiddleware> _logger;

    public AuthenticatedUserMiddleware(RequestDelegate next, ILogger<AuthenticatedUserMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, ApplicationDbContext dbContext)
    {
        var username = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(username))
        {
            _logger.LogWarning("No username found in the JWT token.");
        }
        else
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user != null)
            {
                context.Items["AuthenticatedUser"] = user;
            }
            else
            {
                _logger.LogWarning($"User with username '{username}' not found.");
            }
        }

        await _next(context);
    }
}