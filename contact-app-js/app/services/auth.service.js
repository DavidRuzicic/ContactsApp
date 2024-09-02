angular.module('contactApp.services', [])
    .factory('AuthService', function ($http, $window) {
        return {
            login: function (user) {
                return $http.post('/api/login', user);
            },
            setToken: function (token) {
                $window.localStorage.setItem('authToken', token);
            },
            getToken: function () {
                return $window.localStorage.getItem('authToken');
            },
            logout: function () {
                $window.localStorage.removeItem('authToken');
                $window.localStorage.clear();
                $window.sessionStorage.clear();
            }
        };
    });
