/**
 * Created by wus4 on 7/6/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.po')
        .controller('personDetailCtrl', personDetailCtrl);

    personDetailCtrl.$inject = ['personDetailObj', 'PersonService', 'toastr', 'DateService', 'UserService', 'MESSAGES',
        '$scope', 'Common', 'sourceStatusObj','sourceContextObj', '$state', '$uibModal', 'OrgService', 'poAffStatuses', '_', '$timeout'];

    function personDetailCtrl(personDetailObj, PersonService, toastr, DateService, UserService, MESSAGES,
                              $scope, Common, sourceStatusObj,sourceContextObj, $state, $uibModal, OrgService, poAffStatuses, _, $timeout) {
        var vm = this;
        vm.curPerson = personDetailObj || {lname: "", source_status_id: ""}; //personDetailObj.data;
        vm.curPerson = vm.curPerson.data || vm.curPerson;
        console.info('vm.curPerson: ', vm.curPerson);
        vm.curPerson.processing_status = 'Complete';
        vm.masterCopy= angular.copy(vm.curPerson);
        vm.sourceStatusArr = sourceStatusObj;
        vm.sourceStatusArr.sort(Common.a2zComparator());
        vm.sourceContextArr = sourceContextObj;
        vm.savedSelection = [];
        vm.associatedPersonContexts = [];
        vm.orgsArrayReceiver = []; //receive selected organizations from the modal
        vm.selectedOrgFilter = '';
        vm.hasCtrpContext = _.findIndex(vm.curPerson.cluster || [], {context: 'CTRP'}) > -1;
        var globalWriteModeEnabled = UserService.isCurationModeEnabled() || false;
        vm.processStatusArr = OrgService.getProcessingStatuses();
        vm.formTitleLabel = 'Add Person'; //default form title
        vm.affiliatedOrgError = true; // flag for empty org affiliations
        vm.matchedCtrpPersons = []; // CTRP persons found from attempt to clone ctep person
        var personContextCache = {"CTRP": null, "CTEP": null, "NLM": null};
        var USER_ROLES_ALLOWED_COMMENT = ['ROLE_CURATOR','ROLE_SUPER','ROLE_ADMIN', 'ROLE_ABSTRACTOR', 'ROLE_RO'];
        vm.isAllowedToComment = _.contains(USER_ROLES_ALLOWED_COMMENT, UserService.getUserRole());

        // actions:
        vm.removeAssociation = removePersonAssociation;
        vm.cloneCtepPerson = cloneCtepPerson;

        //update person (vm.curPerson)
        vm.updatePerson = function () {
            if (vm.savedSelection.length === 0) {
                vm.affiliatedOrgError = true;
                console.info('affiliated org error, return!');
                return;
            }
            console.info('NO affiliated org error!');
            vm.affiliatedOrgError = false;
            vm.curPerson.po_affiliations_attributes = OrgService.preparePOAffiliationArr(vm.savedSelection); //append an array of affiliated organizations
            _.each(vm.curPerson.po_affiliations_attributes, function (aff, idx) {
                //convert the ISO date to Locale Date String (dates are already converted correctly by the dateFormatter directive so no need to convert them again below)
                aff['effective_date'] = aff.effective_date ? aff['effective_date'] : ''; // DateService.convertISODateToLocaleDateStr(aff['effective_date']) : '';
                aff['expiration_date'] = aff.expiration_date ? aff['expiration_date'] : ''; // DateService.convertISODateToLocaleDateStr(aff['expiration_date']) : '';
                var affStatusIndex = -1; //PoAffiliationStatus index
                if (aff.effective_date && !aff.expiration_date) {
                    affStatusIndex = _.findIndex(poAffStatuses, {'name': 'Active'});
                } else if (aff.expiration_date) {
                    affStatusIndex = _.findIndex(poAffStatuses, {'name': 'Inactive'});
                }
                aff.po_affiliation_status_id = affStatusIndex == -1 ? '' : poAffStatuses[affStatusIndex].id;
                vm.curPerson.po_affiliations_attributes[idx] = aff; //update the po_affiliation with the correct data format
            });

            //create a nested Person object
            var newPerson = {};
            newPerson.new = vm.curPerson.new || '';
            newPerson.id = vm.curPerson.id || '';
            newPerson.person = vm.curPerson;

            PersonService.upsertPerson(newPerson).then(function (response) {
                var status = response.status || response.server_response.status;
                if (newPerson.new && status === 201) {
                    // created
                    // 'Person ' + personName + ' has been recorded'
                    showToastr('Person ' + vm.curPerson.lname + ' has been recorded');
                    vm.curPerson.new = false;
                    $state.go('main.personDetail', {personId: response.data.id});
                } else if (status === 200) {
                    // updated
                    console.info('response with update: ', response);
                    vm.curPerson = response.data;
                    showToastr('Person ' + vm.curPerson.lname + ' has been recorded');
                    vm.curPerson.new = false;

                    // To make sure setPristine() is executed after all $watch functions are complete
                    $timeout(function() {
                       $scope.person_form.$setPristine();
                    }, 1);
                }
            }).catch(function (err) {
                console.log("error in updating person " + JSON.stringify(newPerson));
            });
        }; // updatePerson

        function showToastr(message) {
            toastr.clear();
            toastr.success(message, 'Operation Successful!');
        }

        vm.resetForm = function() {
            angular.copy(vm.masterCopy, vm.curPerson);
            vm.savedSelection = [];
            populatePoAffiliations();
            $scope.person_form.$setPristine();
        };

        vm.clearForm = function() {
            $scope.person_form.$setPristine();

            var excludedKeys = ['new', 'po_affiliations', 'source_status_id', 'cluster'];
            Object.keys(vm.curPerson).forEach(function(key) {
                if (excludedKeys.indexOf(key) == -1) {
                    vm.curPerson[key] = angular.isArray(vm.curPerson[key]) ? [] : '';
                }
            });
            //default context to ctrp
            vm.curPerson.source_context_id = OrgService.findContextId(vm.sourceContextArr, 'name', 'CTRP');
            vm.savedSelection = [];
            populatePoAffiliations();
        };

        //delete the affiliated organization from table view
        vm.toggleSelection = function (index) {
            if (index < vm.savedSelection.length) {
                vm.savedSelection[index]._destroy = !vm.savedSelection[index]._destroy;
               // vm.savedSelection.splice(index, 1);
            }
        };// toggleSelection

        //select or de-select all organizations form affiliations
        vm.batchSelect = function (intention, selectedOrgsArr) {
            if (intention == "selectAll") {
                //iterate the organizations asynchronously
                async.each(selectedOrgsArr, function (org, cb) {
                    if (OrgService.indexOfOrganization(vm.savedSelection, org) == -1) {
                        vm.savedSelection.unshift(OrgService.initSelectedOrg(org));
                    }
                    cb();
                }, function (err) {
                    if (err) {
                        console.log("an error occurred when iterating the organizations");
                    }
                });
            } else {
               // vm.savedSelection.length = 0;
                _.each(vm.savedSelection, function(org, index) {
                   vm.savedSelection[index]._destroy = true; //mark it for destroy
                });
            }
            // console.log("vm.savedSelection.length = " + vm.savedSelection.length);
        }; //batchSelect


        vm.dateFormat = DateService.getFormats()[1];
        vm.dateOptions = DateService.getDateOptions();
        vm.today = DateService.today();
        vm.openCalendar = function ($event, index, type) {
            $event.preventDefault();
            $event.stopPropagation();

            if (type == "effective") {
                vm.savedSelection[index].opened_effective = !vm.savedSelection[index].opened_effective;
            } else {
                vm.savedSelection[index].opened_expiration = !vm.savedSelection[index].opened_expiration;
            }
        }; //openCalendar

        activate();

        // Swap context when different tab is selected
        $scope.$watch(function() {
            return vm.tabIndex;
        }, function(newValue, oldValue) {
            if (!vm.curPerson.new) {
                var contextKey = vm.curPerson.cluster[newValue].context;
                if (!!personContextCache[contextKey]) {
                    vm.curPerson = personContextCache[contextKey];
                    switchSourceContext();
                } else {
                    PersonService.getPersonById(vm.curPerson.cluster[newValue].id).then(function (response) {
                        var status = response.status;
                        if (status >= 200 && status <= 210) {
                            personContextCache[contextKey] = angular.copy(response.data);
                            vm.curPerson = personContextCache[contextKey];
                            switchSourceContext();
                        }
                    }).catch(function (err) {
                        console.log("Error in retrieving person during tab change.");
                    });
                }

            }
        });

        /****************** implementations below ***************/
        function activate() {
            appendNewPersonFlag();
            setTabIndex();
            watchGlobalWriteModeChanges();
            watchOrgReceiver();
            watchSourceContext();
            watchContextAssociation();
            if (vm.curPerson.po_affiliations && vm.curPerson.po_affiliations.length > 0) {
                populatePoAffiliations();
            }
            if(!vm.curPerson.new) {
                prepareModal();
            }
            filterSourceContext();
            locateSourceStatus();
            createFormTitleLabel();
            watchOrgAffiliations();
            _prepAssociationGrid(vm.curPerson.associated_persons);
        }


        /**
         * Append a 'new' key to the vm.curPerson to
         * indicate this is a new person, not an person
         * for editing/curating
         *
         */
        function appendNewPersonFlag() {
            if ($state.$current.name.indexOf('add') > -1) {
                vm.curPerson.new = true;  //
            }
        }

        function setTabIndex() {
            if (vm.curPerson.new) {
                vm.curPerson.cluster = [{"context": "CTRP"}];
            } else {
                for (var i = 0; i < vm.curPerson.cluster.length; i++) {
                    if (vm.curPerson.cluster[i].id == vm.curPerson.id) {
                        vm.tabIndex = i;
                    }
                }
            }
        }

        /**
         * functions to be triggered when source context is switched
         *
         * @return {[type]} [description]
         */
        function switchSourceContext() {
            vm.savedSelection = [];
            populatePoAffiliations();
            filterSourceContext();
            locateSourceStatus();
            createFormTitleLabel();
            vm.masterCopy= angular.copy(vm.curPerson);
        }

        /**
         * Watch for the global write mode changes in the header
         * @return {[type]}
         */
        function watchGlobalWriteModeChanges() {
            $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
                createFormTitleLabel();
            });
        }

        /**
         * Watch the array savedSelection for affiliated organizations
         * @return {[type]} [description]
         */
        function watchOrgAffiliations() {
            $scope.$watchCollection(function() {return vm.savedSelection;},
            function(newVal, oldVal) {
                if (!!newVal && angular.isArray(newVal) && newVal.length !== oldVal.length) {
                    vm.affiliatedOrgError = newVal.length === 0;
                }
            });
        }

        /**
         * Generate approprate appropriate form title, e.g. 'Edit Person'
         * @return {void}
         */
        function createFormTitleLabel() {
            globalWriteModeEnabled = UserService.isCurationModeEnabled() || false;
            vm.formTitleLabel = 'View Person';
            if (globalWriteModeEnabled) {
                vm.formTitleLabel = vm.curPersonEditable && !vm.curPerson.new ? 'Edit Person' : 'View Person';
                vm.formTitleLabel = vm.curPerson.new ? 'Add Person' : vm.formTitleLabel;
            }
        }


        /**
         * Find the source status name if the person has a source_status_id,
         * or find the source status name that has code = 'ACT' if the person does not
         * have a source_status_id (e.g. a new person)
         * @return {void}
         */
        function locateSourceStatus() {
            var curSourceStatusObj = {name: '', id: ''};

            if (vm.curPerson.new) {
                curSourceStatusObj = _.findWhere(vm.sourceStatusArr, {code: 'ACT', source_context_id: vm.curPerson.source_context_id}) || curSourceStatusObj;
                //only show active status for new Person
                vm.sourceStatusArr = [curSourceStatusObj];
            } else {
                //restore the list of source status for non-new person
                vm.sourceStatusArr = sourceStatusObj;
                curSourceStatusObj = _.findWhere(vm.sourceStatusArr, {id: vm.curPerson.source_status_id}) || curSourceStatusObj;
            }
            vm.curSourceStatusName = curSourceStatusObj.name;
            vm.curPerson.source_status_id = curSourceStatusObj.id;
        }

        /**
         * Filter out NLM and CTEP source contexts from UI
         * @return {[type]} [description]
         */
        function filterSourceContext() {
            var clonedPersonSourceContextArr = angular.copy(vm.sourceContextArr);
            if (!vm.curPerson.new) {
                var curPersonSourceContextObj = _.findWhere(vm.sourceContextArr, {id: vm.curPerson.source_context_id});
                vm.curSourceContextName = !!curPersonSourceContextObj ? curPersonSourceContextObj.name : '';
            } else {
                vm.curSourceContextName = 'CTRP'; //default CTRP
                var ctrpSourceContextObj = _.findWhere(vm.sourceContextArr, {code: 'CTRP'});
                vm.curPerson.source_context_id = !!ctrpSourceContextObj ? ctrpSourceContextObj.id : '';
            }
            //delete 'CTEP and 'NLM' from the sourceContextArr
            vm.sourceContextArr = _.without(vm.sourceContextArr, _.findWhere(vm.sourceContextArr, {name: 'CTEP'}));
            vm.sourceContextArr = _.without(vm.sourceContextArr, _.findWhere(vm.sourceContextArr, {name: 'NLM'}));
            vm.curPersonEditable = vm.curSourceContextName === 'CTRP' || vm.curPerson.new; //if not CTRP context, render it readonly
         }

        /**
         * watch organizations selected from the modal
         */
        function watchOrgReceiver() {
            $scope.$watchCollection(function() {return vm.orgsArrayReceiver;}, function(selectedOrgs, oldVal) {
                _.each(selectedOrgs, function(anOrg, index) {
                    //prevent pushing duplicated org
                    if (Common.indexOfObjectInJsonArray(vm.savedSelection, "id", anOrg.id) == -1) {
                        vm.savedSelection.unshift(OrgService.initSelectedOrg(anOrg));
                        $scope.person_form.$setDirty();
                    }
                });

            }, true);
        } //watchOrgReceiver

        function watchSourceContext() {
            $scope.$watch(function() {
                return vm.curPerson.source_context_id;
            }, function(newVal, oldVal) {
                newVal = newVal || 1;
                var context = _.findWhere(vm.sourceContextArr, {id: newVal});
                if (!!context && context.code === 'CTRP' && vm.curPerson.new) {
                    vm.curPerson.processing_status = 'Complete' // default to Complete for CTRP person
                }
                vm.sourceStatusArrSelected = vm.sourceStatusArr.filter(function(s) {
                    // do not show nullified source status!
                    return s.source_context_id === newVal && s.name.indexOf('Null') == -1;
                });
            }, true);
        }

        /**
         * Watching the person context selected for associating with the current CTRP person
         * @return {[type]} [description]
         */
        function watchContextAssociation() {
            vm.isConfirmOpen = false;
            $scope.$watchCollection(function() {
                return vm.associatedPersonContexts;
            }, function(newVal, oldVal) {
                if (!!newVal && angular.isArray(newVal) && newVal.length > 0) {
                    var ctepPerson = newVal[0];
                    if (angular.isDefined(ctepPerson.ctrp_id) && ctepPerson.ctrp_id !== vm.curPerson.ctrp_id) {
                        vm.isConfirmOpen = true;
                        vm.confirmAssociatePerson = _.partial(_associateCtepPerson, ctepPerson, vm.curPerson);
                    } else {
                        return _associateCtepPerson(ctepPerson, vm.curPerson, 'CTEP'); // vm.curPerson is CTRP person context
                    }
                }
            });
        }

        vm.associate = _.partial(_associateCtepPerson, vm.curPerson); // used for associating ctep person to ctrp person, vm.curPerson is CTEP person id
        function _associateCtepPerson(ctepPerson, ctrpPerson, sourceContext) {
            var ctrpId = ctrpPerson.ctrp_id;
            vm.isConfirmOpen = false;
            console.info('ctrp person to be associated: ', ctrpPerson);
            PersonService.associatePersonContext(ctepPerson.id, ctrpId).then(function(res) {
                console.info('res with association person: ', res); // resp.person
                if (res.server_response.status >= 200 && res.server_response.status < 226) {
                    vm.associatedPersonContexts = []; // clean up
                    vm.matchedCtrpPersons = []; // clean up
                    if (_.findIndex(vm.curPerson.cluster, {id: res.person.id, context: sourceContext}) === -1) {
                        vm.curPerson.cluster.push({context: sourceContext, id: res.person.id});
                        res.person.source_context = ctepPerson.source_context;
                        res.person.source_status = ctepPerson.source_status;
                        if (!vm.curPerson.associated_persons || !angular.isArray(vm.curPerson.associated_persons)) {
                            vm.curPerson.associated_persons = [];
                            vm.curPerson.associated_persons.push(vm.curPerson);
                        }
                        vm.curPerson.associated_persons.push(res.person);
                        _prepAssociationGrid(vm.curPerson.associated_persons);
                        showToastr('CTEP person context association was successful');
                    }
                }

            }).catch(function(err) {
                console.error('err: ', err);
            });
        }

        /**
         * Asynchronously populate the vm.savedSelection array for presenting
         * the existing po_affiliation with the person being presented
         *
         */
        function populatePoAffiliations() {
            //find the organization name with the given id
            var findOrgName = function(poAff, cb) {
                OrgService.getOrgById(poAff.organization_id).then(function(organization) {
                    var status = organization.server_response.status;

                    if (status >= 200 && status <= 210) {
                        var curOrg = {"id" : poAff.organization_id, "name": organization.name};
                        curOrg.effective_date = moment(poAff.effective_date).toDate(); //DateService.convertISODateToLocaleDateStr(poAff.effective_date);
                        curOrg.expiration_date = moment(poAff.expiration_date).toDate(); //DateService.convertISODateToLocaleDateStr(poAff.expiration_date);
                        curOrg.po_affiliation_status_id = poAff.po_affiliation_status_id;
                        curOrg.po_affiliation_id = poAff.id; //po affiliation id
                        curOrg.lock_version = poAff.lock_version;
                        curOrg._destroy = poAff._destroy || false;
                        vm.savedSelection.push(curOrg);
                    }
                }).catch(function(err) {
                    console.error("error in retrieving organization name with id: " + poAff.organization_id);
                });
                cb();
            };

            //return the organizations
            var retOrgs = function() {
                return vm.savedSelection;
            };

            async.eachSeries(vm.curPerson.po_affiliations, findOrgName, retOrgs);
        } //populatePoAffiliations

        function prepareModal() {
            vm.confirmDelete = function (size) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'delete_confirm_template.html',
                    controller: 'ModalInstancePersonCtrl as vm',
                    size: size,
                    resolve: {
                        personId: function () {
                            return vm.curPerson.id;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $state.go('main.people');
                }, function () {
                    console.log("operation canceled")
                });

            } //prepareModal
        }; //confirmDelete

        function removePersonAssociation(ctepPersonId, ctrp_source_id) {
            PersonService.removePersonAssociation(ctepPersonId).then(function(res) {
                if (res.is_removed) {
                    // filter out the deleted persons (both ctep and its associated ctrp person)
                    vm.curPerson.associated_persons = _.filter(vm.curPerson.associated_persons, function(p) {
                        return p.ctrp_source_id !== ctrp_source_id;
                    });
                    // vm.curPerson.associated_persons = _.without(vm.curPerson.associated_persons, _.findWhere(vm.curPerson.associated_persons, {ctrp_source_id: ctrp_source_id})); // remove both ctep and ctrp person contexts in the array
                    vm.curPerson.cluster = _.without(vm.curPerson.cluster, _.findWhere(vm.curPerson.cluster, {id: ctepPersonId})); // remove the tab
                    showToastr('The selected person context association was deleted');
                }
            }).catch(function(err) {
                console.error('err: ', err);
            }).finally(function() {
            });
        }

        function cloneCtepPerson(ctepPersonId, forceClone) {
            PersonService.cloneCtepPerson(ctepPersonId, forceClone).then(function(res) {
                console.info('res from clone: ', res);
                if (res.is_cloned) {
                    showToastr('The CTEP person context has been successfully cloned');
                    vm.matchedCtrpPersons = [];
                    // personContextCache['CTRP'] = res.matched; // CTRP person context
                    vm.curPerson.cluster.push({context: 'CTRP', id: res.matched.id});
                    vm.curPerson.associated_persons.push(res.matched);
                } else {
                    vm.matchedCtrpPersons = res.matched;
                }
            }).catch(function(err) {
                console.error('err in cloning person: ', err);
            });
        }

        function _prepAssociationGrid(personArray) {
            if (!angular.isDefined(personArray) || personArray.length === 0) return;
            vm.associatedPersonsOptions = {
                enableColumnResizing: true,
                totalItems: null,
                rowHeight: 22,
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
                        name: 'source_id',
                        enableSorting: true,
                        displayName: 'CTEP ID',
                        minWidth: '100'
                    },
                    {
                        name: 'prefix',
                        enableSorting: false,
                        displayName: 'Prefix',
                        minWidth: '100'
                    },
                    {
                        name: 'fname',
                        enableSorting: false,
                        displayName: 'First Name',
                        minWidth: '100'
                    },
                    {
                        name: 'mname',
                        enableSorting: false,
                        displayName: 'Middle Name',
                        minWidth: '100'
                    },
                    {
                        name: 'lname',
                        enableSorting: false,
                        displayName: 'Last Name',
                        minWidth: '100'
                    },
                    {
                        name: 'suffix',
                        enableSorting: false,
                        displayName: 'Suffix',
                        minWidth: '100'
                    },
                    {
                        name: 'source_status',
                        enableSorting: true,
                        displayName: 'Source Status',
                        minWidth: '100'
                    },
                    {
                        name: 'source_context',
                        enableSorting: false,
                        displayName: 'Source Context',
                        minWidth: '100'
                    },
                    {
                        name: 'source_id',
                        enableSorting: true,
                        displayName: 'Source ID',
                        minWidth: '100'
                    },
                    {
                        name: 'email',
                        enableSorting: true,
                        displayName: 'Email',
                        minWidth: '100'
                    },
                    {
                        name: 'phone',
                        enableSorting: true,
                        displayName: 'Phone',
                        minWidth: '100'
                    },
                    // TODO: list orgs

                    {
                        name: 'context_person_id',
                        displayName: 'Context Person ID',
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
                        name: 'service_request',
                        displayName: 'Service REqu',
                        enableSorting: false,
                        width: '*',
                        minWidth: '200'
                    },
                    {
                        name: 'updated_at',
                        displayName: 'Last Updated Date',
                        enableSorting: false,
                        cellFilter: 'date:\'dd-MMM-yyyy\'',
                        width: '*',
                        minWidth: '200'
                    },
                    {
                        name: 'updated_by',
                        displayName: 'Last Updated By',
                        enableSorting: false,
                        width: '*',
                        minWidth: '200'
                    },
                    {
                        name: 'association_start_date',
                        displayName: 'Association Start Date',
                        cellFilter: 'date:\'dd-MMM-yyyy\'',
                        enableSorting: false,
                        width: '*',
                        minWidth: '200'
                    }
                ],
                enableSelectAll: true,
                enableRowHeaderSelection : true,
                enableGridMenu: false
            };

            vm.associatedPersonsOptions.onRegisterApi = function(gridApi) {
                vm.gridApi = gridApi;
            };
            vm.associatedPersonsOptions.data = personArray;
        }


        //Function that checks if a user name - based on First & Last names is unique. If not, presents a warning to the user prior. Invokes an AJAX call to the person/unique Rails end point.
        $scope.checkForNameUniqueness = function() {
            var ID = 0;
            if(angular.isObject(personDetailObj)) {
                ID = vm.curPerson.id;
            }

            var searchParams = {"person_fname": vm.curPerson.fname, "person_lname": vm.curPerson.lname, "source_context_id": vm.curPerson.source_context_id, "person_exists": angular.isObject(personDetailObj), "person_id": ID};
            vm.showUniqueWarning = false;

            var result = PersonService.checkUniquePerson(searchParams).then(function (response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.name_unqiue = response.name_unique;
                    if(!response.name_unique && vm.curPerson.lname.length > 0 && vm.curPerson.fname.length > 0) {
                        vm.showUniqueWarning = true;
                    }
                }
            }).catch(function (err) {
                console.log("error in checking for duplicate person name " + JSON.stringify(err));
            });
        };
    }


})();
