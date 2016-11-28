/**
 * Created wangg5 on 11/1/2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.po')
        .controller('personDetailCtrl2', personDetailCtrl2);

    personDetailCtrl2.$inject = ['personDetailObj', 'PersonService', 'toastr', 'DateService', 'UserService', 'MESSAGES', 'serviceRequests',
        '$scope', 'Common', 'sourceStatusObj','sourceContextObj', '$state', '$uibModal', 'OrgService', 'poAffStatuses', '_', '$timeout'];

    function personDetailCtrl2(personDetailObj, PersonService, toastr, DateService, UserService, MESSAGES, serviceRequests,
                              $scope, Common, sourceStatusObj,sourceContextObj, $state, $uibModal, OrgService, poAffStatuses, _, $timeout) {

        var vm = this;
        vm.person = personDetailObj || {lname: "",
                                        source_status_id: "",
                                        source_context: "CTRP",
                                        source_context_id: 2,
                                        new: true,
                                        processing_status: "Complete"}; //personDetailObj.data;
        vm.person = vm.person.data || vm.person;
        _setupState();        
        console.info('vm.person: ', vm.person);

        // actions
        vm.selectContext = selectTab;
        vm.resetForm = resetForm;
        vm.clearForm = clearForm;
        vm.toggleSelection = toggleSelection;
        vm.openCalendar = openCalendar;
        vm.updatePerson = updatePerson;
        vm.cloneCtepPerson = cloneCtepPerson;

        activate();
        function activate() {
            _watchWriteMode();
            _watchOrgAffiliation();
            _watchGlobalWriteMode();
            _watchContextAssociation();
        }

        function selectTab(contextName) {
            if (angular.isDefined(contextName)) {
                vm.tabOpen = contextName;
                vm.curPerson = (contextName === 'CTEP') ? angular.copy(vm.ctepPerson) : angular.copy(vm.ctrpPerson);
                var sourceContextId = angular.isDefined(vm.curPerson) ? vm.curPerson.source_context_id : 2;
                vm.sourceStatusArrSelected = _sourceStatusesForContext(sourceContextId);

                // if new person, assign the ctrp source context id to it
                if (angular.isDefined(vm.curPerson) && vm.curPerson.new) {
                    var ctrpContext = _.findWhere(vm.sourceContextArr, {name: 'CTRP'}); // defaulted to CTRP
                    vm.curPerson.source_context_id = angular.isDefined(ctrpContext) ? ctrpContext.id : null;
                    var actStatus = _.findWhere(vm.sourceStatusArr, {code: 'ACT'}); // defaulted to 'Active' source status
                    vm.curPerson.source_status_id = angular.isDefined(actStatus) ? actStatus.id : null;
                }
                //  && !angular.isDefined(vm.ctrpPerson.associated_persons)
                if (contextName === 'CTRP' && contextName !== vm.defaultTab) {
                    // CTRP is not the default tab
                    // fetch associated persons for the CTRP person, because the CTRP person may
                    // have more association than the currently shown CTEP person
                    PersonService.getPersonById(vm.curPerson.id).then(function(res) {
                        console.info('res from person service: ', res);
                        vm.ctrpPerson = res.data;
                        vm.curPerson = angular.copy(vm.ctrpPerson);
                        vm.curPerson.is_ctrp_context = true;
                        _prepAssociationGrid(vm.curPerson.associated_persons);
                        _populatePOAff();
                        vm.masterCopy = angular.copy(vm.curPerson); // make a copy in the asynch block
                    });
                } else if (contextName === 'CTRP') {
                    // CTRP is the default tab
                    _populatePOAff();
                    _prepAssociationGrid(vm.curPerson.associated_persons);
                }

                _populatePOAff(); // TODO: do this only when context is CTRP ???
                vm.masterCopy = angular.copy(vm.curPerson);
                _updateFormTitleLabel();
            } // if context name is defined

            setFormToPristine();
        }

        function updatePerson() {
            if (!angular.isDefined(vm.curPerson)) {
                console.error('vm.curPerson is undefined');
                return;
            }

            if (vm.validOrgsCount === 0 && vm.curPerson.source_context === 'CTRP') {
                vm.affiliatedOrgError = true;
                console.error('affiliated org error, return!');
                return;
            }
            vm.affiliatedOrgError = false;
            if (vm.curPerson.new) {
                vm.savedSelection = vm.savedSelection.filter(function(org) {return !org._destroy;}); // keep the active ones
            }
            if (vm.curPerson.source_context === 'CTRP') {
                vm.curPerson.po_affiliations_attributes = OrgService.preparePOAffiliationArr(vm.savedSelection);
                _.each(vm.curPerson.po_affiliations_attributes, function (aff, idx) {
                    //convert the ISO date to Locale Date String (dates are already converted correctly by the dateFormatter directive so no need to convert them again below)
                    aff['effective_date'] = aff.effective_date ? aff['effective_date'] : null; // DateService.convertISODateToLocaleDateStr(aff['effective_date']) : '';
                    aff['expiration_date'] = aff.expiration_date ? aff['expiration_date'] : null; // DateService.convertISODateToLocaleDateStr(aff['expiration_date']) : '';
                    var affStatusIndex = -1; //PoAffiliationStatus index
                    if (aff.effective_date && !aff.expiration_date) {
                        affStatusIndex = _.findIndex(poAffStatuses, {'name': 'Active'});
                    } else if (aff.expiration_date) {
                        affStatusIndex = _.findIndex(poAffStatuses, {'name': 'Inactive'});
                    }
                    aff.po_affiliation_status_id = affStatusIndex === -1 ? '' : poAffStatuses[affStatusIndex].id;
                    vm.curPerson.po_affiliations_attributes[idx] = aff; //update the po_affiliation with the correct data format
                });
            } else {
                vm.curPerson.po_affiliations_attributes = []; // CTEP person does not have PO affiliations
            }

            //create a nested Person object
            var newPerson = {};
            newPerson.new = vm.curPerson.new || false;
            newPerson.id = vm.curPerson.id || '';
            newPerson.person = vm.curPerson;
            vm.isBtnDisabled = true;
            PersonService.upsertPerson(newPerson).then(function (response) {
                var status = response.status || response.server_response.status;
                if (newPerson.new && status === 201) {
                    // created
                    // 'Person ' + personName + ' has been recorded'
                    _showToastr('Person ' + vm.curPerson.lname + ' has been recorded');
                    vm.curPerson.new = false;
                    $state.go('main.personDetail', {personId: response.data.id});
                } else if (status === 200) {
                    // updated
                    console.info('response with update: ', response);
                    vm.curPerson = response.data;
                    if (vm.curPerson.source_context === 'CTEP') {
                        vm.ctepPerson = angular.copy(vm.curPerson);
                    } else {
                        vm.ctrpPerson = angular.copy(vm.curPerson);
                    }
                    _showToastr('Person ' + vm.curPerson.lname + ' has been recorded');
                    vm.curPerson.new = false;

                    // To make sure setPristine() is executed after all $watch functions are complete
                    setFormToPristine();
                }
            }).catch(function (err) {
                console.log("error in updating person " + JSON.stringify(newPerson));
            }).finally(function() {
                vm.isBtnDisabled = false;
            });

        }

        // retrieve the source statuses for the given sourceContextId in curPerson
        function _sourceStatusesForContext(sourceContextId) {
            var selectedStatusArr = [];
            if (!angular.isDefined(sourceContextId)) return selectedStatusArr;

            selectedStatusArr = vm.sourceStatusArr.filter(function(status) {
                return status.source_context_id === sourceContextId &&
                        status.name.indexOf('Null') === -1;
            });
            return selectedStatusArr;
        }

        /**
         * Watch the selection of organization for affiliation
         * @return {Void} [description]
         */
        function _watchOrgAffiliation() {
            $scope.$watchCollection(function() {return vm.orgsArrayReceiver;}, function(selectedOrgs, oldVal) {
                if (angular.isDefined(selectedOrgs) && angular.isArray(selectedOrgs)) {
                    _.each(selectedOrgs, function(anOrg, index) {
                        if (_.findIndex(vm.savedSelection, {id: anOrg.id}) === -1) {
                            vm.savedSelection.unshift(OrgService.initSelectedOrg(anOrg));
                            $scope.person_form.$setDirty();
                        }
                    });
                }
            }, true);

            $scope.$watch(function() {return vm.savedSelection;},
            function(newVal, oldVal) {
                if (angular.isDefined(newVal) && angular.isArray(newVal) && newVal.length !== oldVal.length) {
                    vm.validOrgsCount += newVal.length - (oldVal.length || 0);
                }
            }, true);
        } // watchOrgAffiliations


        /**
         * Watch for the global write mode changes in the header
         * @return {[type]}
         */
        function _watchGlobalWriteMode() {
            $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
                _updateFormTitleLabel();
            });
        }

        function _watchContextAssociation() {
            vm.isConfirmOpen = false;
            $scope.$watchCollection(function() {
                return vm.associatedPersonContexts;
            }, function(newVal, oldVal) {
                if (angular.isDefined(newVal) && angular.isArray(newVal) && newVal.length > 0) {
                    var ctepPerson = newVal[0];
                    if (angular.isDefined(ctepPerson.ctrp_id) && ctepPerson.ctrp_id !== vm.curPerson.ctrp_id) {
                        vm.isConfirmOpen = true;
                        vm.confirm.title = 'This CTEP person has already been associated. Click "Associate" to change the existing association, click "Cancel" to abort.';
                        vm.confirmAssociatePerson = _.partial(_associateCtepPerson, ctepPerson, vm.curPerson, 'CTEP');
                    } else {
                        return _associateCtepPerson(ctepPerson, vm.curPerson, 'CTEP'); // vm.curPerson is CTRP person context
                    }
                }
            });
        }

        function _associateCtepPerson(ctepPerson, ctrpPerson, sourceContext, forceFlag) {

            var ctrpId = ctrpPerson.ctrp_id;
            vm.isConfirmOpen = false;
            PersonService.associatePersonContext(ctepPerson.id, ctrpId).then(function(res) {
                if (res.server_response.status >= 200 && res.server_response.status < 226) {
                    vm.associatedPersonContexts = []; // clean up container for accepting ctep persons
                    vm.matchedCtrpPersons = [];
                    vm.showMatchedCtrpPerson = false;
                    console.info('associated person response: ', res.person);
                    console.info('sourceContext: ', sourceContext);
                    if (sourceContext === 'CTEP') {
                        res.person.source_context = ctepPerson.source_context;
                        res.person.source_status = ctepPerson.source_status;
                        vm.ctepPerson = angular.copy(res.person);
                        // current person is CTRP
                        vm.ctrpPerson.associated_persons = [res.person].concat(vm.ctrpPerson.associated_persons || []);
                        // vm.curPerson.associated_persons = [res.person].concat(vm.curPerson.associated_persons || []);
                    } else if (sourceContext === 'CTRP') {
                        vm.ctrpPerson = res.person;
                        vm.ctepPerson.ctrp_id = vm.ctrpPerson.ctrp_id;
                    }
                    _showToastr('CTEP person context association was successful');
                    selectTab(sourceContext); // switch to the new tab
                    setFormToPristine();
                }
            }).catch(function(err) {
                console.error('err: ', err);
            });
        }

        function _updateFormTitleLabel() {
            var writeModeEnabled = UserService.isCurationModeEnabled() || false;
            // vm.formTitleLabel = 'View Person';
            if (!angular.isDefined(vm.curPerson)) return;
            if (vm.curPerson.new) {
                vm.formTitleLabel = 'Add Person';
            } else if (writeModeEnabled && !vm.curPerson.new) {
                vm.formTitleLabel = 'Edit Person';
            } else if (!writeModeEnabled) {
                vm.formTitleLabel = 'View Person';
            }
        } // _updateFormTitleLabel

        /**
         * Set up the initial state upload loading
         * @return {[Void]}
         */
        function _setupState() {
            vm.tabIndex = '';
            vm.curPerson = {}; // person currently displayed in the active tab
            vm.ctepPerson = null;
            vm.ctrpPerson = null;
            vm.person.processing_status = vm.person.processing_status || 'Complete';
            vm.defaultTab = vm.person.source_context; // default tab
            vm.tabOpen = vm.defaultTab;
            vm.masterCopy= angular.copy(vm.person);
            vm.sourceStatusArr = sourceStatusObj;
            vm.sourceStatusArr.sort(Common.a2zComparator());
            vm.validOrgsCount = 0; // orgs for affiliation
            vm.sourceStatusArrSelected = [];
            vm.sourceContextArr = sourceContextObj;
            delete serviceRequests.server_response;
            vm.serviceRequests = serviceRequests;
            vm.savedSelection = [];
            vm.associatedPersonContexts = [];
            vm.orgsArrayReceiver = []; //receive selected organizations from the modal
            vm.selectedOrgFilter = '';
            vm.hasCtrpContext = _.findIndex(vm.person.cluster || [], {context: 'CTRP'}) > -1;
            vm.processStatusArr = OrgService.getProcessingStatuses();
            vm.formTitleLabel = 'Add Person'; //TODO: dynamic title ;default form title
            vm.affiliatedOrgError = true; // flag for empty org affiliations
            vm.matchedCtrpPersons = []; // CTRP persons found from attempt to clone ctep person
            vm.associationForRemoval = []; // object person objects
            vm.selectedMatchCtrpPersons = [];
            vm.confirm = {}; // messages
            vm.isBtnDisabled = false;
            vm.isWritable = UserService.isCurationModeEnabled() || false;
            vm.selectedCtrpPerson = null;
            var personContextCache = {"CTRP": null, "CTEP": null, "NLM": null};
            var USER_ROLES_ALLOWED_COMMENT = ['ROLE_CURATOR','ROLE_SUPER','ROLE_ADMIN', 'ROLE_ABSTRACTOR', 'ROLE_ABSTRACTOR-SU', 'ROLE_RO'];
            vm.isAllowedToComment = _.contains(USER_ROLES_ALLOWED_COMMENT, UserService.getUserRole());

            if (vm.person.source_context === 'CTRP') {
                vm.ctrpPerson = angular.copy(vm.person);
                vm.ctepPerson = _.findWhere(vm.person.associated_persons, {source_status: 'Active', source_context: 'CTEP'});
            } else if (vm.person.source_context === 'CTEP') {
                vm.ctepPerson = angular.copy(vm.person);
                vm.ctrpPerson = _.findWhere(vm.person.associated_persons, {source_context: 'CTRP', source_status: 'Active'}) || null;
            } else {
                vm.ctrpPerson = null;
                vm.ctepPerson = null;
            }
            _prepAssociationGrid([]);
            // selectTab(vm.defaultTab);
        }

        function _populatePOAff() {
            if (!angular.isDefined(vm.curPerson) || !angular.isDefined(vm.curPerson.po_affiliations) || vm.curPerson.po_affiliations.length === 0) return;
            //find the organization name with the given id
            var findOrgName = function(poAff, cb) {
                OrgService.getOrgById(poAff.organization_id).then(function(organization) {
                    var status = organization.server_response.status;
                    if (status >= 200 && status <= 210) {
                        var curOrg = {"id" : poAff.organization_id, "name": organization.name};
                        var effectiveDate = angular.isDefined(poAff.effective_date) ? moment(poAff.effective_date).toDate() : null;
                        curOrg.effective_date = effectiveDate; //DateService.convertISODateToLocaleDateStr(poAff.effective_date);
                        var expDate = angular.isDefined(poAff.expiration_date) ? moment(poAff.expiration_date).toDate() : null; //DateService.convertISODateToLocaleDateStr(poAff.expiration_date);
                        curOrg.expiration_date = expDate;
                        curOrg.po_affiliation_status_id = poAff.po_affiliation_status_id;
                        curOrg.po_affiliation_id = poAff.id; //po affiliation id
                        curOrg.lock_version = poAff.lock_version;
                        curOrg._destroy = poAff._destroy || false;
                        // vm.savedSelection.push(curOrg);
                        if (_.findIndex(vm.savedSelection, {id: curOrg.id}) === -1) {
                            vm.savedSelection.push(curOrg);
                        }
                    }
                }).catch(function(err) {
                    console.error("error in retrieving organization name with id: " + poAff.organization_id);
                });
                cb();
            }; // findOrgName

            //return the organizations
            var retOrgs = function() {
                return vm.savedSelection;
            };
            async.eachSeries(vm.curPerson.po_affiliations, findOrgName, retOrgs);
        } // _populatePOAff

        function _showToastr(message) {
            toastr.clear();
            toastr.success(message, 'Operation Successful!');
        }

        function resetForm() {
            angular.copy(vm.masterCopy, vm.curPerson);
            vm.savedSelection = [];
            _populatePOAff();
            setFormToPristine();
        }

        function clearForm() {
            setFormToPristine();
            var excludedKeys = ['new', 'po_affiliations', 'source_status_id', 'source_context_id', 'associated_persons'];
            console.info('clearning form: ', vm.curPerson);
            Object.keys(vm.curPerson).forEach(function(key) {
                if (excludedKeys.indexOf(key) === -1) {
                    vm.curPerson[key] = angular.isArray(vm.curPerson[key]) ? [] : '';
                }
            });
            //default context to ctrp
            // vm.curPerson.source_context_id = OrgService.findContextId(vm.sourceContextArr, 'name', 'CTRP');
            vm.savedSelection = [];
            _populatePOAff();
        }

        /* handle PO affiliations below */
        function toggleSelection(index) {
            if (index < vm.savedSelection.length) {
                var isDestroyed = vm.savedSelection[index]._destroy;
                vm.savedSelection[index]._destroy = !isDestroyed;
                if (!isDestroyed) {
                    vm.validOrgsCount--;
                    if (vm.validOrgsCount <= 0) vm.validOrgsCount = 0;
                } else {
                    vm.validOrgsCount++;
                    vm.affiliatedOrgError = false;
                }
            }
        }

        vm.dateFormat = DateService.getFormats()[1];
        vm.dateOptions = DateService.getDateOptions();
        vm.today = DateService.today();
        function openCalendar($event, index, type) {
            $event.preventDefault();
            $event.stopPropagation();
            if (type === "effective") {
                vm.savedSelection[index].opened_effective = !vm.savedSelection[index].opened_effective;
            } else {
                vm.savedSelection[index].opened_expiration = !vm.savedSelection[index].opened_expiration;
            }
        } // openCalendar

        // remove ctep person from associating to the current ctrp person (vm.curPerson)
        function removePersonAssociation(ctepPerson) {
            if (ctepPerson.is_ctrp_context) return; // do not allow deleting CTRP person (???)
            var ctepPersonId = ctepPerson.id;
            PersonService.removePersonAssociation(ctepPersonId).then(function(res) {

                if (res.is_removed) {
                    vm.curPerson.associated_persons = _.without(vm.curPerson.associated_persons, _.findWhere(vm.curPerson.associated_persons, {id: res.removed_person.id})); // remove the ctep from container
                    vm.ctrpPerson = angular.copy(vm.curPerson);
                    vm.associationForRemoval = [];
                    vm.ctepPerson = null; // deleted
                    _showToastr('The selected person context association was deleted');
                    selectTab(vm.defaultTab);
                    setFormToPristine();
                }
            }).catch(function(err) {
                console.error('err: ', err);
            }).finally(function() {
            });
        } // removePersonAssociation

        function cloneCtepPerson(ctepPersonId, forceClone) {
            vm.isBtnDisabled = true;
            PersonService.cloneCtepPerson(ctepPersonId, forceClone).then(function(res) {
                console.info('res from clone: ', res);
                if (res.is_cloned && angular.isArray(res.matched) && res.matched.length > 0) {
                    _showToastr('The CTEP person context has been successfully cloned');
                    vm.matchedCtrpPersons = []; // clean up
                    vm.showMatchedCtrpPerson = false;
                    vm.ctrpPerson = res.matched[0];
                    console.info('cloned ctrp person: ', vm.ctrpPerson);
                    vm.ctepPerson.ctrp_id = vm.ctrpPerson.ctrp_id; // update the ctepPerson with the ctrp_id
                    vm.curPerson.ctrp_id = vm.ctepPerson.ctrp_id; // the current person is still CTEP, so update its ctrp_id for view
                    selectTab('CTRP'); //show the new cloned CTRP person
                    // vm.curPerson.associated_persons.push(res.matched[0]);
                } else {
                    vm.showMatchedCtrpPerson = true; // show modal for confirming the matched CTRP person
                    // TODO: this matched CTRP person may have been associated to another CTEP person!
                    // create the association function
                    vm.selectedCtrpPerson = null;
                    // vm.confirmAssociatePerson = _.partial(_associateCtepPerson, vm.curPerson); // vm.curPerson is CTEP person, to be filled: CTRP person, 'CTRP'
                    // vm.matchedCtrpPersons = res.matched;
                    vm.confirm = {};
                    vm.confirm.title = 'The following CTRP person(s) matched the CTEP person. Select one for association or click "Cancel" to abort';
                    _prepAssociationGrid(res.matched);
                }

                setFormToPristine();
            }).catch(function(err) {
                console.error('err in cloning person: ', err);
            }).finally(function() {
                vm.isBtnDisabled = false;
            });
        }

        // callback function for ui-grid row selection
        function gridRowSelectionCB(row) {

            if (vm.showMatchedCtrpPerson) {
                // vm.selectedCtrpPerson = row.isSelected ? row.entity : null;
                if (row.isSelected) {
                    vm.selectedMatchCtrpPersons = _removeRows(vm.selectedMatchCtrpPersons); // empty rows
                    vm.selectedMatchCtrpPersons.push(row);
                    vm.selectedCtrpPerson = vm.selectedMatchCtrpPersons[0].entity; // row.entity
                    vm.associate = _.partial(_associateCtepPerson, vm.curPerson, vm.selectedCtrpPerson, 'CTRP'); // vm.curPerson is CTEP person
                    vm.confirmAssociatePerson = _.partial(_associateCtepPerson, vm.curPerson, vm.selectedCtrpPerson, 'CTRP', true); // vm.curPerson is CTEP person
                } else {
                    vm.selectedCtrpPerson = null;
                    vm.associate = null;
                    vm.confirmAssociatePerson = null;
                }
            } else {

                vm.associationForRemoval = _removeRows(vm.associationForRemoval); // empty rows
                if (row.isSelected && !row.entity.is_ctrp_context) {
                    vm.associationForRemoval.push(row);
                    vm.confirmDisAssociate = _.partial(removePersonAssociation, row.entity); // row.entity.id
                }
            }
        }

        /**
         * Remove ui-grid row and mark each as unselected
         * @param  {Array} selectedRows [array of ui-grid rows]
         * @return {Array}              [Empty array]
         */
        function _removeRows(selectedRows) {
            console.info('removing rows: ', selectedRows);
            if (!angular.isDefined(selectedRows) || !angular.isArray(selectedRows)) return [];
            while(selectedRows.length > 0) {
                var del = selectedRows.pop();
                del.isSelected = false;
            }
            return [];
        }

        /**
         * Prepare UI-grid for the given associated person array
         * @param  {Array} personArray [persons associated to the CTRP person context]
         * @return {[type]}             [description]
         */
        function _prepAssociationGrid(personArray) {
            if (!angular.isDefined(personArray) || personArray.length === 0) {
                personArray = [];
            }
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
                        field: 'ctrp_id',
                        enableSorting: false,
                        displayName: 'CTRP ID',
                        width: '100'
                    },
                    {
                        field: 'source_id',
                        enableSorting: true,
                        displayName: 'CTEP ID',
                        width: '100'
                    },
                    {
                        field: 'prefix',
                        enableSorting: false,
                        displayName: 'Prefix',
                        width: '100'
                    },
                    {
                        field: 'fname',
                        enableSorting: false,
                        displayName: 'First Name',
                        width: '100'
                    },
                    {
                        field: 'mname',
                        enableSorting: false,
                        displayName: 'Middle Name',
                        width: '125'
                    },
                    {
                        field: 'lname',
                        enableSorting: false,
                        displayName: 'Last Name',
                        width: '100'
                    },
                    {
                        field: 'suffix',
                        enableSorting: false,
                        displayName: 'Suffix',
                        width: '100'
                    },
                    {
                        field: 'source_status',
                        enableSorting: true,
                        displayName: 'Source Status',
                        width: '100'
                    },
                    {
                        field: 'source_context',
                        enableSorting: false,
                        displayName: 'Source Context',
                        width: '100'
                    },
                    {
                        field: 'source_id',
                        enableSorting: true,
                        displayName: 'Source ID',
                        width: '100'
                    },
                    {
                        field: 'email',
                        enableSorting: true,
                        displayName: 'Email',
                        width: '200'
                    },
                    {
                        field: 'phone',
                        enableSorting: true,
                        displayName: 'Phone',
                        width: '150'
                    },
                    {
                        field: 'affiliated_orgs',
                        displayName: 'Affiliated Orgs',
                        width: '200',
                        enableSorting: false,
                        enableFiltering: false,
                        cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" ng-if="row.entity.affiliated_orgs.length > 0" title="{{COL_FIELD}}">{{COL_FIELD}}</div>' +
                        '<div class="text-center" ng-show="row.entity.affiliated_orgs.length == 0">--</div>'
                    },
                    {
                        field: 'context_person_id',
                        displayName: 'Context Person ID',
                        enableSorting: false,
                        width: '180'
                    },
                    {
                        field: 'processing_status',
                        displayName: 'Processing Status',
                        enableSorting: false,
                        width: '150'
                    },
                    {
                        field: 'service_request',
                        displayName: 'Service Request',
                        enableSorting: false,
                        width: '150'
                    },
                    {
                        field: 'updated_at',
                        displayName: 'Last Updated Date',
                        enableSorting: false,
                        cellFilter: 'date:\'dd-MMM-yyyy\'',
                        width: '200'
                    },
                    {
                        field: 'updated_by',
                        displayName: 'Last Updated By',
                        enableSorting: false,
                        width: '150'
                    },
                    {
                        field: 'association_start_date',
                        displayName: 'Association Start Date',
                        cellFilter: 'date:\'dd-MMM-yyyy\'',
                        enableSorting: false,
                        width: '200'
                    }
                ],
                enableSelectAll: false,
                enableRowHeaderSelection : true,
                enableGridMenu: false
            };

            vm.associatedPersonsOptions.onRegisterApi = function(gridApi) {
                vm.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, gridRowSelectionCB);
            };
            vm.associatedPersonsOptions.data = personArray;
            $timeout(function() {
                if (!!vm.gridApi && !!vm.gridApi.grid) {
                    vm.gridApi.grid.refresh();
                }
            }, 0);
        } // _prepAssociationGrid

        function setFormToPristine() {
            $timeout(function() {
                $scope.person_form.$setPristine();
            }, 1000);
        }

        function _watchWriteMode() {
             $scope.$on(MESSAGES.CURATION_MODE_CHANGED, function() {
                vm.isWritable = UserService.isCurationModeEnabled() || false;
            });
        } // _watchWriteMode

    } // personDetailCtrl2
})();
