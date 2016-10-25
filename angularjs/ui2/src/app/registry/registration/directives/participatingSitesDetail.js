/**
 * Created by wus4 on 2/10/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').directive('participatingSitesDetail', participatingSitesDetail);

    participatingSitesDetail.$inject = ['FORMATS', 'PersonService', 'toastr', '$state', '$timeout', '$rootScope'];

    function participatingSitesDetail(FORMATS, PersonService, toastr, $state, $timeout, $rootScope) {

        var directiveObj = {
          restrict: 'E',
          scope: {
              usedInModal: '=?', //boolean, option
              psDetailObj: '=?', //boolean, option
              trialDetailObj: '=',
              userDetailObj: '=',
              srStatusObj: '=',
              centralContactTypes: '=',
              trialService: '=',
              paTrialService: '='
          },
          templateUrl: 'app/registry/registration/directives/participatingSitesDetail.html',
          link: linkFn,
          controller: participatingSitesDetailController
        };

        return directiveObj;

        /************************* implementations below *******************************/

        function linkFn(scope, element, attrs) {} //linkFn


        function participatingSitesDetailController($scope) {
            /* Global Variables */
            var usedInModal = $scope.usedInModal ? $scope.usedInModal : false;
            var userDetailObj = $scope.userDetailObj;
            var trialDetailObj = $scope.trialDetailObj;
            var psDetailObj = $scope.psDetailObj;
            var TrialService = $scope.trialService;
            var PATrialService = $scope.paTrialService;
            var srStatusObj = $scope.srStatusObj;
            var centralContactTypes = $scope.centralContactTypes;


            /* Initialize properties unaffected by permissions */
            $scope.isManageScreen = $state.$current.name.indexOf('manage') > -1 ? true : false;
            $scope.curUser = userDetailObj;
            $scope.centralContactTypes = centralContactTypes.types;
            $scope.centralContactTypes.shift(); // Remove 'None' value as done in PA
            $scope.availableOrgs = [];
            $scope.srStatusArr = srStatusObj;
            $scope.status_date_opened = false;
            $scope.addedStatuses = [];
            $scope.srsNum = 0;
            $scope.selectedPiArray = [];
            $scope.selectedPersonContactArray = [];
            $scope.editMode = false; // Flag used in manage sites screen
            $scope.addMode = false;
            $scope.selectedInvContact;
            $scope.init = true;         // Used when first loading Site PI and Contact Information values
            $scope.invContactArray = [];
            $scope.itemsOptions = {
                data: [
                    {id: 1, value: 10},
                    {id: 2, value: 50},
                    {id: 3, value: 100}
                ],
                selectedOption: {id: 1, value: 10}
            };
            $scope.phoneNumberFormat = FORMATS.NUMERIC;

            $scope.updatePs = function() {
                // Prevent multiple submissions
                $scope.disableBtn = true;

                $scope.curPs.trial_id = $scope.curTrial.id;

                if ($scope.selectedPiArray.length) {
                    $scope.curPs.participating_site_investigators_attributes = [];
                    var psInvestigatorObj = {person_id: $scope.selectedPiArray[0].id, investigator_type: 'Principal Investigator'};
                    if (!$scope.curPs.new && $scope.curPs.participating_site_investigators.length) {
                        psInvestigatorObj.id = $scope.curPs.participating_site_investigators[$scope.sitePiIdx].id;
                    }
                    $scope.curPs.participating_site_investigators_attributes.push(psInvestigatorObj);
                }

                if ($scope.addedStatuses.length > 0) {
                    $scope.curPs.site_rec_status_wrappers_attributes = [];
                    _.each($scope.addedStatuses, function (status) {
                        $scope.curPs.site_rec_status_wrappers_attributes.push(status);
                    });
                }

                /* Set PI as contact in curPs.participating_site_investigators if needed */
                setContactPiAsContact();

                // An outer param wrapper is needed for nested attributes to work
                var outerPs= {};
                outerPs.new = $scope.curPs.new;
                outerPs.id = $scope.curPs.id;
                outerPs.participating_site = $scope.curPs;

                TrialService.upsertParticipatingSite(outerPs).then(function(response) {
                    var status = response.server_response.status;

                    if (status >= 200 && status <= 210) {
                        toastr.success('Participating Site ' + $scope.curPs.id + ' has been recorded', 'Operation Successful!');

                        if ($scope.usedInModal) {
                            $rootScope.$broadcast('closePsDetail');
                            return;
                        }

                        if ($scope.isManageScreen) {
                            $state.go('main.manageParticipatingSite', {trialId: response.trial.id}, {reload: true});
                        } else {
                            $state.go('main.viewTrial', {trialId: response.trial.id});
                        }

                        // To make sure setPristine() is executed after all $watch functions are complete
                        $timeout(function() {
                           $scope.ps_form.$setPristine();
                       }, 1);

                       // Response needs to refresh PS list
                    }
                }).catch(function(err) {
                    console.log('error in updating trial ' + JSON.stringify(outerPs));
                }).finally(function() {
                    $scope.disableBtn = false;
                    configurePsInvList();
                });
            };

            $scope.reload = function() {
                $state.go($state.$current, null, { reload: true });
            };

            $scope.reset = function() {
                $scope.availableOrgs = [];
                $scope.srStatusArr = srStatusObj;
                $scope.status_date_opened = false;
                $scope.addedStatuses = [];
                $scope.srsNum = 0;
                $scope.selectedPiArray = [];
                $scope.selectedPersonContactArray = [];
                $scope.selectedInvContact;
                $scope.invContactArray = [];
                $scope.status_date = null;
                $scope.sr_status_id = null;
                $scope.status_comment = null;

                //$scope.curPs = angular.copy($scope.curPsOriginal);
                setupPs('reset');
                $scope.ps_form.$setPristine();
                $scope.init = true;

                /* Execute in a $timeout because Angular 'contact_type' watch needs to run before these values are reset */
                $timeout(function() {
                   $scope.curPs.contact_name = $scope.curPsOriginal.contact_name;
                   $scope.curPs.contact_email = $scope.curPsOriginal.contact_email;
                   $scope.curPs.contact_phone = $scope.curPsOriginal.contact_phone;
                   $scope.curPs.extension = $scope.curPsOriginal.extension;
                   $scope.init = false;
               }, 1000);

            }

            // Delete the associations
            $scope.toggleSelection = function (index, type) {
                if (type == 'sr_status') {
                    if (index < $scope.addedStatuses.length) {
                        $scope.addedStatuses[index]._destroy = !$scope.addedStatuses[index]._destroy;
                        if ($scope.addedStatuses[index]._destroy) {
                            $scope.srsNum--;
                        } else {
                            $scope.srsNum++;
                        }
                        $scope.validateStatus();
                    }
                }
            };

            $scope.openCalendar = function ($event, type) {
                $event.preventDefault();
                $event.stopPropagation();

                if (type == 'status_date') {
                    $scope.status_date_opened = !$scope.status_date_opened;
                }
            };

            // Add trial status to a temp array
            $scope.addStatus = function () {
                if ($scope.status_date && $scope.sr_status_id) {
                    var newStatus = {};
                    newStatus.status_date = $scope.status_date;
                    newStatus.site_recruitment_status_id = $scope.sr_status_id;
                    // For displaying status name in the table
                    _.each($scope.srStatusArr, function (status) {
                        if (status.id == $scope.sr_status_id) {
                            newStatus.sr_status_name = status.name;
                            newStatus.sr_status_code = status.code;
                        }
                    });
                    newStatus.comments = $scope.status_comment;
                    newStatus._destroy = false;
                    TrialService.addStatus($scope.addedStatuses, newStatus);
                    $scope.srsNum++;
                    $scope.status_date = null;
                    $scope.sr_status_id = null;
                    $scope.status_comment = null;
                    $scope.showAddStatusError = false;
                    $scope.validateStatus();
                } else {
                    $scope.showAddStatusError = true;
                }
            };

            // Validate Trials Stautuses
            $scope.validateStatus = function() {
                // Remove statuses with _destroy is true
                var noDestroyStatusArr = [];
                for (var i = 0; i < $scope.addedStatuses.length; i++) {
                    if (!$scope.addedStatuses[i]._destroy) {
                        noDestroyStatusArr.push($scope.addedStatuses[i]);
                    }
                }

                TrialService.validateSrStatus({"statuses": noDestroyStatusArr}).then(function(response) {
                    var status = response.server_response.status;

                    if (status >= 200 && status <= 210) {
                        $scope.statusValidationMsgs = response.validation_msgs;

                        // Add empty object to positions where _destroy is true
                        for (var i = 0; i < $scope.addedStatuses.length; i++) {
                            if ($scope.addedStatuses[i]._destroy) {
                                $scope.statusValidationMsgs.splice(i, 0, {});
                            }
                        }
                    }
                }).catch(function(err) {
                    console.log("Error in validating trial status: " + err);
                });
            };

            $scope.addPs = function() {
                $scope.editMode = false;
                $scope.addMode = true;
                $scope.curPs = {
                    participating_site_investigators: []
                };
                $scope.addedStatuses = [];
                $scope.srsNum = 0;
                $scope.selectedPiArray = [];

                setupPs();
            };

            $scope.editPs = function(psIdx) {
                $scope.editMode = true;
                $scope.addMode = false;
                $scope.curPs = $scope.curTrial.participating_sites[psIdx];
                $scope.addedStatuses = [];
                $scope.srsNum = 0;
                $scope.selectedPiArray = [];

                setupPs();
            };

            activate();

            /****************************** implementations **************************/
            function activate() {
                if ($scope.isManageScreen) {
                    activateManage();
                } else {
                    $scope.curPs = psDetailObj || {};
                    $scope.curPs = $scope.curPs.data || $scope.curPs;
                    $scope.curTrial = trialDetailObj || $scope.curPs.trial;

                    allowPermittedAction();
                    setupPs();
                }
            }

            function activateManage() {
                $scope.curTrial = trialDetailObj;
                $scope.curPs = {};
                //$scope.psGridOptions.data = $scope.curTrial.participating_sites;

                allowPermittedAction();
                console.log('trial and ps are: ', $scope.curTrial, $scope.curPs);
            }


            function setupPs(mode) {
                if (mode === 'reset') {
                    $scope.curPs = angular.copy($scope.curPsOriginal);
                } else {
                    $scope.curPsOriginal = angular.copy($scope.curPs);
                    watchSelectedPiArray()
                    watchContactTypeSelection();
                    watchInvContactSelection();
                    watchPersonContactSelection();
                }

                $scope.curPs.contact_type = $scope.curPs.contact_type ? $scope.curPs.contact_type : 'General';

                appendNewPsFlag();
                populateOrgs();
                setDefaultOrg();

                if (!$scope.curPs.new || $scope.editMode) {
                    setSitePi();
                    appendStatuses();
                }

                configurePsInvList();

                $timeout(function() {
                    $scope.init = false;
                }, 1000);

/*
                _.each($scope.curPs.participating_site_investigators, function(inv) {
                    if (inv.set_as_contact) {
                        var invContact = inv;
                        _.each($scope.invContactArray, function(contactPi) {
                            if (contactPi.id === invContact.id) {
                                $scope.selectedInvContact = contactPi;
                            }
                        });
                    }
                });
*/
            }

            // Redirect to search page if this user is not allowed to mange sites
            function allowPermittedAction() {
                if ($state.$current.name.indexOf('manage') > -1 && $scope.curTrial.actions.indexOf('manage-sites') < 0) {
                    $state.go('main.trials', null, {reload: true});
                }
            }

            /**
             * Append a 'new' key to the $scope.curPs to
             * indicate this is a new trial, not an trial
             * for editing/curating
             *
             */
            function appendNewPsFlag() {
                if ($state.$current.name.indexOf('add') > -1 || $scope.addMode) {
                    $scope.curPs.new = true;
                } else {
                    $scope.curPs.new = false;
                }
            }

            // Populate available organization list
            function populateOrgs() {
                if ($scope.curUser.role === 'ROLE_SITE-SU') {
                    $scope.availableOrgs = $scope.curTrial.available_family_orgs;
                } else {
                    $scope.availableOrgs.push($scope.curUser.organization);
                }
            }

            // Set the default organization
            function setDefaultOrg() {
                if ($scope.availableOrgs.length > 0) {
                    $scope.curPs.organization_id = $scope.availableOrgs[0].id;
                }
            }

            // Set the Site PI from many participating_site_investigators
            function setSitePi() {
                for (var i = 0; i < $scope.curPs.participating_site_investigators.length; i++) {
                    if ($scope.curPs.participating_site_investigators[i].investigator_type === 'Principal Investigator') {
                        $scope.sitePiIdx = i;
                    }
                }
                $timeout( function() {
                    if ($scope.curPs.participating_site_investigators.length) {
                        $scope.selectedPiArray.push($scope.curPs.participating_site_investigators[$scope.sitePiIdx].person);
                    }
                }, 1000);
            }

            // Append site recruitment statuses for existing participating site
            function appendStatuses() {
                for (var i = 0; i < $scope.curPs.site_rec_status_wrappers.length; i++) {
                    var statusWrapper = {};
                    statusWrapper.id = $scope.curPs.site_rec_status_wrappers[i].id;
                    statusWrapper.status_date = $scope.curPs.site_rec_status_wrappers[i].status_date;
                    statusWrapper.site_recruitment_status_id = $scope.curPs.site_rec_status_wrappers[i].site_recruitment_status_id;
                    // For displaying status name in the table
                    _.each($scope.srStatusArr, function (status) {
                        if (status.id == $scope.curPs.site_rec_status_wrappers[i].site_recruitment_status_id) {
                            statusWrapper.sr_status_name = status.name;
                            statusWrapper.sr_status_code = status.code;
                        }
                    });
                    statusWrapper.comments = $scope.curPs.site_rec_status_wrappers[i].comments;
                    statusWrapper._destroy = false;
                    TrialService.addStatus($scope.addedStatuses, statusWrapper);
                    $scope.srsNum++;
                }
                $scope.validateStatus();
            }

            /* Create UI relevant array with obj properties needed in the UI */
            function configurePsInvList() {
                var invList = $scope.curPs.participating_site_investigators;
                $scope.invContactArray = [];

                _.each(invList, function(inv) {
                    if (inv.investigator_type === 'Principal Investigator') {
                        var invObj = {
                            id: inv.id,
                            name: inv.person.lname + ', ' + inv.person.fname,
                            email: inv.person.email,
                            phone: inv.person.phone,
                            extension: inv.person.extension
                        };

                        $scope.invContactArray.push(invObj);
                    }
                });
            }

            /* Watches */
            function watchSelectedPiArray() {
                /* Keeps Site Principal Investigator and Contact information (if contact_type === PI), in sync */
                $scope.$watch(function() {return $scope.selectedPiArray;}, function(newVal, oldVal) {
                    if (newVal.length) {
                        var newInv = newVal[0];
                        console.log('new selected pi is: ', newVal[0]);
                        $scope.invContactArray[0] = {
                           id: newInv.id,
                           name: newInv.lname + ', ' + newInv.fname,
                           email: newInv.email,
                           phone: newInv.phone,
                           extension: newInv.extension
                       };

                       if ($scope.curPs.contact_type === 'PI') {
                           updateSelectedInvestigator();
                       }
                    }

                }, true);
            }

            function watchContactTypeSelection() {
                $scope.$watch(function() {return $scope.curPs.contact_type;}, function(newVal, oldVal) {
                    if (newVal !== oldVal) {
                        clearContactInformation(true)
                    }

                    if (newVal === 'PI') {
                        updateSelectedInvestigator();
                    }
                });
            }


            function watchInvContactSelection() {
                $scope.$watch(function() {return $scope.selectedInvContact;}, function(newVal, oldVal) {
                    var selectedInv = newVal;

                    if ($scope.curPs.contact_type === 'PI') {
                        if (selectedInv) {
                            $scope.curPs.contact_name = selectedInv.name;

                            // when first loading the screen
                            if ($scope.init) {
                                $scope.curPs.contact_phone = $scope.curPs.contact_phone;
                                $scope.curPs.extension = $scope.curPs.extension;
                                $scope.curPs.contact_email = $scope.curPs.contact_email;
                            } else {
                                $scope.curPs.contact_phone = selectedInv.phone ? selectedInv.phone : null;
                                $scope.curPs.extension = selectedInv.extension ? selectedInv.extension : null;
                                $scope.curPs.contact_email = selectedInv.email ? selectedInv.email : null;
                            }
                        } else {
                            clearContactInformation();
                        }
                    }
                });
            }

            function watchPersonContactSelection() {
                $scope.$watch(function() {return $scope.selectedPersonContactArray;}, function(newVal, oldVal) {
                    var selectedPerson;

                    if (newVal.length) {
                        selectedPerson = newVal[0];
                        $scope.curPs.contact_name = PersonService.extractFullName(selectedPerson, 'lf');
                        $scope.curPs.contact_phone = selectedPerson.phone;
                        $scope.curPs.extension = selectedPerson.extension ? selectedPerson.extension : null;
                        $scope.curPs.contact_email = selectedPerson.email;
                    }
                });
            }

            function setContactPiAsContact() {
                var selectedInv = $scope.selectedInvContact;

                if (selectedInv) {
                    _.each($scope.curPs.participating_site_investigators, function(inv) {
                        if (selectedInv.id === inv.id) {
                            inv.set_as_contact = true;
                        } else {
                            inv.set_as_contact = false;
                        }
                    });
                }
            }

            function updateSelectedInvestigator() {
                $scope.selectedInvContact = $scope.invContactArray[0];
            }

            /* Clears out contact information section */
            function clearContactInformation(clearInvContact) {
                $scope.curPs.contact_name = null;
                $scope.curPs.contact_phone = null;
                $scope.curPs.extension = null;
                $scope.curPs.contact_email = null;

                if (clearInvContact) {
                    $scope.selectedInvContact = null;
                }
            }
        }
    }
})();
