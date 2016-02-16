using System;
using System.Web.Http;
using DirectoryBrowsing.Services;

namespace DirectoryBrowsing.Controllers
{
    public class DirectoriesController : ApiController
    {
        private readonly DriveNames _driveNames;

        public DirectoriesController()
        {
            _driveNames = new DriveNames();
        }

        public IHttpActionResult Get()
        {
            try
            {
                var drives = _driveNames.GetDriveNames();
                return Json(drives);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        public IHttpActionResult Get(string path, bool getParent)
        {
            try
            {
                var directories = _driveNames.GetDirectoryNames(path, getParent);
                return Json(directories);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}