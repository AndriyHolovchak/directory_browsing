angular.module("directoryBrowsingApp")
    .factory("driveService", function() {

        function getDrives($scope, $http) {
            $http.get("/api/directories").success(function(data) {
                $scope.Alldrives = data.DriveNames;
                $scope.model = {
                    Less10: "-",
                    From10To50: "-",
                    More100: "-"
                };
            }).error(function(error) {
                alert(error);
            });
        };

        return { drives: getDrives };
    });