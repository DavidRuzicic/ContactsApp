angular.module('contactApp.controllers')
    .controller('ContactFormController', function ($scope, $location, $routeParams, ContactService) {
        $scope.contact = {};
        const contactId = $routeParams.id;

        if (contactId) {
            ContactService.getContact(contactId).then(function (response) {
                $scope.contact = response.data;
            });
        }

        $scope.saveContact = function () {
            if (contactId) {
                ContactService.updateContact($scope.contact).then(function () {
                    $location.path('/contacts');
                });
            } else {
                ContactService.createContact($scope.contact).then(function () {
                    $location.path('/contacts');
                });
            }
        };
    });
