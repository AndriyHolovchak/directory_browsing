using System;
using System.Collections.Generic;
using System.IO;
using DirectoryBrowsing.Models;

namespace DirectoryBrowsing.Services
{
    public class CountFiles
    {
        public CountOfFileModel SortFiles(string path)
        {
            var countOfFileModel = new CountOfFileModel();

            var less10 = 0;
            var from10to50 = 0;
            var more100 = 0;

            var dir = new DirectoryInfo(@path);

            var files = GetAllFiles(dir);

            long size = 0;
            foreach (var f in files)
            {
                try
                {
                    size = f.Length/1024/1024;
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

        private List<FileInfo> GetAllFiles(DirectoryInfo d)
        {
            var files = new List<FileInfo>();
            try
            {
                files.AddRange(d.GetFiles("*", SearchOption.TopDirectoryOnly));
                foreach (var directory in d.GetDirectories())
                    files.AddRange(GetAllFiles(directory));
            }
            catch (PathTooLongException)
            {
            }
            catch (UnauthorizedAccessException)
            {
            }

            return files;
        }
    }
}