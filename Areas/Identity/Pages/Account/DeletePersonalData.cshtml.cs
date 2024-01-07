// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
#nullable disable

using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Stripe;
using Stripe.Checkout;


namespace BrizaBreath.Areas.Identity.Pages.Account
{
    public class DeletePersonalDataModel : PageModel
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<DeletePersonalDataModel> _logger;
        private readonly BrizaBreath.Data.ApplicationDbContext _context;

        public DeletePersonalDataModel(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            BrizaBreath.Data.ApplicationDbContext context,
            ILogger<DeletePersonalDataModel> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
            _logger = logger;
        }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        [BindProperty]
        public InputModel Input { get; set; }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        public class InputModel
        {
            /// <summary>
            ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
            ///     directly from your code. This API may change or be removed in future releases.
            /// </summary>
            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }
        }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        public bool RequirePassword { get; set; }

        public async Task<IActionResult> OnGet()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            RequirePassword = await _userManager.HasPasswordAsync(user);
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }
            RequirePassword = await _userManager.HasPasswordAsync(user);
            if (RequirePassword)
            {
                if (string.IsNullOrEmpty(Input.Password))
                {
                    ModelState.AddModelError(string.Empty, "Password is required.");
                    return Page();
                }

                if (!await _userManager.CheckPasswordAsync(user, Input.Password))
                {
                    ModelState.AddModelError(string.Empty, "Incorrect password.");
                    return Page();
                }

            }
            StripeConfiguration.ApiKey = "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";
            var isStripeActive = _context.BrizaSubscription
                .Where(s => s.UserId == user.Id && s.StripeCustID != null && s.IsActive == true)
                .FirstOrDefault();
            if (isStripeActive != null)
            {
                var CheckService = new SessionService();
                var CheckSession = CheckService.Get(isStripeActive.StripeCustID);
                if (CheckSession != null)
                {
                    var subscriptionId = CheckSession.SubscriptionId;
                    var subscriptionService = new SubscriptionService();
                    Subscription subscription = subscriptionService.Get(subscriptionId);
                    var customerId = CheckSession.CustomerId;
                    // Retrieve customer's subscriptions from Stripe
                    var options = new SubscriptionListOptions
                    {
                        Limit = 100,
                        Customer = customerId,                 
                    };

                    StripeList<Subscription> subscriptions = subscriptionService.List(options);

                    // Cancel each of the customer's subscriptions
                    foreach (var subscription2 in subscriptions)
                    {
                        subscriptionService.Cancel(subscription2.Id, null);
                    }
                }
            }
       
            var stripeInactiveSubscriptions = _context.BrizaSubscription
            .Where(s => s.UserId == user.Id)
            .ToList();

            foreach (var subscription3 in stripeInactiveSubscriptions)
            {
                _context.BrizaSubscription.Remove(subscription3);
            }

            // Save changes to the database
            _context.SaveChanges();
            var result = await _userManager.DeleteAsync(user);
            var userId = await _userManager.GetUserIdAsync(user);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException($"Unexpected error occurred deleting user.");
            }

            await _signInManager.SignOutAsync();

            _logger.LogInformation("User with ID '{UserId}' deleted themselves.", userId);


            return Redirect("~/");
        }
    }
}
