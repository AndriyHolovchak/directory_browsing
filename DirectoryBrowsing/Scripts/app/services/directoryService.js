angular.module("directoryBrowsingApp")
    .factory("directoryService", function($http, driveService, countFilesService) {

        function getNewPathToSecondLastSlash(path) {
            var from = path.lastIndexOf("\\", path.length - 3) + 1;
            var newpath = path.substring(0, from);
            return newpath;
        }

        function getDirectories(path, getParent, callback) {
            path += "\\";
            var newpath = path;
            var location;
            if (getParent) {

                newpath = getNewPathToSecondLastSlash(path);
                if (!newpath) {

                    driveService.drives(function(err, drivesInfo, count) {
                        if (err) {
                            callback(err);
                        } else if (drivesInfo) {
                            var directoryInfo = {
                                drives: drivesInfo.drives,
                                location: ""
                            };
                            callback(null, directoryInfo);
                        } else if (count) {
                            callback(null, null, count);
                        }
                    });

                    return;
                } else {
                    location = newpath;
                }

            } else {
                location = path;
            }
            $http({
                method: "GET",
                url: "/api/directories",
                params: { 'path': path, "getParent": getParent }
            }).success(function(data) {
                var directoriesInfo = {
                    drives: data.DriveNames,
                    location: location
                };

                callback(null, directoriesInfo);

                countFilesService.countFiles(newpath, function(err, countFiles) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, null, countFiles);
                    }
                });

            }).error(function(error) {
                callback(error);
            });
        }

        return {
            directories: getDirectories
        };
    });