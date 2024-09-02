angular.module('contactApp', [
    'ngRoute',
    'ngAnimate',
    'toastr',
    'contactApp.services',
    'contactApp.controllers'
])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .when('/contacts', {
                templateUrl: 'views/contact-list.html',
                controller: 'ContactListController',
                resolve: { auth: 'AuthGuard' }
            })
            .when('/add-contact', {
                templateUrl: 'views/contact-form.html',
                controller: 'ContactFormController',
                resolve: { auth: 'AuthGuard' }
            })
            .when('/edit-contact/:id', {
                templateUrl: 'views/contact-form.html',
                controller: 'ContactFormController',
                resolve: { auth: 'AuthGuard' }
            })
            .otherwise({ redirectTo: '/login' });

        $httpProvider.interceptors.push('JwtInterceptor');
        $httpProvider.interceptors.push('ErrorInterceptor');
    });
