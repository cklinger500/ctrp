/**
 * Configure routes for person component
 */

(function() {
    'use strict';
    angular.module('ctrp.module.routes').config(personRoutes);

    personRoutes.$inject = ['$stateProvider'];
    function personRoutes($stateProvider) {
        $stateProvider
                .state('main.people', {
                    url: '/people',
                    templateUrl: 'app/po/person/person_list.html',
                    controller: 'personCtrl as personView',
                    section: 'po',
                    ncyBreadcrumb: {
                        parent: 'main.defaultContent',
                        label: 'Search Persons'
                    }

                })
                .state('main.personDetail', {
                    url: '/people/:personId',
                    templateUrl: 'app/po/person/personDetails2.html',
                    controller: 'personDetailCtrl2 as personDetailView',
                    section: 'po',
                    resolve: {
                        OrgService: 'OrgService',
                        PersonService: 'PersonService',
                        sourceContextObj: function(OrgService) {
                            return OrgService.getSourceContexts();
                        },
                        sourceStatusObj: function(OrgService) {
                            return OrgService.getSourceStatuses2();
                        },
                        personDetailObj: function($stateParams, PersonService) {
                            return PersonService.getPersonById($stateParams.personId);
                        },
                        poAffStatuses : function(PersonService) {
                            return PersonService.getPoAffStatuses();
                        },
                        serviceRequests: function(OrgService) {
                            return OrgService.getServiceRequests();
                        }
                    }, //resolve the promise and pass it to controller
                    ncyBreadcrumb: {
                        parent: 'main.people',
                        label: 'Person Detail'
                    }
                })

                .state('main.addPerson', {
                    url: '/new_person',
                    templateUrl: 'app/po/person/personDetails2.html',
                    controller: 'personDetailCtrl2 as personDetailView',
                    section: 'po',
                    resolve: {
                        OrgService: 'OrgService',
                        PersonService: 'PersonService',
                        sourceContextObj: function(OrgService) {
                            return OrgService.getSourceContexts();
                        },
                        sourceStatusObj: function(OrgService) {
                            return OrgService.getSourceStatuses();
                        },
                        personDetailObj: function($q) {
                            var deferred = $q.defer();
                            deferred.resolve(null);
                            return deferred.promise;
                        },
                        poAffStatuses : function(PersonService) {
                            return PersonService.getPoAffStatuses();
                        },
                        serviceRequests: function(OrgService) {
                            return OrgService.getServiceRequests();
                        }
                    },
                    ncyBreadcrumb: {
                        parent: 'main.people',
                        label: 'Add Person'
                    }
                })

                .state('main.testPerson', {
                    url: '/person_directive',
                    templateUrl: 'app/po/person/person_search.html',
                    controller: 'personSearchCtrl as personSearchView',
                    section: 'po',
                });
    } //personRoutes


})();
