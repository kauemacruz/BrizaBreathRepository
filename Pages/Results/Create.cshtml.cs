using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using BrizaBreath.Data;
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

        private readonly BrizaBreath.Data.ApplicationDbContext _context;

        public CreateModel(BrizaBreath.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<Result> GetResult { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync()
        {
            ResultUser = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

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

            return Page();
        }


        [BindProperty]
        public Result Result { get; set; } = default!;
        

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
          if (!ModelState.IsValid || _context.Result == null || Result == null)
            {
                return Page();
            }

            _context.Result.Add(Result);
            await _context.SaveChangesAsync();

            return Content("Result Saved");       
        }
        public async Task<IActionResult> OnPostDeleteAsync(int resultId)
        {
            Console.WriteLine("Received delete request for result ID: " + resultId);

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

    }
}
