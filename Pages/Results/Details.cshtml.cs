using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using BrizaBreath.Data;
using BrizaBreath.Models;
using Microsoft.AspNetCore.Authorization;

namespace BrizaBreath.Pages.Results
{
    [Authorize]
    public class DetailsModel : PageModel
    {
        private readonly BrizaBreath.Data.ApplicationDbContext _context;

        public DetailsModel(BrizaBreath.Data.ApplicationDbContext context)
        {
            _context = context;
        }

      public Result Result { get; set; } = default!; 

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.Result == null)
            {
                return NotFound();
            }

            var result = await _context.Result.FirstOrDefaultAsync(m => m.ResultId == id);
            if (result == null)
            {
                return NotFound();
            }
            else 
            {
                Result = result;
            }
            return Page();
        }
    }
}
