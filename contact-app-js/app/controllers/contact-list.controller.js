angular.module('contactApp.controllers')
    .controller('ContactListController', function ($scope, ContactService) {
        $scope.contacts = [];

        ContactService.getContacts().then(function (response) {
            $scope.contacts = response.data;
        });
    });
