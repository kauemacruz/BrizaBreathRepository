using System.ComponentModel.DataAnnotations;

namespace BrizaBreath.Models
{
    public class MembershipPlan
    {
        [Key]
        public int planId { get; set; }
        [Required]
        public string? planName { get; set; }
        [Required]
        public decimal planPrice { get; set; }
    }

}
