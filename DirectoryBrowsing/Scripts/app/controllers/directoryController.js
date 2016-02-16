angular.module("directoryBrowsingApp")
    .controller("DirectoryController",
        function drivesController($scope, driveService, directoryService) {

            driveService.drives(function(err, drivesInfo, count) {
                if (err) {
                    alert(err.ExceptionMessage);
                } else if (drivesInfo) {
                    $scope.Alldrives = drivesInfo.drives;
                } else if (count) {
                    $scope.count = count;
                }
            });

            $scope.getDirectoryData = function(path, getParent) {
                directoryService.directories(path, getParent, function(err, directoryInfo, countFiles) {
                    if (err) {
                        if (err != "canceled") {
                            alert(err.ExceptionMessage);
                        }
                    } else if (directoryInfo) {
                        $scope.Alldrives = directoryInfo.drives;
                        $scope.location = directoryInfo.location;
                        $scope.loading = true;
                    } else if (countFiles) {
                        $scope.count = countFiles;
                        $scope.loading = false;
                    }
                });
            };
        })