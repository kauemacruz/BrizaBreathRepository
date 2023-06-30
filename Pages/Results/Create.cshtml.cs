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
    }
}
