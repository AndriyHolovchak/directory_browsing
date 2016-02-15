using System.Collections.Generic;
using System.IO;
using DirectoryBrowsing.Models;

namespace DirectoryBrowsing.Services
{
    public class DriveNames
    {
        private readonly List<string> driveNames = new List<string>();
        private readonly DriveModel drives = new DriveModel();

        public DriveModel GetDriveNames()
        {
            var allDrives = DriveInfo.GetDrives();
            foreach (var d in allDrives)
            {
                driveNames.Add(d.Name.Substring(0, d.Name.Length - 1));
            }
            drives.DriveNames = driveNames;
            return drives;
        }

        public DriveModel GetDirectoryNames(string path, bool getParent)
        {
            var di = new DirectoryInfo(@path);
            FileSystemInfo[] dirInfo;
            if (getParent)
            {
                di = di.Parent;
                dirInfo = di.GetFileSystemInfos();
                foreach (var d in dirInfo)
                {
                    driveNames.Add(d.Name);
                }
                drives.DriveNames = driveNames;
                return drives;
            }

            dirInfo = di.GetFileSystemInfos();
            foreach (var d in dirInfo)
            {
                driveNames.Add(d.Name);
            }
            drives.DriveNames = driveNames;
            return drives;
        }
    }
}