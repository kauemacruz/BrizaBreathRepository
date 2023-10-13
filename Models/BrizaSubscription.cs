using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace BrizaBreath.Models
{
    public class BrizaSubscription
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int PlanId { get; set; } // Identifier for the subscription plan

        [Required]
        public DateTime StartDate { get; set; } // Start date of the subscription

        [Required]
        public DateTime EndDate { get; set; } // End date of the subscription

        [Required]
        public bool IsActive { get; set; } // Indicates whether the subscription is active

        [Required]
        public required string UserId { get; set; }

        public  string? StripeCustID { get; set; }

    }

}
