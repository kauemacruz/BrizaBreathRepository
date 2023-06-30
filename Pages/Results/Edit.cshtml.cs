using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BrizaBreath.Data;
using BrizaBreath.Models;
using Microsoft.AspNetCore.Authorization;

namespace BrizaBreath.Pages.Results
{
    [Authorize]
    public class EditModel : PageModel
    {
        private readonly BrizaBreath.Data.ApplicationDbContext _context;

        public EditModel(BrizaBreath.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Result Result { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.Result == null)
            {
                return NotFound();
            }

            var result =  await _context.Result.FirstOrDefaultAsync(m => m.ResultId == id);
            if (result == null)
            {
                return NotFound();
            }
            Result = result;
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(Result).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultExists(Result.ResultId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool ResultExists(int id)
        {
          return (_context.Result?.Any(e => e.ResultId == id)).GetValueOrDefault();
        }
    }
}
