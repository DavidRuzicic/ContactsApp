angular.module('contactApp.controllers', [])
    .controller('LoginController', function ($scope, $location, AuthService) {
        $scope.user = { username: '', password: '' };
        $scope.errorMessage = '';

        $scope.login = function () {
            AuthService.login($scope.user).then(function (response) {
                AuthService.setToken(response.data.token);
                $location.path('/contacts');
            }).catch(function () {
                $scope.errorMessage = 'Invalid username or password';
            });
        };
    });
