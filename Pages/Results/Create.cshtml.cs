using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using BrizaBreath.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;


namespace BrizaBreath.Pages.Results
{
    [Authorize]
    public class CreateModel : PageModel
    {
        public string? ResultUser { get; set; }
        public string? UserEmail { get; set; }

        private readonly BrizaBreath.Data.ApplicationDbContext _context;

        public CreateModel(BrizaBreath.Data.ApplicationDbContext context)
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
            // Check if the request includes the 'fetchData' query parameter
            if (HttpContext.Request.Query.ContainsKey("fetchData"))
            {
                return new JsonResult(GetResult);
            }
            bool isActiveSubscriber = IsUserActiveSubscriber(ResultUser);
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

                    return Content("Result Saved");
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
        
        public bool IsUserActiveSubscriber(string userId)
        {
            var userSubscription = _context.BrizaSubscription
                .Where(s => s.UserId == userId && s.IsActive == true)
                .FirstOrDefault();

            if (userSubscription != null)
            {
                return true;
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

    }
}