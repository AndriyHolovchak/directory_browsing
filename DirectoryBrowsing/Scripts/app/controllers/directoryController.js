angular.module("directoryBrowsingApp")
    .controller("DirectoryController",
    function drivesController($scope, $http, $q, driveService, directoryService, countFilesService) {
        driveService.drives($scope, $http);
        $scope.getDirectoryData = function(path, getParent) {
            directoryService.directories($scope, $http, $q, driveService, countFilesService, path, getParent);
        }
    })