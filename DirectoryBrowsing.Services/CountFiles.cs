using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DirectoryBrowsing.Services
{
    class CountFiles
    {
        private CountOfFileModel GetCountFiles(string path)
        {

            CountOfFileModel countOfFileModel = new CountOfFileModel();
            int less10 = 0;
            int from10to50 = 0;
            int more100 = 0;

            DirectoryInfo di = new DirectoryInfo(@path);

            List<FileInfo> files = GetFiles(di);

            long size = 0;
            foreach (var f in files)
            {
                try
                {
                    size = f.Length / 1024 / 1024;
                }
                catch (UnauthorizedAccessException)
                {
                    ;
                }

                if (size <= 10)
                {
                    less10++;
                }
                else if (size > 10 && size <= 50)
                {
                    from10to50++;
                }
                else if (size >= 100)
                {
                    more100++;
                }
            }

            countOfFileModel.CountOfFileLess10Mb = less10;
            countOfFileModel.CountOfFileFrom10MbTo50Mb = from10to50;
            countOfFileModel.CountOfFileMore100Mb = more100;

            return countOfFileModel;
        }

        private List<FileInfo> GetFiles(DirectoryInfo d)
        {
            var files = new List<FileInfo>();
            try
            {
                files.AddRange(d.GetFiles("*", SearchOption.TopDirectoryOnly));
                foreach (var directory in d.GetDirectories())
                    files.AddRange(GetFiles(directory));
            }
            catch (PathTooLongException) { }
            catch (UnauthorizedAccessException) { }

            return files;
        }
    }
}
