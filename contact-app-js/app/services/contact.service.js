angular.module('contactApp.services')
    .factory('ContactService', function ($http) {
        return {
            getContacts: function () {
                return $http.get('/api/contacts');
            },
            getContact: function (id) {
                return $http.get(`/api/contacts/${id}`);
            },
            createContact: function (contact) {
                return $http.post('/api/contacts', contact);
            },
            updateContact: function (contact) {
                return $http.put(`/api/contacts/${contact.id}`, contact);
            },
            deleteContact: function (id) {
                return $http.delete(`/api/contacts/${id}`);
            }
        };
    });
