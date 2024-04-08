using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using BrizaBreath.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;


namespace BrizaBreath.Pages.Results
{
    [Authorize]
    public class CreateBRModel : PageModel
    {
        public string? ResultUser { get; set; }
        public string? UserEmail { get; set; }

        private readonly BrizaBreath.Data.ApplicationDbContext _context;

        public CreateBRModel(BrizaBreath.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<Result> GetResult { get; set; } = default!;

        public IList<BrizaSubscription> GetSubscription { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync()
        {
            ResultUser = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

            // Retrieve the user's email
            var userEmailClaim = User.FindFirst(ClaimTypes.Email);
            UserEmail = userEmailClaim?.Value;
            ViewData["UserEmail"] = UserEmail;
            if (_context.Result != null)
            {
                GetResult = await _context.Result
                    .Where(a => a.UserId == HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value)
                    .ToListAsync();
            }
            /*
            if (HttpContext.Request.Query.ContainsKey("session_id"))
            {
                var sessionId = HttpContext.Request.Query["session_id"].ToString();

                if (!string.IsNullOrEmpty(sessionId))
                {
                    StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("StripeApiKey");
                    var service = new SessionService();
                    var session = await service.GetAsync(sessionId);

                    if (session != null)
                    {
                        var noSubscriptionYet = _context.BrizaSubscription
                            .Where(s => s.UserId == ResultUser && s.StripeCustID == null)
                            .FirstOrDefault();
                        if (noSubscriptionYet != null)
                        {
                            noSubscriptionYet.IsActive = true;
                            noSubscriptionYet.StripeCustID = sessionId;
                            _context.Update(noSubscriptionYet);
                            await _context.SaveChangesAsync();
                        }
                    }
                    else
                    {
                        // Invalid session, handle this case
                        ViewData["ErrorMessage"] = "Invalid session!";
                    }
                }
            }
            */
            // Check if the request includes the 'fetchData' query parameter
            if (HttpContext.Request.Query.ContainsKey("fetchData"))
            {
                return new JsonResult(GetResult);
            }
            //bool isActiveSubscriber = IsUserActiveSubscriber(ResultUser);
            bool isActiveSubscriber = true;
            // Pass the isActiveSubscriber flag to your Razor Page
            ViewData["IsActiveSubscriber"] = isActiveSubscriber;
            return Page();
        }


        [BindProperty]
        public Result Result { get; set; } = default!;

        [BindProperty]
        public BrizaSubscription BrizaSubscription { get; set; } = default!;

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
            try
            {
                if (Result == null)
                {
                    return new JsonResult(new { success = false, message = "Result not added." });
                }
                else
                {
                    _context.Result.Add(Result);
                    await _context.SaveChangesAsync();

                    return Content("Resultado Salvo");
                }

            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine("Error adding subscription: " + ex.Message);
                return new JsonResult(new { success = false, message = "An error occurred while adding the result" });
            }
        }
        public async Task<IActionResult> OnPostDeleteAsync(int resultId)
        {
            try
            {
                var result = await _context.Result.FindAsync(resultId);

                if (result != null)
                {
                    _context.Result.Remove(result);
                    await _context.SaveChangesAsync();
                    return new JsonResult(new { success = true });
                }
                else
                {
                    return new JsonResult(new { success = false, message = "Result not found." });
                }
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine("Error deleting result: " + ex.Message);
                return new JsonResult(new { success = false, message = "An error occurred while deleting the result." });
            }
        }
        /*
        public bool IsUserActiveSubscriber(string userId)
        {
            StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("StripeApiKey");
            var isStripeActive = _context.BrizaSubscription
                .Where(s => s.UserId == userId && s.StripeCustID != null && s.IsActive == true)
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
                    string status = subscription.Status;
                    if (status == "canceled")
                    {
                        var userSubscription = _context.BrizaSubscription.FirstOrDefault(sub => sub.StripeCustID == CheckSession.Id);

                        if (userSubscription != null)
                        {
                            userSubscription.IsActive = false;
                            _context.Update(userSubscription);
                            _context.SaveChanges();
                            return false;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        var userSubscription = _context.BrizaSubscription.FirstOrDefault(sub => sub.StripeCustID == CheckSession.Id);

                        if (userSubscription != null)
                        {
                            var customerId = CheckSession.CustomerId;

                            var customerService = new CustomerService();
                            var stripeCustomer = customerService.Get(customerId);
                            var stripeEmail = stripeCustomer.Email;

                            ResultUser = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                            var userEmailClaim = User.FindFirst(ClaimTypes.Email);

                            if (ResultUser == null || userEmailClaim == null)
                            {
                                return false;
                            }
                            else
                            {
                                var userInDb = _context.Users.FirstOrDefault(u => u.Id == ResultUser); // Assuming you have a Users DbSet named `ApplicationUsers`

                                if (userInDb != null && userInDb.Email != stripeEmail)
                                {
                                    var emailExists = _context.Users.Any(u => u.Email == stripeEmail);

                                    if (!emailExists)
                                    {
                                        userInDb.Email = stripeEmail;
                                        userInDb.NormalizedEmail = stripeEmail.ToUpper();
                                        userInDb.UserName = stripeEmail;
                                        userInDb.NormalizedUserName = stripeEmail.ToUpper();
                                        _context.Update(userInDb);
                                        _context.SaveChanges();
                                        ViewData["UserEmail"] = stripeEmail;
                                    }
                                    else
                                    {
                                        try
                                        {
                                            var options = new CustomerUpdateOptions
                                            {
                                                Email = userInDb.Email,
                                            };
                                            var customer = customerService.UpdateAsync(customerId, options);
                                            ViewData["UserEmail"] = options.Email;
                                            ViewData["AlertMessage"] = "Este e-mail já existe no banco de dados. Revertemos para o seu e-mail original (" + options.Email + ")";
                                        }
                                        catch (StripeException ex)
                                        {
                                            Console.WriteLine($"Stripe API error: {ex.Message}");
                                        }
                                    }
                                }

                                ViewData["UserEmail"] = userInDb?.Email;
                                userSubscription.IsActive = true;
                                _context.Update(userSubscription);
                                _context.SaveChanges();
                                return true;
                            }
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public async Task<IActionResult> OnPostSignMembershipAsync()
        {
            try
            {
                ResultUser = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                var userEmailClaim = User.FindFirst(ClaimTypes.Email);

                if (ResultUser == null)
                {
                    return new JsonResult(new { success = false, message = "User not added." });
                }
                else
                {
                    if (userEmailClaim != null)
                    {
                        _context.BrizaSubscription.Add(BrizaSubscription);
                        await _context.SaveChangesAsync();
                        UserEmail = userEmailClaim.Value;
                        return Content(UserEmail);
                    }
                    else
                    {
                        return BadRequest();
                    }
                }

            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine("Error adding subscription: " + ex.Message);
                return new JsonResult(new { success = false, message = "An error occurred while adding the membership" });
            }
        }
        public async Task<IActionResult> OnPostRedirectToStripePortalAsync()
        {
            try
            {
                ResultUser = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

                if (ResultUser == null)
                {
                    return new JsonResult(new { success = false, message = "User not added." });
                }
                else
                {
                    StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("StripeApiKey");
                    var latestSubscription = _context.BrizaSubscription
                        .Where(s => s.UserId == ResultUser && s.StripeCustID != null)
                        .OrderByDescending(s => s.Id)
                        .FirstOrDefault();
                    if (latestSubscription != null)
                    {
                        var sessionId = latestSubscription.StripeCustID;
                        var service = new SessionService();
                        var session = await service.GetAsync(sessionId);
                        if (session != null)
                        {
                            var customerId = session.CustomerId;
                            var options = new Stripe.BillingPortal.SessionCreateOptions
                            {
                                Customer = customerId,
                                ReturnUrl = "https://app.brizabreath.com/Results/CreateBR",  // The URL to which the user will be redirected when they're done
                            };

                            var billingPortalService = new Stripe.BillingPortal.SessionService();
                            var portalSession = billingPortalService.Create(options);


                            return new JsonResult(new { success = true, url = portalSession.Url });
                        }
                        else
                        {
                            return new JsonResult(new { success = false, message = "User not added." });
                        }
                    }
                    else
                    {
                        return new JsonResult(new { success = false, message = "User not added." });

                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                Console.WriteLine("Error adding subscription: " + ex.Message);
                return new JsonResult(new { success = false, message = "An error occurred while adding the membership" });
            }
        }*/
    }
}