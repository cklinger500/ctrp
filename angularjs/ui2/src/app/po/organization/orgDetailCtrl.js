

(function () {
    'use strict';

    angular.module('ctrp.app.po')
        .controller('orgDetailCtrl', orgDetailCtrl);

    orgDetailCtrl.$inject = ['associatedOrgsObj', 'OrgService', 'toastr', 'MESSAGES', 'UserService',
        '$scope', 'countryList', 'Common', 'sourceContextObj', 'sourceStatusObj', 'serviceRequests', '$state', '$timeout'];

    function orgDetailCtrl(associatedOrgsObj, OrgService, toastr, MESSAGES, UserService,
                           $scope, countryList, Common, sourceContextObj, sourceStatusObj, serviceRequests, $state, $timeout) {
         var vm = this;
         setInitialState();
         setScopeMethods();
         activate();

         function activate() {
            initiateOrgs();
            listenToStatesProvinces();
            watchGlobalWriteModeChanges();
            if (vm.ctrpOrg && !vm.ctrpOrg.new) {
                appendNameAliases();
                createAssociatedOrgsTable();
                vm.ctepAssociationExists = vm.ctepOrg && vm.ctepOrg.ctrp_id;
            }

            setFormToPristine();
         }

         function setInitialState() {
             vm.addedNameAliases = [];
             vm.states = [];
             vm.processingStatuses = OrgService.getProcessingStatuses();
             vm.serviceRequests = serviceRequests;
             vm.watchCountrySelection = OrgService.watchCountrySelection();
             vm.countriesArr = countryList;
             vm.sourceContextArr = sourceContextObj;
             vm.sourceStatusArr = sourceStatusObj;
             vm.sourceStatusArr.sort(Common.a2zComparator());
             vm.alias = '';
             vm.curationReady = false;
             vm.showPhoneWarning = false;
             vm.disableBtn = false;
             vm.processStatusArr = OrgService.getProcessingStatuses();
             vm.cloningCTEP = false;
             vm.nilclose = true;
             vm.ctepAssociationExists = false;
             
             // associated Organization grids
             vm.associatedOrgsOptions = {
                 enableColumnResizing: true,
                 totalItems: null,
                 rowHeight: 22,
                 multiSelect: false,
                 useExternalSorting: false,
                 enableFiltering: false,
                 enableVerticalScrollbar: 2,
                 enableHorizontalScrollbar: 2,
                 columnDefs: [
                     {
                         name: 'ctrp_id',
                         enableSorting: false,
                         displayName: 'CTRP ID',
                         width: '100'
                     },
                     {
                         name: 'ctep_id',
                         enableSorting: false,
                         displayName: 'CTEP ID',
                         minWidth: '100'
                     },
                     {
                         name: 'name',
                         displayName: 'Name',
                         enableSorting: false,
                         sort: { direction: 'asc', priority: 1},
                         minWidth: '300'
                     },
                     {
                         name: 'source_status_name',
                         displayName: 'Source Status',
                         enableSorting: false,
                         minWidth: '180'
                     },
                     {
                         name: 'source_context_name',
                         displayName: 'Source Context',
                         enableSorting: false,
                         minWidth: '180'
                     },
                     {
                         name: 'source_id',
                         displayName: 'Source ID',
                         enableSorting: false,
                         minWidth: '130'
                     },
                     {
                         name: 'aff_families_names',
                         displayName: 'Family Name',
                         enableSorting: false,
                         minWidth: '300'
                     },
                     {
                         name: 'phone_with_ext',
                         displayName: 'Phone',
                         enableSorting: false,
                         minWidth: '150'
                     },
                     {
                         name: 'email',
                         displayName: 'Email',
                         enableSorting: false,
                         minWidth: '250'
                     },
                     {
                         name: 'city',
                         displayName: 'City',
                         enableSorting: false,
                         minWidth: '200'
                     },
                     {
                         name: 'state_province',
                         displayName: 'State',
                         enableSorting: false,
                         minWidth: '200'
                     },
                     {
                         name: 'country',
                         displayName: 'Country',
                         enableSorting: false,
                         minWidth: '200'
                     },
                     {
                         name: 'postal_code',
                         displayName: 'Postal Code',
                         enableSorting: false,
                         minWidth: '200'
                     },
                     {
                         name: 'id',
                         displayName: 'Context ID',
                         enableSorting: false,
                         minWidth: '180'
                     },
                     {
                         name: 'processing_status',
                         displayName: 'Processing Status',
                         enableSorting: false,
                         width: '*',
                         minWidth: '200'
                     },
                     {
                         name: 'updated_by',
                         displayName: 'Last Updated by',
                         enableSorting: false,
                         width: '*',
                         minWidth: '200'
                     },
                     {
                         name: 'updated_at',
                         displayName: 'Last Updated Date',
                         enableSorting: false,
                         type: 'date',
                         cellFilter: 'date: "dd-MMM-yyyy, H:mm"',
                         width: '*',
                         minWidth: '200'
                     },
                     {
                         name: 'association_date',
                         displayName: 'Association Start Date',
                         enableSorting: false,
                         type: 'date',
                         cellFilter: 'date: "dd-MMM-yyyy, H:mm"',
                         width: '*',
                         minWidth: '200'
                     }
                 ],
                 enableRowHeaderSelection : true,
                 enableGridMenu: false
             };

             // first filtering for CTRP then choosing right active, inactive and pending statuses for ids
             vm.ctrpSourceStatusArr = _.filter(
                 _.filter(vm.sourceStatusArr, function (item) {
                     return _.isEqual(
                         _.filter(vm.sourceContextArr, function (item) {
                             return _.isEqual('CTRP', item.code);
                         })[0].id,
                         item.source_context_id);
                 }), function (item) {
                     return _.contains(["ACT","INACT","PEND"], item.code);
                 });

             $scope.$on(MESSAGES.ORG_SEARCH_NIL_DISMISS, function() {
                if (vm.cloningCTEP) {
                    vm.cloneCtepOrg();
                }
             });

             $scope.$on(MESSAGES.ORG_SEARCH_BTN3_CLICKED, function() {
                // NO NEED TO DO ANYTHING ELSE FOR NOW WHEN THE THIRD BUTTON IS CLICKED.
                 // BECAUSE ORG_SEARCH_NIL_DISMISS IS BROADCAST ON CLOSE, ANYTHING IN THAT WATCH WILL RUN
             });

             $scope.$watch(function() {
                return vm.selectedOrgsArray;
             }, function(newValue, oldValue) {
                if (vm.cloningCTEP) {
                    //reset cloning flag after existing match
                    vm.nilclose = true; //reset
                    vm.ctepAssociateOrgs();

                } else if (newValue && newValue[0] && newValue[0].ctrp_id) {
                    validateNewAssociation(newValue)
                } else {
                    vm.associateOrgs();
                }
             });
         }

         function setScopeMethods() {
            vm.updateOrg = function () {
                vm.disableBtn = true;
                if (vm.addedNameAliases.length > 0) {
                    vm.ctrpOrg.name_aliases_attributes = [];
                    _.each(vm.addedNameAliases, function (otherId) {
                        vm.ctrpOrg.name_aliases_attributes.push(otherId);
                    });
                }
                saveAndRenderOrg({
                    new:    vm.ctrpOrg.new,
                    id:     vm.ctrpOrg.id,
                    organization: vm.ctrpOrg
                });
            };

            vm.updateCTEPOrg = function () {
                vm.disableBtn = true;
                saveAndRenderOrg({
                    id:     vm.ctepOrg.id,
                    organization: {
                        source_context_id:  vm.ctepOrg.source_context_id,
                        service_request_id: vm.ctepOrg.service_request_id,
                        processing_status:  vm.ctepOrg.processing_status,
                        source_context_code: 'CTEP'
                    }
                });
            };

            vm.resetForm = function() {
                angular.copy(vm.ctrpOrgCopy, vm.ctrpOrg);
                vm.addedNameAliases = [];
                appendNameAliases();
                listenToStatesProvinces();
                setFormToPristine();
            };

            vm.resetCTEPForm = function() {
                angular.copy(vm.ctepOrgCopy, vm.ctepOrg);
                setFormToPristine();
            };

            vm.clearForm = function () {
                setFormToPristine();
                vm.addedNameAliases = [];
                vm.alias = '';
                listenToStatesProvinces();
            };

            // Add new alias
            vm.addNameAlias= function () {
                if (vm.alias) {
                    var aliasIndex = Common.indexOfObjectInJsonArray(vm.addedNameAliases, 'name', vm.alias);
                    if (aliasIndex === -1) {
                        var newAlias = {name: vm.alias, _destroy: false};
                        vm.addedNameAliases.unshift(newAlias);
                    }
                    vm.alias = '';
                }
            };

            // toggle remove the aliases
            vm.toggleSelection = function (index, type) {
                if (type === 'other_id') {
                    if (index < vm.addedNameAliases.length) {
                        vm.addedNameAliases[index]._destroy = !vm.addedNameAliases[index]._destroy;
                    }
                }
            };


            //Function that checks if an Organization - based on Name & source context is unique. If not, presents a warning to the user prior. Invokes an AJAX call to the organization/unique Rails end point.
            vm.checkUniqueOrganization = function() {
                vm.showUniqueWarning = false;
                if (vm.ctrpOrg && vm.ctrpOrg.name && vm.ctrpOrg.name.length > 0 && ((vm.ctrpOrgCopy && (vm.ctrpOrg.name !== vm.ctrpOrgCopy.name)) || !vm.ctrpOrgCopy ) ) {
                    OrgService.checkUniqueOrganization({
                        "org_name": vm.ctrpOrg.name,
                        "source_context_id": vm.ctrpOrg.source_context_id,
                        "org_exists": angular.isObject(vm.ctrpOrg),
                        "org_id": vm.ctrpOrg.id
                    }).then(function (response) {
                        var status = response.server_response.status;

                        if (status >= 200 && status <= 210) {
                            vm.name_unqiue = response.name_unique;
                            if (!response.name_unique)
                                vm.showUniqueWarning = true;
                        }
                    }).catch(function (err) {
                        console.log("error in checking for duplicate org name: ", err);
                    });
                }
            };

            vm.isValidPhoneNumber = function(){
                vm.IsPhoneValid = isValidNumberPO(vm.ctrpOrg.phone, vm.ctrpOrg.country);
                vm.showPhoneWarning = true;
            };

            vm.associateOrgs = function () {
                vm.confirmOverrideAssociatePopUp = false;
                if (vm.selectedOrgsArray) {
                    angular.forEach(vm.selectedOrgsArray, function(value) {
                        var newAssociatedOrg = value;
                        newAssociatedOrg.ctrp_id = vm.ctrpOrg.ctrp_id;
                        OrgService.upsertOrg({
                            id:             newAssociatedOrg.id,
                            organization:   newAssociatedOrg
                        }).then(function (response) {
                            var status = response.server_response.status;

                            if (status >= 200 && status <= 210) {
                                vm.associatedOrgs = response.associated_orgs;
                                associateOrgsRefresh();
                                toastr.success('Organization has been associated.', 'Operation Successful!');
                                setFormToPristine();
                            }
                        }).catch(function (err) {
                            console.log("error in associating organization: ", err);
                        }).finally(function() {
                            vm.tabOpen = 'CTRP';
                        });
                    });
                }
            };

            vm.disAssociateOrgs = function (){
                vm.confirmDisAssociatePopUp = false;
                OrgService.disAssociateOrgs({
                    id:             vm.ctrpOrg.id,
                    ctrp_id:        vm.ctrpOrg.ctrp_id,
                    remove_ids:     vm.gridApi.selection.getSelectedRows()
                }).then(function (response) {
                    var status = response.server_response.status;
                    if (status >= 200 && status <= 210) {
                        vm.associatedOrgs = response.associated_orgs;
                        vm.associatedOrgsGridOpen = true;
                        associateOrgsRefresh();
                        toastr.success('Organization(s) association removed.', 'Operation Successful!');
                        setFormToPristine();
                    }
                }).catch(function (err) {
                    console.log("error in disassociating organization: ", err);
                }).finally(function() {
                    vm.selectedOrgs = [];
                });
            };

            vm.ctepAssociateOrgs = function () {
                vm.confirmOverrideAssociatePopUp = false;
                if (vm.selectedOrgsArray) {
                    angular.forEach(vm.selectedOrgsArray, function(value) {
                        var newAssociatedOrg = value;
                        vm.ctepOrg.ctrp_id = newAssociatedOrg.ctrp_id;
                        OrgService.upsertOrg({
                            id:             vm.ctepOrg.id,
                            organization:   vm.ctepOrg
                        }).then(function (response) {
                            var status = response.server_response.status;
                            if (status >= 200 && status <= 210) {
                                vm.associatedOrgs = response.associated_orgs;
                                vm.ctrpOrg = filterOutCTRPOrg(vm.associatedOrgs);
                                vm.ctrpOrgCopy = angular.copy(vm.ctrpOrg);
                                vm.ctrpUpdateTime = Date.now();
                                associateOrgsRefresh();
                                toastr.success('Organization has been associated.', 'Operation Successful!');
                                setFormToPristine();
                            }
                        }).catch(function (err) {
                            console.log("error in associating organization: ", err);
                        }).finally(function() {
                            vm.tabOpen = 'CTRP';
                        });
                    });
                }
            };

            vm.cloneCtepOrg = function() {
                OrgService.cloneCtepOrg(vm.ctepOrg.id).then(function(response) {
                    var status = response.server_response.status;
                    if (status >= 200 && status <= 210) {
                        $timeout(function () {
                            vm.associatedOrgs = response.associated_orgs;
                            vm.ctrpOrg = filterOutCTRPOrg(vm.associatedOrgs);
                            vm.ctrpOrg.processing_status = 'Complete';
                            vm.ctrpOrgCopy = angular.copy(vm.ctrpOrg);
                            vm.ctrpUpdateTime = Date.now();
                            associateOrgsRefresh();
                            toastr.success('Organization has been associated.', 'Operation Successful!');
                            setFormToPristine();
                        }, 1);
                    }
                }).catch(function (err) {
                    console.log("error in cloning ctep organization: ", err);
                }).finally(function() {
                    vm.disableBtn = false;
                    vm.cloningCTEP = false;
                    vm.nilclose = true;
                    vm.tabOpen = 'CTRP';
                });
            };

            vm.associatedOrgsOptions.onRegisterApi = function (gridApi) {
                vm.gridApi = gridApi;
            };
        }

         function initiateOrgs() {
            //set orgs and default tab
            if (associatedOrgsObj) {
                vm.associatedOrgs = associatedOrgsObj.associated_orgs;
                vm.defaultTab = associatedOrgsObj.active_context;
                vm.currentUserIsAdmin = associatedOrgsObj.ac_tp;
                vm.currentUserIsReadAll = associatedOrgsObj.rc_tp;
                vm.ctepOrg = getOrgByContext(vm.associatedOrgs, 'CTEP')[0];
                vm.nlmOrg = getOrgByContext(vm.associatedOrgs,'NLM')[0];
                vm.ctrpOrg =  filterOutCTRPOrg();
                if (vm.ctrpOrg) {
                    vm.ctrpOrgCopy = angular.copy(vm.ctrpOrg);
                }
                if (vm.ctepOrg) {
                    vm.ctepOrgCopy = angular.copy(vm.ctepOrg);
                    vm.ctrpAssociable = associatedOrgsObj.associable;
                }
            } else {
                vm.ctrpOrg = {
                    new:                true,
                    processing_status:  'Complete',
                    source_status_id:   _.filter(
                        vm.ctrpSourceStatusArr, function (item) {
                            return _.isEqual('ACT', item.code);
                        })[0].id
                };
                vm.defaultTab = 'CTRP';
            }
         }

         function saveAndRenderOrg(savedOrgObj) {
            OrgService.upsertOrg(savedOrgObj).then(function (response) {
                var status = response.server_response.status;
                if (status >= 200 && status <= 210) {
                    if (savedOrgObj.new && status === 201) {
                        $state.go('main.orgDetail', {orgId: response.id});
                    } else if (status === 200) {
                        if (savedOrgObj.organization.source_context_code === 'CTRP') {
                            vm.ctrpOrgCopy = angular.copy(vm.ctrpOrg);
                            vm.ctrpOrg.name_aliases = response.name_aliases;
                            vm.addedNameAliases = [];
                            appendNameAliases();
                        } else if (savedOrgObj.organization.source_context_code === 'CTEP') {
                            vm.ctepOrgCopy = angular.copy(vm.ctepOrg);
                        }
                    }
                    showToastr(savedOrgObj.organization.name);
                    savedOrgObj.new = false;
                    savedOrgObj.organization.updated_at = response.updated_at;
                    setFormToPristine();
                }
            }).catch(function (err) {
                console.log("error in updating organization: ", err);
            }).finally(function() {
                vm.disableBtn = false;
            });
        }

         function showToastr(orgName) {
            toastr.clear();
            toastr.success('Organization ' + orgName + ' has been recorded', 'Operation Successful!');
        }

         function filterOutCTRPOrg() {
            vm.ctrpOrgsArr = getOrgByContext(vm.associatedOrgs, 'CTRP');
            if (vm.ctrpOrgsArr.length < 2) {
                return vm.ctrpOrgsArr[0];
            } else {
                vm.ctrpOrg = _.filter(
                    getOrgByContext(vm.associatedOrgs, 'CTRP'), function (item) {
                        return _.isEqual(associatedOrgsObj.active_id, item.id);
                    }
                )[0];
                return vm.ctrpOrg
            }
        }

         function getOrgByContext(orgsArr, context){
            var ve = _.filter(orgsArr, function (item) {
                return _.contains(context, item.source_context_name);
            });
            return ve;
        }

         // Append aliases for existing CTRP org
         function appendNameAliases() {
            for (var i = 0; i < vm.ctrpOrg.name_aliases.length; i++) {
                vm.addedNameAliases.push({
                    id:         vm.ctrpOrg.name_aliases[i].id,
                    name:       vm.ctrpOrg.name_aliases[i].name,
                    _destroy:   false
                });
            }
        }

         /**
          * Watch for the global write mode changes in the header
          * @return {[type]}
         */
         function watchGlobalWriteModeChanges() {
            vm.curOrgEditable = UserService.isCurationModeEnabled();
            //Listen to the write-mode switch
            $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
                vm.curOrgEditable = UserService.isCurationModeEnabled();
                vm.updateTime = Date.now();
                if (vm.ctrpOrg && !vm.ctrpOrg.new) {
                    createAssociatedOrgsTable();
                }
                vm.associatedOrgsOptions.onRegisterApi = function (gridApi) {
                    vm.gridApi = gridApi;
                };
            });
        }

         /**
          * Listen to the message for availability of states or provinces
          * for the selected country
          */
         function listenToStatesProvinces() {
            if (vm.ctrpOrg) {
                if (vm.ctrpOrg.country) {
                    vm.watchCountrySelection(vm.ctrpOrg.country);
                } else {
                    vm.ctrpOrg.country = 'United States'; //default country
                    vm.watchCountrySelection(vm.ctrpOrg.country);
                }

                $scope.$on(MESSAGES.STATES_AVAIL, function () {
                    vm.states = OrgService.getStatesOrProvinces();
                });

                $scope.$on(MESSAGES.STATES_UNAVAIL, function () {
                    vm.states = [];
                })
            }
        } //listenToStatesProvinces

         function associateOrgsRefresh(){
            vm.ctepOrg = getOrgByContext(vm.associatedOrgs, 'CTEP')[0];
            vm.ctepOrgCopy = angular.copy(vm.ctepOrg);
            vm.nlmOrg = getOrgByContext(vm.associatedOrgs,'NLM')[0];
            createAssociatedOrgsTable();
            if (vm.ctepOrg && vm.ctrpOrg) {
                //note that we could simply do ** vm.ctrpUpdateTime = Date.now() ** to update whole CTRP
                // but we are not doing this in case the user is in the middle of editing CTRP during association
                // that way previous edits to CTRP are not lost.
                vm.ctrpOrg.ctep_id = vm.ctepOrg.ctep_id;
                vm.ctepAssociationExists = true;
            }
            vm.updateTime = Date.now(); // forces dom refresh
        }

         function validateNewAssociation(newValue) {
            var newAssociatedOrg = newValue[0];
            if ( (newValue[0].source_context === 'CTEP' && (!vm.ctepOrg || (vm.ctepOrg && newAssociatedOrg.id !== vm.ctepOrg.id))) ||
                (newValue[0].source_context === 'NLM' && (!vm.nlmOrg || (vm.nlmOrg && newAssociatedOrg.id !== vm.nlmOrg.id))) ) {
                vm.confirmOverrideAssociatePopUp = true;
            } else {
                toastr.success('The chosen organization is already associated to this organization.', 'Operation Cancelled!');
            }
        }

         function createAssociatedOrgsTable() {
            vm.associatedOrgsOptions.data = _.filter(
                vm.associatedOrgs, function (item) {
                    return !_.isEqual(vm.ctrpOrgsArr[0].id, item.id);
                });
        }

         function setFormToPristine() {
            $timeout(function() {
                if ($scope.organization_form) {
                    $scope.organization_form.$setPristine();
                }
            }, 1000);
        }
    }
}());
