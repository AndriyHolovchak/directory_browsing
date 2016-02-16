angular.module("directoryBrowsingApp")
    .factory("countFilesService", function($http, $q) {
        var cancelCountfilesRequest = null;

        function getCountFiles(path, callback) {
            if (cancelCountfilesRequest) {
                cancelCountfilesRequest.resolve();
            }
            if (!path) {
                var countFiles = {
                    Less10: "*",
                    From10To50: "*",
                    More100: "*"
                };
                callback(null, countFiles);
                cancelCountfilesRequest = null;
                return;
            }
            cancelCountfilesRequest = $q.defer();
            $http({
                method: "GET",
                url: "/api/countfiles",
                params: { 'path': path },
                timeout: cancelCountfilesRequest.promise
            }).success(function(data) {
                var countFiles = {
                    Less10: data.CountOfFileLess10Mb,
                    From10To50: data.CountOfFileFrom10MbTo50Mb,
                    More100: data.CountOfFileMore100Mb
                };
                callback(null, countFiles);
                cancelCountfilesRequest = null;
            }).error(function(error) {
                callback("canceled");
            });
        }

        return { countFiles: getCountFiles };
    });