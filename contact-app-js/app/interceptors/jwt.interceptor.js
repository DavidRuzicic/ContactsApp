angular.module('contactApp')
    .factory('JwtInterceptor', function ($q, $window) {
        return {
            request: function (config) {
                const token = $window.localStorage.getItem('authToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            responseError: function (rejection) {
                return $q.reject(rejection);
            }
        };
    });
