using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using BrizaBreath.Data;
using BrizaBreath.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;



namespace BrizaBreath.Pages.Results
{
    [Authorize]
    public class IndexModel : PageModel
    {
        private readonly BrizaBreath.Data.ApplicationDbContext _context;

        public IndexModel(BrizaBreath.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        public IList<Result> Result { get;set; } = default!;

        public async Task OnGetAsync()
        {
            if (_context.Result != null)
            {
                Result = await _context.Result.
                     Where(a => a.UserId == HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value)
                    .ToListAsync();
            }
        }
    }
}
