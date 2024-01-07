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
        public string? YBTotalTime { get; set; }
        public string? YBIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? YBResultDate { get; set; }
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
        public string? O2TotalTime { get; set; }
        public string? O2Intervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? O2ResultDate { get; set; }
        public string? CO2TotalTime { get; set; }
        public string? CO2Intervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? CO2ResultDate { get; set; }
        public string? WHTotalTime { get; set; }
        public string? WHIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? WHResultDate { get; set; }
        public string? KBTotalTime { get; set; }
        public string? KBIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? KBResultDate { get; set; }
        public string? CTTotalTime { get; set; }
        public string? CTIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? CTResultDate { get; set; }
        public string? UBTotalTime { get; set; }
        public string? UBIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? UBResultDate { get; set; }
        public string? BOXTotalTime { get; set; }
        public string? BOXIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? BOXResultDate { get; set; }
        public string? NBTotalTime { get; set; }
        public string? NBIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? NBResultDate { get; set; }
        public string? CBTotalTime { get; set; }
        public string? CBIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? CBResultDate { get; set; }
        public string? SBTotalTime { get; set; }
        public string? SBIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? SBResultDate { get; set; }
        public string? RBTotalTime { get; set; }
        public string? RBIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? RBResultDate { get; set; }
        public string? SEXTotalTime { get; set; }
        public string? SEXIntervals { get; set; }
        [DataType(DataType.Date)]
        public DateTime? SEXResultDate { get; set; }
    }

}


