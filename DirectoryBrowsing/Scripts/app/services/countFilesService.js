angular.module("directoryBrowsingApp")
    .factory("countFilesService", function() {

        function getCountFiles($scope, $http, $q, newpath, cancelCountfilesRequest) {

            $scope.loading = true;
            $http({
                method: "GET",
                url: "/api/countfiles",
                params: { 'path': newpath },
                timeout: cancelCountfilesRequest.promise
            }).success(function(data) {
                $scope.model = {
                    Less10: data.CountOfFileLess10Mb,
                    From10To50: data.CountOfFileFrom10MbTo50Mb,
                    More100: data.CountOfFileMore100Mb
                };
                $scope.loading = false;
            }).error(function(error) {
                if (error) {
                    alert(error);
                }
            }).finally(function() {
                cancelCountfilesRequest = null;
            });
        }

        return { countFiles: getCountFiles };
    });