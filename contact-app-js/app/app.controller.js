angular.module('contactApp')
    .controller('AppController', function ($scope, $location, AuthService) {
        $scope.showNavbar = true;

        $scope.$on('$routeChangeSuccess', function () {
            $scope.showNavbar = $location.path() !== '/login';
        });

        $scope.logout = function () {
            AuthService.logout();
            $location.path('/login');
        };
    });
