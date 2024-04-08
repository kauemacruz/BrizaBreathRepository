using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace BrizaBreath.Areas.Identity.Pages.Account
{
    [Authorize]
    public class ChangeEmailModel : PageModel
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<ChangeEmailModel> _logger;

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public ChangeEmailModel(
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.            UserManager<IdentityUser> userManager,
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            ILogger<ChangeEmailModel> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            [Required]
            [EmailAddress]
            [Display(Name = "New email")]
            public required string NewEmail { get; set; }

            [Required]
            [EmailAddress]
            [Display(Name = "Confirm new email")]
            [Compare("NewEmail", ErrorMessage = "The new email and confirmation email do not match.")]
            public required string ConfirmNewEmail { get; set; }
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                ModelState.AddModelError(string.Empty, "An error occurred. Please try again.");
                return Page();
            }
            if (Input.NewEmail.Equals(user.Email, StringComparison.OrdinalIgnoreCase))
            {
                // No need to proceed with update, inform the user.
                ModelState.AddModelError("Input.NewEmail", "This is already your current email.");
                return Page();
            }
            var emailExists = await _userManager.FindByEmailAsync(Input.NewEmail);
            if (emailExists != null && emailExists.Id != user.Id)
            {
                ModelState.AddModelError("Input.NewEmail", "This email is already taken.");
                return Page();
            }

            // Set the new email, username, and normalize both
            user.Email = Input.NewEmail;
            user.UserName = Input.NewEmail;
            user.NormalizedEmail = _userManager.NormalizeEmail(Input.NewEmail);
            user.NormalizedUserName = _userManager.NormalizeEmail(Input.NewEmail);
            user.EmailConfirmed = true; // Assuming you want to bypass email confirmation

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
            {
                foreach (var error in updateResult.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
                return Page();
            }

            await _signInManager.RefreshSignInAsync(user);
            _logger.LogInformation("User changed their email and username successfully.");

            // Redirect to a confirmation page or display a success message
            return RedirectToPage("/Results/Create", new { area = "" });
        }
    }
}
