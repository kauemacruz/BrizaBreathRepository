using BrizaBreath.Services;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;

namespace BrizaBreath.Services;

public class EmailSender : IEmailSender
{
    private readonly ILogger _logger;

    public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor, ILogger<EmailSender> logger)
    {
        _logger = logger;

        // Read SendGridKey from environment variable
        string sendGridKey = Environment.GetEnvironmentVariable("SendGridApiKey") ?? throw new InvalidOperationException("SendGrid API key not found in environment variables.");

        if (string.IsNullOrWhiteSpace(sendGridKey))
        {
            _logger.LogError("SendGrid API key not found in environment variables.");
            throw new Exception("SendGrid API key not found.");
        }

        // Set the SendGridKey in Options
        Options = optionsAccessor.Value;
        Options.SendGridKey = sendGridKey;
    }


    public AuthMessageSenderOptions Options { get; } //Set with Secret Manager.

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        if (string.IsNullOrEmpty(Options.SendGridKey))
        {
            throw new Exception("Null SendGridKey");
        }
        await Execute(Options.SendGridKey, subject, message, toEmail);
    }

    public async Task Execute(string apiKey, string subject, string message, string toEmail)
    {
        var client = new SendGridClient(apiKey);
        var msg = new SendGridMessage()
        {
            From = new EmailAddress("info@brizabreath.com", "Briza Breath & Performance"),
            Subject = subject,
            PlainTextContent = message,
            HtmlContent = message
        };
        msg.AddTo(new EmailAddress(toEmail));

        // Disable click tracking.
        // See https://sendgrid.com/docs/User_Guide/Settings/tracking.html
        msg.SetClickTracking(false, false);
        var response = await client.SendEmailAsync(msg);
        _logger.LogInformation(response.IsSuccessStatusCode
                               ? $"Email to {toEmail} queued successfully!"
                               : $"Failure Email to {toEmail}");
    }
}