angular.module("directoryBrowsingApp")
    .factory("driveService", function($http, countFilesService) {

        function getDrives(callback) {

            $http.get("/api/directories").success(function(data) {

                var drivesInfo = {
                    drives: data.DriveNames,
                };
                callback(null, drivesInfo);

                countFilesService.countFiles("", function(err, data) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, null, data);
                    }
                });

            }).error(function(error) {
                callback(error);
            });
        };

        return { drives: getDrives };
    });