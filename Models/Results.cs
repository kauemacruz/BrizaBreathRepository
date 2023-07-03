using System.ComponentModel.DataAnnotations;

namespace BrizaBreath.Models
{
    public class Result
    {
        public int ResultId { get; set; }
        public string? brtResultScore { get; set; }
        [DataType(DataType.Date)]
        public DateTime? brtResultDate { get; set; }
        public required string UserId { get; set; }
        public string? yogicTotalTime { get; set; }
        public string? yogicIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? yogicResultDate { get; set; }
        public string? BRETotalTime { get; set; }
        public string? BREIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? BREResultDate { get; set; }
        public string? BRWTotalTime { get; set; }
        public string? BRWIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? BRWResultDate { get; set; }
        public string? HUMTotalTime { get; set; }
        public string? HUMIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? HUMResultDate { get; set; }
        public string? BBTotalTime { get; set; }
        public string? BBIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? BBResultDate { get; set; }
        public string? HATTotalTime { get; set; }
        public string? HATIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? HATResultDate { get; set; }
        public string? HATCTotalTime { get; set; }
        public string? HATCIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? HATCResultDate { get; set; }
        public string? AHATTotalTime { get; set; }
        public string? AHATIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? AHATResultDate { get; set; }
        public string? lungsResultScore { get; set; }
        [DataType(DataType.Date)]
        public DateTime? lungsResultDate { get; set; }
        public string? APTotalTime { get; set; }
        public string? APIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? APResultDate { get; set; }
    }

}


