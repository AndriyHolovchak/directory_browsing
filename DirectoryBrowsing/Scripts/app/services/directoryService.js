angular.module("directoryBrowsingApp")
    .factory("directoryService", function() {

        function getNewPathToSecondLastSlash(path) {
            var from = path.lastIndexOf("\\", path.length - 3) + 1;
            var newpath = path.substring(0, from);
            return newpath;
        }

        var cancelCountfilesRequest = null;

        function getDirectories($scope, $http, $q, driveService, countFilesService, path, getParent) {
            path += "\\";
            var newpath = path;
            if (getParent) {

                newpath = getNewPathToSecondLastSlash(path);
                if (!newpath) {
                    if (cancelCountfilesRequest) {
                        cancelCountfilesRequest.resolve();
                    }
                    $scope.loading = false;
                    driveService.drives($scope, $http);
                    $scope.location = "";

                    return;
                } else {
                    $scope.location = newpath;
                }

            } else {
                $scope.location = path;
            }
            $http({ method: "GET", url: "/api/directories", params: { 'path': path, "getParent": getParent } }).success(function(data) {
                $scope.Alldrives = data.DriveNames;

                if (cancelCountfilesRequest) {
                    cancelCountfilesRequest.resolve();
                }

                cancelCountfilesRequest = $q.defer();
                countFilesService.countFiles($scope, $http, $q, newpath, cancelCountfilesRequest);

            }).error(function(error) {
                
                newpath = getNewPathToSecondLastSlash(path);
                $scope.location = newpath;

                alert("It is not directory");
            });
        }

        return {
            directories: getDirectories
        };
    });