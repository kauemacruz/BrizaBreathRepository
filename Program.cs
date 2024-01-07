using BrizaBreath.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.UI.Services;
using BrizaBreath.Services;
using Stripe;


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

StripeConfiguration.ApiKey = builder.Configuration["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"];

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddRazorPages();
builder.Services.AddMvc().AddRazorPagesOptions(options => options.Conventions.AddPageRoute("/Results/Create", ""));

builder.Services.AddTransient<IEmailSender, EmailSender>();
builder.Services.Configure<AuthMessageSenderOptions>(builder.Configuration);
var app = builder.Build();

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
