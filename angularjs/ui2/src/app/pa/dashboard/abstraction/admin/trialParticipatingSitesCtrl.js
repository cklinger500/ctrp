
/**
 * Created by schintal, Jan 31, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('trialPsWarningModalController', trialPsWarningModalController)
    .controller('trialParticipatingSitesCtrl', trialParticipatingSitesCtrl);

    trialPsWarningModalController.$inject = ['$scope', '$uibModalInstance'];
    trialParticipatingSitesCtrl.$inject = ['FORMATS', 'TrialService', 'PATrialService', 'PersonService','DateService', '$scope', '$window', '$uibModal', '$timeout','$state', '$stateParams', 'toastr', 'MESSAGES', 'trialDetailObj', 'siteRecruitmentStatusesObj', 'centralContactTypes', 'investigatorTypes', '$location', '$anchorScroll'];

    function trialParticipatingSitesCtrl(FORMATS, TrialService, PATrialService, PersonService, DateService , $scope, $window, $uibModal, $timeout, $state, $stateParams, toastr, MESSAGES, trialDetailObj, siteRecruitmentStatusesObj, centralContactTypes, investigatorTypes, $location, $anchorScroll) {
        var vm = this;

        activate();

        /****************** implementations below ***************/
        function _initializeModelProps() {
            // injected objects
            vm.curTrial = trialDetailObj;
            vm.siteRecruitmentStatusesArr = siteRecruitmentStatusesObj;

            /* Too many properties, define in arrays grouped by common default value */
            var propNullArray = ['city', 'state_province', 'country', 'postal', 'selectedInvestigator']; // ex: common default value = null
            var propFalseArray = ['selectedContactTypePI', 'showInvestigatorRoleError', 'invDeleteException', 'srStatusDeleteException', 'duplicateParticipatingSite', 'addEditMode', 'isSaved', 'disableBtn'];
            var arrayTypeProps = ['siteRecruitmentGrid', 'investigatorGrid', 'investigatorGridOrig', 'investigatorArray'];
            var objTypeProps = ['currentParticipatingSite', 'current_site_recruitment', 'current_investigator', 'persisted_contact', 'persistedOrganization'];
            var complexObjTypeProps = ['selOrganization', 'principalInvestigator', 'selectedPerson'];

            initArrayProps(objTypeProps, {});
            initArrayProps(complexObjTypeProps, {name: '', array: []});
            initArrayProps(arrayTypeProps, []);
            initArrayProps(propNullArray, null);
            initArrayProps(propFalseArray, false);

            // custom initializations
            vm.currentParticipatingSite.site_rec_status_wrappers_attributes=[];
            vm.currentParticipatingSite.participating_site_investigators=[];
            vm.showOrgFields = true;
            vm.dateFormat = DateService.getFormats()[1];
            vm.dateOptions = DateService.getDateOptions();
            vm.centralContactTypes = centralContactTypes.types;
            vm.investigatorTypes = investigatorTypes;
            vm.tabIndex = 0;
            vm.formArray = ['ps_sites_form', 'ps_inv_form', 'ps_contact_form'];
            vm.isSaved = false;
            vm.invContactIndex = -1;

            for (var i = 0; i < vm.centralContactTypes.length; i++) {
               if (vm.centralContactTypes[i].code  === 'NONE') {
                   vm.centralContactTypes.splice(i, 1);
               }
            }
        }

        function _assignActions() {
            vm.deleteListHandler = deleteListHandler;
            vm.deleteSelected = deleteSelected;
            vm.addSiteRecruitment = addSiteRecruitment;
            vm.editSiteRecruitment = editSiteRecruitment;
            vm.deleteSiteRecruitment = deleteSiteRecruitment;
            vm.cancelSiteRecruitmentEdit = cancelSiteRecruitmentEdit;
            vm.cancelInvestigatorEdit = cancelInvestigatorEdit;
            vm.editInvestigator  = editInvestigator;
            vm.markInvestigatorForDeletion = markInvestigatorForDeletion;
            vm.deleteInvestigator  = deleteInvestigator;
            vm.commitEditInvestigator = commitEditInvestigator;
            vm.setAddMode = setAddMode;
            vm.setEditMode = setEditMode;
            vm.openCalendar = openCalendar;
            vm.commitEditSiteRecruitment = commitEditSiteRecruitment;
            vm.resetParticipatingSite = resetParticipatingSite;
            vm.watchContactType = watchContactType;
        }

        function activate() {
            _initializeModelProps();
            _assignActions();

            console.log('vm is now: ', vm);

            getTrialDetailCopy();
            watchTrialDetailObj();
            watchOrganization();
            watchPISelection();
            watchContactType();
            watchPersonSelection();
            watchInvestigatorSelection();

            /* Phone number masking sets forms to dirty on load because
               it changes the viewValue of the phone number. The code
               below resets the forms on initialization.
            */
            resetDirtyForms();
        }

        /* Takes array of properties and initializes to a specified default value */
        function initArrayProps(props, val) {
            var propsArray = props;
            var initialVal;

            if (typeof val === 'object') {
                _.each(propsArray, function(prop) {
                    /* copy so a reference to same object isn't assigned to different variables */
                    initialVal = angular.copy(val);
                    vm[prop] = initialVal;
                });
            } else {
                _.each(propsArray, function(prop) {
                    initialVal = val;
                    vm[prop] = initialVal;
                });
            }
        }

        vm.checkAllSites = function () {
            if (vm.selectedAllSites) {
                vm.selectedAllSites = true;
            } else {
                vm.selectedAllSites = false;
            }

            angular.forEach(vm.curTrial.participating_sites, function (item) {
                item.selected = vm.selectedAllSites;
                vm.deleteListHandler(vm.curTrial.participating_sites);
            });

        };

        vm.resetParticipatingSiteContactInfo = function() {
            clearPsCommonContactProps();
            vm.currentParticipatingSite.contact_type = 'General';
        };

        vm.setParticipatingSiteContactInfo = function() {
            var name = PersonService.extractFullName(vm.currentParticipatingSite.person);
            vm.currentParticipatingSite.contact_name = name;
            vm.currentParticipatingSite.contact_phone =  vm.currentParticipatingSite.contact_phone ? vm.currentParticipatingSite.contact_phone : vm.currentParticipatingSite.person.phone;
            vm.currentParticipatingSite.contact_email =  vm.currentParticipatingSite.contact_email ? vm.currentParticipatingSite.contact_email : vm.currentParticipatingSite.person.email;
            vm.currentParticipatingSite.extension = vm.currentParticipatingSite.extension ? vm.currentParticipatingSite.extension : vm.currentParticipatingSite.person.extension;
        }

        vm.validateParticipatingSite = function() {
            var isPrimaryContactMarkedForDeletion = false;

            _.each(vm.investigatorGrid, function(inv) {
                if (inv.set_as_contact && inv._destroy) {
                    isPrimaryContactMarkedForDeletion = true;
                }
            });

            if (isPrimaryContactMarkedForDeletion && !checkArrayForDeletion(vm.investigatorGrid)) {
                activateModal();

            } else {
                vm.saveParticipatingSite();
            }
        };

        vm.saveParticipatingSite = function(callBackString){
            var cbString = callBackString;
            var outerPS = {};

            /* Validation to pre-empt deletion if only one site recruitment status or investigator remains */
            vm.invDeleteException = checkArrayForDeletion(vm.investigatorGrid);
            vm.srStatusDeleteException = checkArrayForDeletion(vm.siteRecruitmentGrid);

            // So user cannot save with duplicate organization id for the same trial
            if (vm.duplicateParticipatingSite || vm.invDeleteException || vm.srStatusDeleteException) {
                return;
            }

            prepPsForSave();

            // An outer param wrapper is needed for nested attributes to work
            outerPS.new = vm.currentParticipatingSite.new;
            outerPS.id = vm.currentParticipatingSite.id;
            outerPS.participating_site = vm.currentParticipatingSite;
            vm.currentParticipatingSite.trial_id = trialDetailObj.id;

            TrialService.upsertParticipatingSite(outerPS).then(function(response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    var newParticipatingSite = false;
                    if(!vm.currentParticipatingSite.id){
                        // New Participating Site
                        newParticipatingSite = true;
                        vm.currentParticipatingSite.id = response.id;
                    }

                    /* Refresh from Cache */
                    if (vm.currentParticipatingSite.id) {
                        getParticipatingSite(cbString, newParticipatingSite);
                    }
                    vm.selectedAllSites = false;
                }
            }).catch(function(err) {
                console.log("error in updating trial " + JSON.stringify(err));
            }).finally(function() {
                vm.disableBtn = false;
            });
        };

        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };

        // Add Participating to a temp array
        function watchOrganization() {
            $scope.$watchCollection(function() {return vm.selOrganization.array;}, function(newVal, oldVal) {
                if (angular.isArray(newVal) && newVal.length > 0) {
                    vm.duplicateParticipatingSite = validateDuplicateOrg(newVal[0].id);
                    vm.currentParticipatingSite.name = newVal[0].name;
                    vm.currentParticipatingSite.organization = newVal[0];
                    vm.currentParticipatingSite.organization_id = newVal[0].id;
                    vm.city = newVal[0].city;
                    vm.state_province = newVal[0].state_province;
                    vm.country = newVal[0].country;
                    vm.postal_code = newVal[0].postal_code;
                    vm.selOrganization = {name: vm.currentParticipatingSite["po_name"], array: []};

                    $scope.ps_sites_form.$setDirty();
                }
            });
        }


        function prepPsForSave() {
            var invGrid = angular.copy(vm.investigatorGrid);

            updateSiteRecStatusWrapperArray();
            updateSiteInvestigatorAttrArray(invGrid);

            if (!vm.currentParticipatingSite.id) {
                vm.currentParticipatingSite.new = true;
            }
            if (vm.currentParticipatingSite.person){
                vm.currentParticipatingSite.person_id = vm.currentParticipatingSite.person.id;
            }

            vm.disableBtn = true;
        }

        /* Refreshes the PS after saving it */
        function getParticipatingSite(cbString, newPs) {
            TrialService.getParticipatingSiteById(vm.currentParticipatingSite.id).then(function (response) {
                var psStatus = response.server_response.status;

                if (psStatus >= 200 && psStatus <= 210) {
                    vm.currentParticipatingSite = response;
                    setPsCommonPersistedContactProps();
                    vm.persisted_organization = vm.currentParticipatingSite.organization;
                    vm.initSiteRecruitmentGrid();
                    vm.initInvestigatorGrid();

                    if (newPs){
                        vm.currentParticipatingSite.new = false;
                        vm.curTrial.participating_sites.push(vm.currentParticipatingSite);
                    } else {
                        updateParticipatingSite();
                    }

                    updateInvestigatorArray();

                    vm.current_site_recruitment = {};
                    PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                    $scope.$emit('updatedInChildScope', {});
                    toastr.clear();
                    toastr.success('Participating Site of  ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');

                    if (cbString && cbString === 'editInv') {
                        vm.editInvestigator(vm.investigatorGrid.length - 1);
                    }

                    // To make sure setPristine() is executed after all $watch functions are complete
                    resetDirtyForms();

                    vm.isSaved = true;
                }
            }).catch(function (err) {
                console.log("2server_response="+JSON.stringify(err));
            }).finally(function() {
                vm.disableBtn = false;
            });
        }


        /**
         *  Set Add Mode. This causes the first tab to appear for a new Participating Site
         **/
        function setAddMode(addEditModeValue) {
            //console.log("SETTING TO ADDMODE");
            if (!(typeof addEditModeValue === 'undefined' || addEditModeValue === null)) {
                vm.addEditMode = addEditModeValue;
                $location.hash('section_top');
                $anchorScroll();
            } else {
                vm.addEditMode = true;
                resetDirtyForms();
                vm.current_investigator.uiEdit = false;
            }

            vm.current_investigator.edit = false;
            vm.current_investigator.uiEdit = false;
            vm.showInvestigatorRoleError = false;
            vm.current_investigator.new = false;

            vm.currentParticipatingSite = {
                contact_type: 'General'
            };

            vm.current_site_recruitment = {};
            vm.city = null;
            vm.state_province =  null;
            vm.country = null;
            vm.postal_code = null;
            vm.po_name = null;
            vm.selOrganization = {name: '', array: []};
            vm.siteRecruitmentGrid = [];
            vm.investigatorGrid = [];

            vm.isSaved = false;
        }

        /**
         *  Set Edit Mode. This causes the first tab to appear for an existing Participating Site
         **/
        function setEditMode(idx) {
            vm.addEditMode = true;
            vm.currentParticipatingSite = angular.copy(vm.curTrial.participating_sites[idx]);

            if(vm.curTrial.participating_sites[idx].organization) {
                vm.city = vm.curTrial.participating_sites[idx].organization.city;
                vm.state_province = vm.curTrial.participating_sites[idx].organization.state_province;
                vm.country = vm.curTrial.participating_sites[idx].organization.country;
                vm.postal_code = vm.curTrial.participating_sites[idx].organization.postal_code;
                vm.po_name = vm.curTrial.participating_sites[idx].organization.po_name;
                vm.selOrganization = {name: vm.currentParticipatingSite["po_name"], array: []};
            }

            vm.persisted_contact = {};
            setPsCommonPersistedContactProps();
            vm.persisted_organization = vm.currentParticipatingSite.organization;
            vm.initSiteRecruitmentGrid();
            vm.initInvestigatorGrid();
            vm.Status();
            //vm.tabIndex = 0;

            if (!vm.currentParticipatingSite.contact_type) {
                vm.currentParticipatingSite.contact_type = 'General';
            }

            _.each(vm.investigatorGrid, function(inv) {
                if (inv.set_as_contact) {
                    var selectedInv = inv;
                    _.each(vm.investigatorArray, function(investigator) {
                        if (investigator.id === selectedInv.id) {
                            vm.selectedInvestigator = {id: investigator.id, name: investigator.name};
                        }
                    });
                }
            });

            resetDirtyForms();

            vm.isSaved = vm.persisted_organization.name && vm.currentParticipatingSite.site_rec_status_wrappers.length;
        }

        vm.initSiteRecruitmentGrid = function (){
            vm.siteRecruitmentGrid = [];
            for (var i = 0; i < vm.currentParticipatingSite.site_rec_status_wrappers.length; i++) {
                var siteObj = vm.currentParticipatingSite.site_rec_status_wrappers[i];
                siteObj._destroy = false;
                siteObj.edit = false;
                siteObj.uiEdit = false;
                siteObj.new = false;

                // For displaying status name in the table
                _.each(vm.siteRecruitmentStatusesArr, setStatusNameCode, siteObj);
                vm.siteRecruitmentGrid.push(siteObj);
            }

            vm.Status();
        };

        /**
         *  Initialize Investigator Grid
         */
        vm.initInvestigatorGrid = function (){
            vm.investigatorGrid = [];
            for (var i = 0; i < vm.currentParticipatingSite.participating_site_investigators.length; i++) {
                var invObj = vm.currentParticipatingSite.participating_site_investigators[i];
                invObj._destroy = false;
                invObj.edit = false;
                invObj.new = false;
                invObj.uiEdit = false;
                invObj._destroy = false;

                // refreshing the current participating site person
                if(vm.persisted_contact &&  vm.persisted_contact.persisted_person) {
                    vm.currentParticipatingSite.person = vm.persisted_contact.persisted_person;
                    vm.currentParticipatingSite.person_id = vm.persisted_contact.persisted_person.id;
                }
                if(vm.currentParticipatingSite.contact_type === 'PI'){
                    if (vm.currentParticipatingSite.person && vm.currentParticipatingSite.person.id === invObj.person.id) {
                        invObj.set_as_contact = true;
                    } else {
                        invObj.set_as_contact = false;
                    }
                } else {
                    invObj.set_as_contact = false;
                }

                vm.investigatorGrid.push(invObj);
            }

            vm.investigatorGridOrig = angular.copy(vm.investigatorGrid);
        };

        function openCalendar ($event, type) {
            $event.preventDefault();
            $event.stopPropagation();

            if (type === 'status_date') {
                vm.statusDateOpened = !vm.statusDateOpened;
            }
        } //openCalendar

        /**
         *  First Tab
         *  Add a new Site Recruitment Status Record to the Participating Site
         **/
        function addSiteRecruitment() {
            vm.current_site_recruitment.participating_site_id= vm.currentParticipatingSite.id;
            vm.current_site_recruitment.new = true;
            vm.current_site_recruitment._destroy = false;
            var newSiteRec = vm.current_site_recruitment;
            var siteObj = vm.current_site_recruitment;
            _.each(vm.siteRecruitmentStatusesArr, function (status) {
                if (status.name === siteObj.site_recruitment_status.name) {
                    siteObj.sr_status_name = status.name;
                    siteObj.sr_status_code = status.code;
                    siteObj.site_recruitment_status_id = status.id;
                }
            });
            vm.Status();
            vm.siteRecruitmentGrid.push(siteObj);
            vm.current_site_recruitment = {};
        }

        /**
         *  First Tab
         *  Edit an existing Site Recruitment Status Record in the Participating Site
         *  This function is used to show the values of the selected site recruitment record
         **/
        function editSiteRecruitment(index) {
            vm.current_site_recruitment = angular.copy(vm.siteRecruitmentGrid[index]);
            vm.current_site_recruitment.status_date = moment(vm.current_site_recruitment.status_date, 'DD-MMM-YYYY', true).isValid() ? moment(vm.current_site_recruitment.status_date, 'DD-MMM-YYYY').toDate() : moment(vm.current_site_recruitment.status_date).toDate();
            vm.current_site_recruitment.edit = true;
            vm.siteRecruitmentGrid[index].edit = true;
            vm.current_site_recruitment.uiEdit = true;
            vm.siteRecruitmentGrid[index].uiEdit = true;
            vm.current_site_recruitment._destroy = false;
            vm.current_site_recruitment.index = index;
        }

        /**
         *  First Tab
         *  Edit an existing Site Recruitment Status Record in the Participating Site
         *  This function is used to save the user entered values of the selected site recruitment record
        */
        function commitEditSiteRecruitment() {
            if (vm.current_site_recruitment.edit) {
                vm.current_site_recruitment.site_recruitment_status_id = vm.current_site_recruitment.site_recruitment_status.id;
                var siteObj = vm.current_site_recruitment;

                _.each(vm.siteRecruitmentStatusesArr, function (status) {
                    if (status.name === siteObj.site_recruitment_status.name) {
                        siteObj.sr_status_name = status.name;
                        siteObj.sr_status_code = status.code;
                        siteObj.site_recruitment_status = status;
                        siteObj.site_recruitment_status_id = status.id;
                    }
                });

                /* Put back current_site_recruitment object in the correct position in the siteRecruitmentGrid array */
                vm.siteRecruitmentGrid[vm.current_site_recruitment.index] = vm.current_site_recruitment;
                vm.siteRecruitmentGrid[vm.current_site_recruitment.index].uiEdit = false;

                vm.Status();

                /* ADDED BY ADIL IN ORDER TO RESET EDIT VIEW AND REMOVE IT FROM THE UI AS NEEDED */
                vm.current_site_recruitment = {};

            }
        } // commitEdit

        /**
         *  First Tab
         *  Delete an existing Site Recruitment Status Record in the Participating Site
         */
        function deleteSiteRecruitment(index) {
            vm.current_site_recruitment.edit = false;
            vm.siteRecruitmentGrid[index]._destroy = !vm.siteRecruitmentGrid[index]._destroy;
            vm.Status();
        }

        /**
         *  First Tab
         *  Cancel out of editing an existing Site Recruitment Status Record in the Participating Site
         */
        function cancelSiteRecruitmentEdit() {
            for (var i = 0; i < vm.siteRecruitmentGrid.length; i++) {
                var siteObj = vm.siteRecruitmentGrid[i];
                if(siteObj.id === vm.current_site_recruitment.id){
                    vm.siteRecruitmentGrid[i].uiEdit = false;
                }
            }
            vm.current_site_recruitment = {};
        }


        /**
         * Second Tab
         * Selecting a new Investigator
         */
        function watchPISelection() {
            $scope.$watchCollection(function() {return vm.principalInvestigator.array;}, function(newVal, oldVal) {
                if (angular.isArray(newVal) && newVal.length > 0) {
                    vm.principalInvestigator.name = PersonService.extractFullName(newVal[0]); // firstName + ' ' + middleName + ' ' + lastName;
                    vm.principalInvestigator.pi = vm.principalInvestigator.array[0];
                    vm.principalInvestigator.pi_id  = vm.principalInvestigator.array[0].id; // update PI on view
                    var participating_site_investigator = {};
                    participating_site_investigator.person_id = vm.principalInvestigator.array[0].id;
                    participating_site_investigator.new = true;
                    participating_site_investigator.person = vm.principalInvestigator.array[0];
                    // Check of Duplicate Entry
                    var exists = false;
                    for (var i = 0; i < vm.investigatorGrid.length; i++) {
                        if(vm.investigatorGrid[i].person.id === participating_site_investigator.person_id){
                            exists = true;
                        }
                    }
                    if(!exists){
                        // New Investigator
                        participating_site_investigator._destroy = false;
                        vm.current_investigator = participating_site_investigator;
                        vm.investigatorGrid.push(participating_site_investigator);

                        //vm.saveParticipatingSite('editInv');

                        vm.current_investigator.uiEdit = true;
                        vm.current_investigator.new = true;
                    }
                    vm.principalInvestigator = {name: '', array: []};

                    $scope.ps_inv_form.$setDirty();
                }
            });
        }

        function markInvestigatorForDeletion(index) {
            if (vm.currentParticipatingSite.hasOwnProperty('participating_site_investigators') && vm.currentParticipatingSite.participating_site_investigators[index]){
                vm.currentParticipatingSite.participating_site_investigators[index].edit = false;
                vm.current_investigator = angular.copy(vm.currentParticipatingSite.participating_site_investigators[index]);

                if( vm.current_investigator) {
                    vm.current_investigator._destroy = true;
                    vm.investigatorGrid[index]._destroy = !vm.investigatorGrid[index]._destroy;
                    vm.invContactIndex = vm.investigatorGrid[index]._destroy ? index : -1;
                } else{
                    vm.investigatorGrid[index].uiDestroy = !vm.investigatorGrid[index].uiDestroy;
                }
            } else {
                vm.investigatorGrid[index].uiDestroy = !vm.investigatorGrid[index].uiDestroy;
            }

            $scope.ps_inv_form.$setDirty();
        }

        /**
         *  Second Tab
         *  Delete an existing Investigator in the Participating Site
         */
        function deleteInvestigator() {
            /* currentParticipatingSite can be empty {} so check to see if it has participating_site_investigators [] as a property */
            if (vm.currentParticipatingSite.hasOwnProperty('participating_site_investigators') && vm.invContactIndex !== -1){
                vm.current_investigator = angular.copy(vm.currentParticipatingSite.participating_site_investigators[vm.invContactIndex]);
                if (vm.currentParticipatingSite.contact_type === "PI") {
                    // refreshing the current participating site person
                    if(vm.persisted_contact && vm.persisted_contact.persisted_person) {
                        vm.currentParticipatingSite.person = vm.persisted_contact.persisted_person;
                        vm.currentParticipatingSite.person_id = vm.persisted_contact.persisted_person.id;
                    }
                    if (vm.currentParticipatingSite.person && vm.current_investigator && vm.current_investigator.person && vm.currentParticipatingSite.person.id === vm.current_investigator.person.id) {
                        clearPsCommonContactProps();
                        vm.currentParticipatingSite.contact_type = 'General';
                        vm.persisted_contact.contact_name = null;
                        vm.persisted_contact.contact_phone = null;
                        vm.persisted_contact.contact_email = null;
                        vm.persisted_contact.contact_type = null;
                        vm.persisted_contact.persisted_person = null;
                        vm.persisted_contact.persisted_person_id = null;
                    }
                }
            }
        }

        /**
         * Editing an existing Investigator
         * @param index
         */
        function editInvestigator(index) {
            vm.current_investigator = angular.copy(vm.investigatorGrid[index]);
            vm.current_investigator.uiEdit = true;
            vm.investigatorGrid[index].uiEdit = true;

            if(vm.current_investigator.id) {
                vm.current_investigator.edit = true;
                vm.investigatorGrid[index].edit = true;

            } else {
                vm.current_investigator.new = true;
                vm.current_investigator.uiEdit = true;
            }
            // refreshing the current participating site person
            if(vm.persisted_contact &&  vm.persisted_contact.persisted_person) {
                vm.currentParticipatingSite.person = vm.persisted_contact.persisted_person;
                vm.currentParticipatingSite.person_id = vm.persisted_contact.persisted_person.id;
            }
            if(vm.currentParticipatingSite.contact_type === 'PI') {
                if (vm.currentParticipatingSite.person && vm.currentParticipatingSite.person.id === vm.current_investigator.person.id) {
                    vm.current_investigator.set_as_contact = true;
                } else {
                    vm.current_investigator.set_as_contact = false;
                }
            } else{
                vm.current_investigator.set_as_contact = false;
            }
        }

        /**
         *  Second Tab
         *  Edit an existing Site Recruitment Status Record in the Participating Site
         *  This function is used to save the user entered values of the selected site recruitment record
         */
        function commitEditInvestigator() {
            var primary_contact_set = false;

            if (!vm.current_investigator.investigator_type) {
                vm.showInvestigatorRoleError = true;
                return;
            } else {
                vm.showInvestigatorRoleError = false;
            }

            vm.current_investigator.uiEdit = false;
                for (var i = 0; i < vm.investigatorGrid.length; i++) {
                    if (vm.current_investigator.person.id === vm.investigatorGrid[i].person.id){
                        vm.investigatorGrid.splice(i,1);
                        vm.investigatorGrid.splice(i, 0, vm.current_investigator);
                    }
                }
                vm.current_investigator = {};
           // }
        } // commitEditInvestigator


        /**
         *  Second Tab
         *  Cancel out of editing an existing Site Recruitment Status Record in the Participating Site
         */
        function cancelInvestigatorEdit() {
            if (!vm.current_investigator.investigator_type) {
                vm.showInvestigatorRoleError = true;
                return;
            } else {
                vm.showInvestigatorRoleError = false;
            }

            for (var i = 0; i < vm.investigatorGrid.length; i++) {
                if (vm.current_investigator.id === vm.investigatorGrid[i].id) {
                    vm.investigatorGrid[i].uiEdit = false;
                }
            }
            vm.current_investigator = {};
        }


        /**
         * Third Tab
         */

        function watchContactType() {
            $scope.$watch(function() {return vm.currentParticipatingSite.contact_type;}, function(newVal, oldVal) {
                if(newVal === 'PI'){
                    vm.selectedContactTypePI = true;

                    updateInvestigatorArray();

                    if(vm.persisted_contact.contact_type === 'PI' && vm.currentParticipatingSite.id){
                        setPsCommonContactProps();
                        vm.currentParticipatingSite.person_id = vm.persisted_contact.person_id;
                        vm.currentParticipatingSite.person = vm.persisted_contact.person;
                    } else {
                        clearPsCommonContactProps();
                        vm.currentParticipatingSite.person_id = null;
                    }

                    /* Sets value of vm.selectedInvestigator to the investigator with set_as_contact ==== true */
                    _.each(vm.investigatorGrid, function(inv) {
                        if (inv.set_as_contact) {
                            var selectedInv = inv;
                            _.each(vm.investigatorArray, function(investigator) {
                                if (investigator.id === selectedInv.id) {
                                    vm.selectedInvestigator = {id: investigator.id, name: investigator.name};
                                }
                            });
                        }
                    });

                } else if (newVal === 'General'){
                    vm.selectedContactTypePI = false;

                    if(vm.persisted_contact.contact_type === 'General'){
                        setPsCommonContactProps();
                    } else {
                        clearPsCommonContactProps();
                    }

                    vm.currentParticipatingSite.person_id = null;
                    vm.selectedInvestigator = null;

                } else if (newVal === 'Person'){
                    vm.selectedContactTypePI = false;
                    if(vm.persisted_contact.contact_type === 'Person'){
                        setPsCommonContactProps();
                        vm.currentParticipatingSite.person_id = vm.persisted_contact.person_id;
                        vm.currentParticipatingSite.person = vm.persisted_contact.person;
                    } else {
                        clearPsCommonContactProps();
                        vm.currentParticipatingSite.person_id = null;
                        vm.currentParticipatingSite.person = null;
                    }

                    vm.selectedInvestigator = null;
                }
            });
        }


        function setPsCommonContactProps() {
            vm.currentParticipatingSite.contact_name = vm.persisted_contact.contact_name;
            vm.currentParticipatingSite.contact_phone = vm.persisted_contact.contact_phone;
            vm.currentParticipatingSite.extension = vm.persisted_contact.extension;
            vm.currentParticipatingSite.contact_email = vm.persisted_contact.contact_email;
        }

        function clearPsCommonContactProps() {
            vm.currentParticipatingSite.contact_name = null;
            vm.currentParticipatingSite.contact_phone = null;
            vm.currentParticipatingSite.extension = null;
            vm.currentParticipatingSite.contact_email = null;
        }

        function setPsCommonPersistedContactProps() {
            vm.persisted_contact.contact_name = vm.currentParticipatingSite.contact_name;
            vm.persisted_contact.contact_phone = vm.currentParticipatingSite.contact_phone;
            vm.persisted_contact.extension = vm.currentParticipatingSite.extension;
            vm.persisted_contact.contact_email = vm.currentParticipatingSite.contact_email;
            vm.persisted_contact.contact_type = vm.currentParticipatingSite.contact_type;
            vm.persisted_contact.persisted_person = vm.currentParticipatingSite.person;
        }

        /**
         * Third Tab
         * Selecting a new  Person
         */
        function watchPersonSelection() {
            $scope.$watchCollection(function() {return vm.selectedPerson.array;}, function(newVal, oldVal) {
                if (angular.isArray(newVal) && newVal.length > 0) {
                    vm.currentParticipatingSite.contact_name = PersonService.extractFullName(newVal[0]); // firstName + ' ' + middleName + ' ' + lastName;
                    var personAsContact = {};
                    var person = vm.selectedPerson.array[0];
                    personAsContact.person_id = person.id;
                    personAsContact.new = true;
                    vm.currentParticipatingSite.contact_type = "Person";
                    vm.currentParticipatingSite.contact_phone = person.phone;
                    vm.currentParticipatingSite.extension = person.extension;
                    vm.currentParticipatingSite.contact_email = person.email;
                    vm.currentParticipatingSite.person =  person;
                    vm.currentParticipatingSite.person_id =  person.id;

                    $scope.ps_contact_form.$setDirty();
                }
            });
        }

        /**
         * Third Tab
         */

        function watchInvestigatorSelection() {
            $scope.$watch(function() {return vm.selectedInvestigator;}, function(newVal, oldVal) {
                if (!newVal) {
                    clearPsCommonContactProps();
                    vm.currentParticipatingSite.person = null;
                    vm.currentParticipatingSite.person_id = null;
                }

                if (!oldVal) {
                    oldVal = {
                        id: newVal ? newVal.id : 0
                    };
                }
                if (vm.currentParticipatingSite.participating_site_investigators) {
                    for (var i = 0; i < vm.currentParticipatingSite.participating_site_investigators.length; i++) {
                        if(newVal && vm.currentParticipatingSite.participating_site_investigators[i].id === newVal.id){
                            var inv = vm.currentParticipatingSite.participating_site_investigators[i].person;
                            vm.currentParticipatingSite.contact_name = PersonService.extractFullName(inv);
                            vm.currentParticipatingSite.contact_phone = newVal.id === oldVal.id && vm.currentParticipatingSite.contact_phone ? vm.currentParticipatingSite.contact_phone : inv.phone;
                            vm.currentParticipatingSite.extension = newVal.id === oldVal.id && vm.currentParticipatingSite.extension? vm.currentParticipatingSite.extension : inv.extension;
                            vm.currentParticipatingSite.contact_email = newVal.id === oldVal.id && vm.currentParticipatingSite.contact_email ? vm.currentParticipatingSite.contact_email : inv.email;
                            vm.currentParticipatingSite.person = inv;
                            vm.currentParticipatingSite.person_id = inv.id;
                        }
                    }
                }
            });
        }

        /**
         * Get trial detail object from parent scope
         */
        function watchTrialDetailObj() {
            $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, function() {
                getTrialDetailCopy();
            });
        } //watchTrialDetailObj

        function getTrialDetailCopy() {
            $timeout(function() {
                vm.curTrial = PATrialService.getCurrentTrialFromCache();
            }, 1);
        } //getTrialDetailCopy

        function deleteListHandler(participatingSitesSelectedInCheckboxes){
            var deleteList = [];
            angular.forEach(participatingSitesSelectedInCheckboxes, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    deleteList.push(item);
                }
            });
            vm.selectedDeleteParticipatingSitesList = deleteList ;
        }

        function deleteSelected(){
            vm.curTrial.participating_sites_attributes=[];
            for (var i = 0; i < vm.selectedDeleteParticipatingSitesList.length; i++) {
                vm.deleteParticipatingSite( vm.selectedDeleteParticipatingSitesList[i].id);
            }
        }

        vm.deleteParticipatingSite = function(psId){
            vm.disableBtn = true;

            TrialService.deleteParticipatingSite(psId).then(function(response) {
                var status = response.status;

                if (status >= 200 && status <= 210) {
                    vm.curTrial.lock_version = response.lock_version || '';
                    $scope.$emit('updatedInChildScope', {});
                    for (var j = 0; j < vm.curTrial.participating_sites.length; j++) {
                        if (vm.curTrial.participating_sites[j].id == psId){
                            vm.curTrial.participating_sites.splice(j, 1);
                        }
                    }
                    PATrialService.setCurrentTrial(vm.curTrial); // update to cache
                    toastr.clear();
                    toastr.success('Record(s) deleted.', 'Operation Successful!');
                }
            }).catch(function(err) {
                console.log("error in deleting participating site=" + err + psId);
            }).finally(function() {
                vm.disableBtn = false;
            });

        }; //saveTrial

        // Validate Trials Statuses
        vm.Status = function() {
            // Remove statuses with _destroy is true
            var noDestroyStatusArr = [];
            for (var i = 0; i < vm.siteRecruitmentGrid.length; i++) {
                if (!vm.siteRecruitmentGrid[i]._destroy) {
                    noDestroyStatusArr.push(vm.siteRecruitmentGrid[i]);
                }
            }

            vm.disableBtn = true;

            TrialService.validateSrStatus({"statuses": noDestroyStatusArr}).then(function(response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.statusValidationMsgs = response.validation_msgs;

                    // Add empty object to positions where _destroy is true
                    for (var i = 0; i < vm.siteRecruitmentGrid.length; i++) {
                        if (vm.siteRecruitmentGrid[i]._destroy) {
                            vm.statusValidationMsgs.splice(i, 0, {});
                        }
                    }
                }
            }).catch(function(err) {
                console.log("Error in validating trial status: " + err);
            }).finally(function() {
                vm.disableBtn = false;
            });
        };


        function resetParticipatingSite(backToListView) {
            vm.selectedAllSites = false;
            vm.selectedDeleteParticipatingSitesList = [];
            vm.invContactIndex = -1;
            if(vm.currentParticipatingSite.id > 0){
                for (var i = 0; i < vm.curTrial.participating_sites.length; i++) {
                    if(vm.curTrial.participating_sites[i].id === vm.currentParticipatingSite.id){
                        vm.currentParticipatingSite = vm.curTrial.participating_sites[i];
                        vm.setEditMode(i);
                    }
                }
            } else {
                vm.setAddMode();
            }
            vm.selOrganization = {name: '', array: []};
            vm.currentParticipatingSite.site_rec_status_wrappers_attributes=[];
            vm.current_site_recruitment = {};
            vm.principalInvestigator = {name: '', array: []};
            vm.selectedPerson = {name: '', array: []};
            vm.watchContactType();
            vm.duplicateParticipatingSite = false;
            vm.current_investigator = {};

            if (backToListView) {
                vm.setAddMode(false);
            }
        }

        function validateDuplicateOrg(orgId) {
            var isDuplicate = false;
            _.each(vm.curTrial.participating_sites, function(ps) {
                if (orgId === ps.organization.id) {
                    isDuplicate = true;
                }
            });

            return isDuplicate;
        }

        /* Returns true if arr.length === markedItems.length (for deletion), which is not allowed */
        function checkArrayForDeletion(arr) {
            var markedItems = [];

            if (!arr.length) {
                return false;
            }

            for (var i=0; i < arr.length; i++) {
                if ((arr[i].hasOwnProperty('uiDestroy') && arr[i].uiDestroy) || arr[i]._destroy) {
                    markedItems.push(arr[i]);
                }
            }

            if (markedItems.length === arr.length) {
                return true;
            } else {
                return false;
            }
        }

        function activateModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pa/dashboard/abstraction/admin/trial_participating_sites_warning_modal.html',
                controller: 'trialPsWarningModalController as psWarning',
                size: 'md',
                windowClass: 'modal-center'
            });

            modalInstance.result.then(function(result) {
                if (result === 'Confirm') {
                    vm.deleteInvestigator();
                    vm.saveParticipatingSite();
                }
            });
        }


        function resetDirtyForms() {
            $timeout(function() {
                $scope.ps_sites_form.$setPristine();
                $scope.ps_inv_form.$setPristine();
                $scope.ps_contact_form.$setPristine();
            }, 1);
        }

        /* Used in init site recruitment grid */
        function setStatusNameCode(status) {
            if (status.id === this.site_recruitment_status.id) {
                this.sr_status_name = status.name;
                this.sr_status_code = status.code;
            }
        }

        /* Updates array after Save */
        function updateInvestigatorArray() {
            vm.investigatorArray = [];
            if (vm.currentParticipatingSite.hasOwnProperty('participating_site_investigators')) {
                for (var j = 0; j < vm.currentParticipatingSite.participating_site_investigators.length; j++) {
                    var id = vm.currentParticipatingSite.participating_site_investigators[j].id;
                    var name = PersonService.extractFullName(vm.currentParticipatingSite.participating_site_investigators[j].person);

                    vm.investigatorArray.push({"id": id, "name": name});
                }
            }
        }

        /* Updates array prior to Save */
        function updateSiteInvestigatorAttrArray(invGrid) {
            vm.currentParticipatingSite.participating_site_investigators_attributes = [];
            for (var k = 0; k < invGrid.length; k++) {
                var invObj = invGrid[k];
                if(vm.currentParticipatingSite.contact_type !== 'PI'){
                    invObj.set_as_contact = false;
                } else if(vm.currentParticipatingSite.person && (invObj.person.id === vm.currentParticipatingSite.person.id)){
                    vm.setParticipatingSiteContactInfo();
                    invObj.set_as_contact = true;
                    vm.currentParticipatingSite.contact_type = 'PI'; // should have been set before
                } else {
                    invObj.set_as_contact = false;
                }
                if (invObj.edit || invObj.new || (invObj.id && invObj._destroy)) {
                    if (invObj.hasOwnProperty('uiDestroy') && invObj.uiDestroy) {
                        vm.investigatorGrid.splice(k,1);
                    } else {
                        vm.currentParticipatingSite.participating_site_investigators_attributes.push(invObj);
                    }
                }
            }
        }

        /* Updates PS after Save */
        function updateParticipatingSite() {
            for (var i = 0; i < vm.curTrial.participating_sites.length; i++) {
                if (vm.curTrial.participating_sites[i].id === vm.currentParticipatingSite.id) {
                    vm.curTrial.participating_sites[i] = vm.currentParticipatingSite;
                }
            }
        }

        /* Updates array prior to Save */
        function updateSiteRecStatusWrapperArray() {
            vm.currentParticipatingSite.site_rec_status_wrappers_attributes = [];
            for (var i = 0; i < vm.siteRecruitmentGrid.length; i++) {
                var siteObj = vm.siteRecruitmentGrid[i];
                if (siteObj.edit || siteObj.new || (siteObj._destroy && siteObj.id)) {
                    vm.currentParticipatingSite.site_rec_status_wrappers_attributes.push(siteObj);
                }
            }
            vm.siteRecruitmentGrid = [];
        }

    } //trialParticipatingSitesCtrl


    function trialPsWarningModalController($scope, $uibModalInstance) {
        var vm = this;

        vm.message = '';

        vm.confirm = function() {
            $uibModalInstance.close('Confirm');
        };

        vm.cancel = function() {
            $uibModalInstance.dismiss('canceled');
        };
    }
}());
