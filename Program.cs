using BrizaBreath.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.UI.Services;
using BrizaBreath.Services;
using Stripe;
using Microsoft.Extensions.Options;
using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.SameSite = Microsoft.AspNetCore.Http.SameSiteMode.Lax; // or SameSiteMode.Strict
    options.Cookie.SecurePolicy = Microsoft.AspNetCore.Http.CookieSecurePolicy.Always; // Enforce HTTPS
    // Other cookie settings...
});

StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("StripeApiKey");

// Configure Stripe with the API Key from appsettings or environment variable
//StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];

builder.Services.AddDefaultIdentity<IdentityUser>(options =>
{
    options.SignIn.RequireConfirmedAccount = true;
    // Configure your password settings here
    options.Password.RequireNonAlphanumeric = true; // Ensure this is set to true
                                                    // Other options as required
})
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddErrorDescriber<CustomIdentityErrorDescriber>(); // Register the custom error describer

builder.Services.AddRazorPages();
builder.Services.AddMvc().AddRazorPagesOptions(options => options.Conventions.AddPageRoute("/Results/Create", ""));

builder.Services.AddTransient<IEmailSender, EmailSender>();
builder.Services.Configure<AuthMessageSenderOptions>(builder.Configuration);
builder.Services.AddSingleton<BlobStorageService>();

var app = builder.Build();

// New code to invoke BlobStorageService
var blobService = app.Services.GetRequiredService<BlobStorageService>();
await blobService.SetCacheControlOnBlobsAsync();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();


// Add redirection middleware
app.Use(async (context, next) =>
{
    var allowedPaths = new[] { "/", "/Results", "/Results/CreateBR", "/Identity/Account/Login", "/Identity/Account/Register", "/Identity/Account/ForgotPassword", "/Identity/Account/ForgotPasswordConfirmation", "/Identity/Account/ResetPassword", "/Identity/Account/ResetPasswordConfirmation", "/Identity/Account/Logout", "/Identity/Account/DeletePersonalData", "/Identity/Account/ChangePassword" };

    if (!allowedPaths.Contains(context.Request.Path.Value, StringComparer.OrdinalIgnoreCase))
    {
        context.Response.Redirect("/");
        return;
    }

    await next.Invoke();
});

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();

public class CustomIdentityErrorDescriber : IdentityErrorDescriber
{
    public override IdentityError PasswordRequiresNonAlphanumeric()
    {
        return new IdentityError
        {
            Code = nameof(PasswordRequiresNonAlphanumeric),
            Description = "Passwords must have at least one symbol ('!', '@', '#', etc.)."
        };
    }

    // Override other methods as needed
}
public class BlobStorageService
{
    private readonly IConfiguration _configuration;

    public BlobStorageService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SetCacheControlOnBlobsAsync()
    {
        var connectionString = _configuration.GetConnectionString("AzureBlobStorage");
        var containers = new List<string> { "images", "sounds", "audio" };
        var cacheControlValue = "public, max-age=31536000"; // 1 year cache

        var blobServiceClient = new BlobServiceClient(connectionString);

        foreach (var containerName in containers)
        {
            var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);

            await foreach (var blobItem in blobContainerClient.GetBlobsAsync())
            {
                var blobClient = blobContainerClient.GetBlobClient(blobItem.Name);

                // Check if the blob is an SVG file
                if (blobItem.Name.EndsWith(".svg", StringComparison.OrdinalIgnoreCase))
                {
                    await blobClient.SetHttpHeadersAsync(new Azure.Storage.Blobs.Models.BlobHttpHeaders
                    {
                        CacheControl = cacheControlValue,
                        ContentType = "image/svg+xml" // Ensure correct MIME type for SVG files
                    });
                }
                else
                {
                    await blobClient.SetHttpHeadersAsync(new Azure.Storage.Blobs.Models.BlobHttpHeaders
                    {
                        CacheControl = cacheControlValue
                    });
                }
            }
        }
    }
}