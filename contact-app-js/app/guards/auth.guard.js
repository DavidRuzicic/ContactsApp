angular.module('contactApp')
    .factory('AuthGuard', function ($q, $location) {
        return function () {
            const token = localStorage.getItem('authToken');
            if (!token) {
                $location.path('/login');
                return $q.reject('Not Authenticated');
            }
            return $q.resolve();
        };
    });
