angular.module("directoryBrowsingApp", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/",
        {
            templateUrl: "/scripts/app/templates/index.html",
            controller: "DirectoryController"
        });
    });