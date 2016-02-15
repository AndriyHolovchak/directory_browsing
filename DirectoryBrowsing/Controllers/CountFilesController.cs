using System;
using System.Web.Http;
using DirectoryBrowsing.Services;

namespace DirectoryBrowsing.Controllers
{
    public class CountFilesController : ApiController
    {
        private readonly CountFiles _countFiles;

        public CountFilesController()
        {
            _countFiles = new CountFiles();
        }

        public IHttpActionResult Get(string path)
        {
            try
            {
                var sortedFiles = _countFiles.SortFiles(path);
                return Json(sortedFiles);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}