angular.module('contactApp')
    .factory('ErrorInterceptor', function ($q, toastr) {
        return {
            responseError: function (rejection) {
                if (rejection.status === 400 && rejection.data.errors) {
                    angular.forEach(rejection.data.errors, function (messages, field) {
                        angular.forEach(messages, function (message) {
                            toastr.error(message);
                        });
                    });
                } else {
                    toastr.error('An unexpected error occurred.');
                }
                return $q.reject(rejection);
            }
        };
    });
