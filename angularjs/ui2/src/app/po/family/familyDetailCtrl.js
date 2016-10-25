/**
 * Created by dullam on 7/20/2015.
 */

(function () {
    'use strict';
    angular.module('ctrp.app.po')
        .controller('familyDetailCtrl', familyDetailCtrl);
    familyDetailCtrl.$inject = ['familyDetailObj', 'FamilyService', 'familyStatusObj','familyTypeObj','familyRelationshipObj','OrgService','DateService','toastr',
        '$scope', '$state', 'Common', '$uibModal', '$timeout'];
    function familyDetailCtrl(familyDetailObj, FamilyService, familyStatusObj,familyTypeObj,familyRelationshipObj,
                              OrgService, DateService, toastr, $scope, $state, Common, $uibModal, $timeout) {
        var vm = this;
        vm.curFamily = familyDetailObj || {name: ""}; //familyDetailObj.data;
        console.log('familyDetailObj: ' + JSON.stringify(familyDetailObj));
        vm.curFamily = vm.curFamily.data || vm.curFamily;
        vm.masterCopy= angular.copy(vm.curFamily);
        vm.familyStatusArr = familyStatusObj.data;
        vm.familyTypeArr = familyTypeObj.data;
        vm.familyRelationshipArr = familyRelationshipObj == null ? '' : familyRelationshipObj.data;
        vm.orgsArrayReceiver = []; //receive selected organizations from the modal
        vm.savedSelection = []; //save selected organizations
        vm.selectedOrgFilter = "";
        vm.disableBtn = false;

        vm.updateFamily = function() {
            vm.curFamily.family_memberships_attributes = prepareFamilyMembershipsArr(vm.savedSelection); //append an array of affiliated organizations
            _.each(vm.curFamily.family_memberships_attributes, function (aff, idx) {
                //convert the ISO date to Locale Date String
                aff['effective_date'] = aff.effective_date ? moment(aff['effective_date']).format('DD-MMM-YYYY') : ''; // DateService.convertISODateToLocaleDateStr(aff['effective_date']) : '';
                aff['expiration_date'] = aff.expiration_date ? moment(aff['expiration_date']).format('DD-MMM-YYYY') : ''; // DateService.convertISODateToLocaleDateStr(aff['expiration_date']) : '';
                vm.curFamily.family_memberships_attributes[idx] = aff; //update the family memberships with the correct data format
            });

            //create a nested Family object
            var newFamily = {};
            newFamily.new = vm.curFamily.new || '';
            newFamily.id = vm.curFamily.id || '';
            newFamily.family = vm.curFamily;
            vm.disableBtn = true;

            // console.log("newFamily is: " + JSON.stringify(newFamily));
            FamilyService.upsertFamily(newFamily).then(function(response) {
                var status = response.status;

                if (status >= 200 && status <= 210) {
                    vm.curFamily.new = false;
                    vm.curFamily.family_memberships = response.data.family_memberships_attributes || [];
                    $state.go('main.familyDetail', {familyId: response.data.id});
                    toastr.success('Family ' + vm.curFamily.name + ' has been recorded', 'Operation Successful!');
                }

                // To make sure setPristine() is executed after all $watch functions are complete
                $timeout(function() {
                   $scope.family_form.$setPristine();
               }, 1);
            }).catch(function(err) {
                console.log("error in updating family " + JSON.stringify(vm.curFamily));
            }).finally(function() {
                vm.disableBtn = false;
            });
        }; // updateFamily


        //delete the affiliated organization from table view
        vm.toggleSelection = function (index) {
            if (index < vm.savedSelection.length) {
                vm.savedSelection[index]._destroy = !vm.savedSelection[index]._destroy;
                // vm.savedSelection.splice(index, 1);
            }
        };// toggleSelection


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
            console.log("vm.savedSelection.length = " + vm.savedSelection.length);
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

        vm.msg = "Hello from a controller method.";
        vm.returnHello = function() {
            return $scope.msg ;
        };

        vm.clear = function() {
            vm.batchSelect('removeAll');
            vm.curFamily.family_status_id = '';
            vm.curFamily.family_type_id = '';
            vm.savedSelection.length = 0;
        };
        vm.clearForm = function() {
            $scope.family_form.$setPristine();
            var excludedKeys = ['new'];
            Object.keys(vm.curFamily).forEach(function (key) {
                if (excludedKeys.indexOf(key) == -1) {
                    vm.curFamily[key] = angular.isArray(vm.curFamily[key]) ? [] : '';
                }
            });
            vm.savedSelection = [];
            if (vm.curFamily.family_memberships && vm.curFamily.family_memberships.length > 0) {
                populateFamilyMemberships();
            }
        };
        vm.resetForm = function() {
            angular.copy(vm.masterCopy,vm.curFamily);
            vm.savedSelection = [];
            if (vm.curFamily.family_memberships && vm.curFamily.family_memberships.length > 0) {
                populateFamilyMemberships();
            }
            $scope.family_form.$setPristine();
        };

        activate();
        /****************** implementations below ***************/
        function activate() {
            appendNewFamilyFlag();
            if (!vm.curFamily.new) {
                prepareModal();
            }

            watchOrgReceiver();

            if (vm.curFamily.family_memberships && vm.curFamily.family_memberships.length > 0) {
                populateFamilyMemberships();
            }
        }


        /**
         * Append a 'new' key to the vm.curFamily to
         * indicate this is a new family, not an family
         * for editing/curating
         *
         */
        function appendNewFamilyFlag() {
            if ($state.$current.name.indexOf('add') > -1) {
                vm.curFamily.new = true;  //
            }
        }

        function prepareModal() {

            if (!vm.curFamily.new) {
                vm.confirmDelete = function (size) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'delete_confirm_template.html',
                        controller: 'ModalInstanceFamilyCtrl as vm',
                        size: size,
                        resolve: {
                            familyId: function () {
                                return vm.curFamily.id;
                            }
                        }
                    });

                    modalInstance.result.then(function (selectedItem) {
                        $scope.family_form.$submitted = true;
                        $state.go('main.families');
                    }, function () {
                        console.log("operation canceled")
                    });
                }; //confirmDelete
            }
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
                        $scope.family_form.$setDirty();
                    }
                });

            }, true);
        } //watchOrgReceiver



        /**
         * Clean up the organization by keeping the essential fields
         * (org_id, affiliate_status, effective_date, expiration_date)
         *
         *
         * @param savedSelectionArr
         * @returns {Array}
         */
        function prepareFamilyMembershipsArr(savedSelectionArr) {
            var results = [];
            _.each(savedSelectionArr, function (org) {
                var cleanedOrg = {
                    "organization_id": org.id,
                    "family_relationship_id": org.family_relationship_id,
                    "effective_date": org.effective_date,
                    "expiration_date": org.expiration_date,
                    "id" : org.family_membership_id || '',
                    "lock_version": org.lock_version,
                    "_destroy" : org._destroy
                };
                results.push(cleanedOrg);
            });
            console.log("log is "+JSON.stringify(results));

            return results;
        } //prepareFamilyMembershipsArr


        /**
         * Initialize the selected organization for its affiliation status, family_membership_effective_date
         * family_memebership_expiration_date, etc
         *
         * @param org
         * @returns org
         */
        function initSelectedOrg(org) {
            org.effective_date = new Date(); //today as the effective date
            org.expiration_date = "";
            org.opened_effective = false;
            org.opened_expiration = false;
            org._destroy = false;

            return org;
        } //initSelectedOrg


        /**
         * Asynchronously populate the vm.savedSelection array for presenting
         * the existing po_affiliation with the person being presented
         *
         */
        function populateFamilyMemberships() {
            //find the organization name with the given id
            var findOrgName = function(familyAff, cb) {
                OrgService.getOrgById(familyAff.organization_id).then(function(organization) {
                    var status = organization.server_response.status;

                    if (status >= 200 && status <= 210) {
                        var curOrg = {"id" : familyAff.organization_id, "name": organization.name, "ctep_id": organization.ctep_id};
                        curOrg.effective_date = moment(familyAff.effective_date).toDate(); //DateService.convertISODateToLocaleDateStr(familyAff.effective_date);
                        curOrg.expiration_date = moment(familyAff.expiration_date).toDate(); //DateService.convertISODateToLocaleDateStr(familyAff.expiration_date);
                        curOrg.family_membership_id = familyAff.id; //family affiliation id
                        curOrg.family_relationship_id=familyAff.family_relationship_id;
                        curOrg.lock_version = familyAff.lock_version;
                        curOrg._destroy = familyAff._destroy || false;
                        vm.savedSelection.push(curOrg);
                    }
                }).catch(function(err) {
                    console.log("error in retrieving organization name with id: " + familyAff.organization_id);
                });
                cb();
            };

            //return the organizations
            var retOrgs = function() {
                return vm.savedSelection;
            };

            async.eachSeries(vm.curFamily.family_memberships, findOrgName, retOrgs);
        } //populateFamilyMemberships


        //Function that checks if a Family name is unique. If not, presents a warning to the user prior. Invokes an AJAX call to the families/unique Rails end point.
        $scope.checkForNameUniqueness = function(){

            var ID = 0;
            if(angular.isObject(familyDetailObj))
                ID = vm.curFamily.id;

            var searchParams = {"family_name": vm.curFamily.name,"family_exists": angular.isObject(familyDetailObj), "family_id": ID};
            console.log('Family name is ' + vm.curFamily.name);
            console.log('Family exists? ' + angular.isObject(familyDetailObj));
            console.log('Family ID ' + ID);

            vm.showUniqueWarning = false

            var result = FamilyService.checkUniqueFamily(searchParams).then(function (response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.name_unqiue = response.name_unique;

                    if(!response.name_unique && vm.curFamily.name.length > 0)
                        vm.showUniqueWarning = true
                }
            }).catch(function (err) {
                console.log("error in checking for duplicate family name " + JSON.stringify(err));
            });
        };



    }

})();
