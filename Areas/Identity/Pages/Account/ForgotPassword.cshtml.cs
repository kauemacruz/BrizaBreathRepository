// ForgotPassword.cshtml.cs

// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
#nullable disable

using System;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.WebUtilities;

namespace BrizaBreath.Areas.Identity.Pages.Account
{
    public class ForgotPasswordModel : PageModel
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IEmailSender _emailSender;

        public ForgotPasswordModel(UserManager<IdentityUser> userManager, IEmailSender emailSender)
        {
            _userManager = userManager;
            _emailSender = emailSender;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(Input.Email);
                if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    return RedirectToPage("./ForgotPasswordConfirmation");
                }

                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                var callbackUrl = Url.Page(
                    "/Account/ResetPassword",
                    pageHandler: null,
                    values: new { area = "Identity", code },
                    protocol: Request.Scheme);

                // Enhanced HTML Email Content
                string emailBody = $@"
                <html>
                    <body style='background-color: white;'>
                        <div style='text-align: center;'>
                            <img src='https://brizastorage.blob.core.windows.net/images/brizalogo.png' alt='Briza Breath & Performance Logo' style='max-width: 200px; margin-bottom: 20px;'/>
                            <h1 style='color: #333;'>Reset Your Password</h1>
                            <p style='color: #555;'>Hello,</p>
                            <p style='color: #555;'>
                                We received a request to reset the password for your account. 
                                If you did not make this request, please ignore this email.
                            </p>
                            <p style='color: #555;'>
                                To reset your password, please click the button below:
                            </p>
                            <a href='{HtmlEncoder.Default.Encode(callbackUrl)}' 
                            style='background-color: #007BFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;'>
                                Reset Password
                            </a>
                            <p style='color: #555; margin-top: 20px;'>
                                If you're having trouble clicking the button, copy and paste the URL below into your web browser:
                            </p>
                            <a href='{HtmlEncoder.Default.Encode(callbackUrl)}' style='color: #007BFF;'>
                                {HtmlEncoder.Default.Encode(callbackUrl)}
                            </a>
                        </div>
                    </body>
                </html>";

                await _emailSender.SendEmailAsync(
                    Input.Email,
                    "Reset Password",
                    emailBody);

                return RedirectToPage("./ForgotPasswordConfirmation");
            }

            return Page();
        }
    }
}
