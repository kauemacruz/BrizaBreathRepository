using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using BrizaBreath.Models;

namespace BrizaBreath.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<BrizaBreath.Models.Result> Result { get; set; } = default!;
        public DbSet<BrizaBreath.Models.MembershipPlan> MembershipPlan { get; set; } = default!;
        public DbSet<BrizaBreath.Models.BrizaSubscription> BrizaSubscription { get; set; } = default!;

    }

}