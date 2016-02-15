namespace DirectoryBrowsing.Models
{
    public class CountOfFileModel
    {
        public int CountOfFileLess10Mb { get; set; }
        public int CountOfFileFrom10MbTo50Mb { get; set; }
        public int CountOfFileMore100Mb { get; set; }
    }
}