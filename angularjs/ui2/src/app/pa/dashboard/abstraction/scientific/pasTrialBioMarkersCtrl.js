(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasBioMarkersCtrl', pasBioMarkersCtrl);

    pasBioMarkersCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', '$state', 'toastr',
        'MESSAGES', '_', '$timeout','uiGridConstants','trialDetailObj','assayTypes','evaluationTypes','specimenTypes','biomarkerUses','biomarkerPurposes','$location','$anchorScroll'];

    function pasBioMarkersCtrl($scope, TrialService, PATrialService, $state, toastr,
                                   MESSAGES, _, $timeout, uiGridConstants,trialDetailObj,assayTypes,evaluationTypes,specimenTypes,biomarkerUses,biomarkerPurposes, $location, $anchorScroll) {
        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.currentBioMarker= {};
        vm.setAddMode = setAddMode;
        vm.setEditMode = setEditMode;
        vm.deleteListHandler = deleteListHandler;
        vm.deleteSelected = deleteSelected;
        vm.saveAndRetainMarker = saveAndRetainMarker;
        vm.resetBioMarker = resetBioMarker;
        vm.reload = reload;
        vm.trialDetailObj = {};
        vm.selOrganization = {name: '', array: []};
        vm.showOrgFields = true;
        vm.disableBtn = false;
        vm.assayTypes=assayTypes;
        vm.checked_assay_types=[];

        vm.evalTypes=evaluationTypes;
        vm.checked_eval_types=[];


        vm.specTypes=specimenTypes;
        vm.checked_spec_types=[];

        vm.biomarkerPurposes=biomarkerPurposes;
        console.log(vm.biomarkerPurposes);
        vm.checked_biomarker_purposes=[];

        $scope.checked_eval_types=vm.checked_eval_types;
        $scope.checked_assay_types=vm.checked_assay_types;
        $scope.checked_spec_types=vm.checked_spec_types;
        $scope.checked_biomarker_purposes=vm.checked_biomarker_purposes;

        vm.biomarkerUses=biomarkerUses;

        $scope.toggle = function (item, list,type) {

            var idx = -1;
            for(var i = 0; i < list.length; i++){
                if(list[i].id == item.id) {
                    idx=i;
                    break;
                }
            };

            if (item.code == "Other" && idx > -1) {
                switch (type) {
                    case 'AT':
                        vm.isAssayTypeOtherChecked=false;
                        break;
                    case 'ET':
                        vm.isEvalTypeOtherChecked=false;
                        break;
                    case 'ST':
                        vm.isSpecTypeOtherChecked=false;
                        break;
                    default:

                }
            } else if (item.code == "Other") {
                switch (type) {
                    case 'AT':
                        vm.isAssayTypeOtherChecked=true;
                        break;
                    case 'ET':
                        vm.isEvalTypeOtherChecked=true;
                        break;
                    case 'ST':
                        vm.isSpecTypeOtherChecked=true;
                        break;
                    default:

                }
            }

            if (idx > -1)
                list.splice(idx, 1);
            else
                list.push(item);
        };

        $scope.exists = function (item, list) {

            for(var i = 0; i < list.length; i++){
                if(list[i].id == item.id) {
                    return true;
                }
            }
            return false;
        };

        activate();
        function activate() {
            //submit();
            getTrialDetailCopy();
            watchOrganization();
            _watchMarkerName();
            _watchCheckedEvalTypes();
            _watchCheckedAssayTypes();
            _watchCheckedSpecTypes();
            _watchCheckedBiomaarkerPurposes();

        }

        $scope.deleteRow = function(row) {
            OutcomeMeasureService.getGridOptions().data.splice(row.entity.id, 1);
        };

        function reload() {
            $state.go($state.$current, null, { reload: true });
        };

        function _watchCheckedEvalTypes() {
            $scope.$watchCollection('checked_eval_types', function (newNames, oldNames) {
                if (newNames && newNames.length == 0) {
                    vm.isEvalTypesChecked =null;
                    vm.show_eval_type_alert=true;
                } else {
                    vm.isEvalTypesChecked =1;
                    vm.show_eval_type_alert=false;
                }
            });
        }
        function _watchCheckedAssayTypes() {
            $scope.$watchCollection('checked_assay_types', function (newNames, oldNames) {
                if (newNames && newNames.length == 0) {
                    vm.isAssayTypesChecked =null;
                    vm.show_assay_type_alert=true;
                } else {
                    vm.isAssayTypesChecked =1;
                    vm.show_assay_type_alert=false;
                }
            });
        }
        function _watchCheckedSpecTypes() {
            $scope.$watchCollection('checked_spec_types', function (newNames, oldNames) {
                if (newNames && newNames.length == 0) {
                    vm.isSpecTypesChecked =null;
                    vm.show_spec_type_alert=true;
                } else {
                    vm.isSpecTypesChecked =1;
                    vm.show_spec_type_alert=false;
                }
            });
        }

        function _watchCheckedBiomaarkerPurposes() {
            $scope.$watchCollection('checked_biomarker_purposes', function (newNames, oldNames) {
                if (newNames && newNames.length == 0 ) {
                    vm.isBiomarkerPurposesChecked =null;
                    vm.show_biomarker_purpose_alert=true;
                } else {
                    vm.isBiomarkerPurposesChecked =1;
                    vm.show_biomarker_purpose_alert=false;
                }
            });
        }


        vm.checkAllBM = function () {
            if (vm.selectedAllBM) {
                vm.selectedAllBM = true;
            } else {
                vm.selectedAllBM = false;
            }

            angular.forEach(vm.curTrial.bio_markers, function (item) {
                item.selected = vm.selectedAllBM;
                vm.deleteListHandler(vm.curTrial.bio_markers);
            });

        };


        vm.saveBioMarker = function(){
            // Prevent multiple submissions
            vm.disableBtn = true;
            if (!vm.currentBioMarker.id) {
                vm.currentBioMarker.new = true;
            }

            if(vm.currentBioMarker.record_status=="Pending"){
                vm.currentBioMarker.cadsr_marker_id=null;
            }

            vm.currentBioMarker.marker_eval_type_associations_attributes=[];
            vm.currentBioMarker.marker_assay_type_associations_attributes=[];
            vm.currentBioMarker.marker_spec_type_associations_attributes=[];
            vm.currentBioMarker.marker_biomarker_purpose_associations_attributes=[];


            if (vm.currentBioMarker.id) {

                if (vm.currentBioMarker.eval_type_associations) {
                    for (var i = 0; i < vm.currentBioMarker.eval_type_associations.length; i++) {
                        var evalHash = {}
                        var marker_eval_types_association_id = vm.currentBioMarker.eval_type_associations[i].id;
                        var eval_type_id = vm.currentBioMarker.eval_type_associations[i].evaluation_type_id;
                        evalHash._destroy = true;
                        evalHash.id = marker_eval_types_association_id; //marker_eval_types_association_id

                        //if()
                        vm.currentBioMarker.marker_eval_type_associations_attributes.push(evalHash);
                    }
                }
                if (vm.currentBioMarker.assay_type_associations) {
                    for (var i = 0; i < vm.currentBioMarker.assay_type_associations.length; i++) {
                        var evalHash = {}
                        evalHash._destroy = true;
                        evalHash.id = vm.currentBioMarker.assay_type_associations[i].id;
                        vm.currentBioMarker.marker_assay_type_associations_attributes.push(evalHash);
                    }
                }
                if(vm.currentBioMarker.spec_type_associations) {
                    for (var i = 0; i < vm.currentBioMarker.spec_type_associations.length; i++) {
                        var evalHash = {}
                        evalHash._destroy = true;
                        evalHash.id = vm.currentBioMarker.spec_type_associations[i].id;
                        vm.currentBioMarker.marker_spec_type_associations_attributes.push(evalHash);
                    }
                }

                if(vm.currentBioMarker.biomarker_purpose_associations) {
                    for (var i = 0; i < vm.currentBioMarker.biomarker_purpose_associations.length; i++) {
                        var evalHash = {}
                        evalHash._destroy = true;
                        evalHash.id = vm.currentBioMarker.biomarker_purpose_associations[i].id;
                        vm.currentBioMarker.marker_biomarker_purpose_associations_attributes.push(evalHash);
                    }
                }

            }

            vm.isEvalTypeOtherChecked=false;
            vm.isAssayTypeOtherChecked=false;
            vm.isSpecTypeOtherChecked=false;

            for (var i = 0; i < vm.checked_eval_types.length; i++) {
               if(vm.checked_eval_types[i].code =="Other")
               {
                   vm.isEvalTypeOtherChecked=true;
               }
                var evalHash={}
                evalHash.evaluation_type_id=vm.checked_eval_types[i].id; //eval_type_id
                vm.currentBioMarker.marker_eval_type_associations_attributes.push(evalHash);
            }

            for (var i = 0; i < vm.checked_assay_types.length; i++) {
                if(vm.checked_assay_types[i].code =="Other")
                {
                    vm.isAssayTypeOtherChecked=true;
                }
                var evalHash={}
                evalHash.assay_type_id=vm.checked_assay_types[i].id;
                vm.currentBioMarker.marker_assay_type_associations_attributes.push(evalHash);
            }

            for (var i = 0; i < vm.checked_biomarker_purposes.length; i++) {
                var evalHash={}
                evalHash.biomarker_purpose_id=vm.checked_biomarker_purposes[i].id;
                vm.currentBioMarker.marker_biomarker_purpose_associations_attributes.push(evalHash);
            }



            for (var i = 0; i < vm.checked_spec_types.length; i++) {
                if(vm.checked_spec_types[i].code =="Other")
                {
                    vm.isSpecTypeOtherChecked=true;
                }

                var evalHash={}
                evalHash.specimen_type_id=vm.checked_spec_types[i].id;
                vm.currentBioMarker.marker_spec_type_associations_attributes.push(evalHash);
            }

            if(!vm.isEvalTypeOtherChecked)  { vm.currentBioMarker.evaluation_type_other  = ""; }
            if(!vm.isAssayTypeOtherChecked) { vm.currentBioMarker.assay_type_other = ""; }
            if(!vm.isSpecTypeOtherChecked)  { vm.currentBioMarker.specimen_type_other  = ""; }

            vm.currentBioMarker.trial_id = trialDetailObj.id;
            vm.curTrial.markers_attributes=[];
            vm.curTrial.markers_attributes.push(vm.currentBioMarker);
            console.log("current bio marker" + vm.currentBioMarker)

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;
            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.curTrial.lock_version = response.lock_version || '';
                    vm.curTrial.bio_markers = response["bio_markers"];
                    PATrialService.setCurrentTrial(vm.curTrial);
                    $scope.$emit('updatedInChildScope', {});

                    toastr.clear();
                    toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!')

                    // To make sure setPristine() is executed after all $watch functions are complete
                    $timeout(function() {
                       $scope.marker_form.$setPristine();
                   }, 1);

                    vm.addEditMode = false;
                    vm.selectedAllBM = false;
                }
            }).catch(function(err) {
                console.log("error in creating or updating bio marker " + JSON.stringify(outerTrial));
            }).finally(function() {
                vm.disableBtn = false;
            });
        };//saveBioMarker

        function deleteListHandler(BioMarkersSelectedInCheckboxes){
            var deleteList = [];
            angular.forEach(BioMarkersSelectedInCheckboxes, function(item) {
                if ( angular.isDefined(item.selected) && item.selected === true ) {
                    deleteList.push(item);
                }
            });
            vm.selectedDeleteBioMarkersList = deleteList ;

        };

        function deleteSelected(){
            vm.disableBtn = true;

            vm.curTrial.markers_attributes=[];

            for (var i = 0; i < vm.selectedDeleteBioMarkersList.length; i++) {
                var obj={};
                obj.id = vm.selectedDeleteBioMarkersList[i].id;
                obj._destroy=true;
                vm.curTrial.markers_attributes.push(obj);
            }

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;
            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                var status = response.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.curTrial.lock_version = response.lock_version || '';
                    vm.curTrial.bio_markers = response["bio_markers"];
                    PATrialService.setCurrentTrial(vm.curTrial);
                    $scope.$emit('updatedInChildScope', {});

                    toastr.clear();
                    toastr.success('Record(s) deleted.', 'Operation Successful!');
                }
            }).catch(function(err) {
                console.log("error in creating or updating Trial sub group " + JSON.stringify(outerTrial));
            }).finally(function() {
                vm.disableBtn = false;
            });
        };


        // Add Participating to a temp array
        function watchOrganization() {
            $scope.$watchCollection(function() {return vm.selOrganization.array;}, function(newVal, oldVal) {
                if (angular.isArray(newVal) && newVal.length > 0) {
                    vm.currentBioMarker.name = newVal[0].name;
                    vm.masterCopyOfMarkerNameFromCadsr=angular.copy(newVal[0].name);
                    vm.currentBioMarker.cadsr_marker_id = newVal[0].id;
                    vm.currentBioMarker.record_status="Active";
                    vm.currentBioMarker.status_alert=true;
                    vm.selOrganization = {name: vm.currentBioMarker["po_name"], array: []};
                }
            });
        }

        function _watchMarkerName() {
            $scope.$watch(function() {return vm.currentBioMarker.name;}, function(newVal) {
                if (vm.currentBioMarker.cadsr_marker_id > 0 && !vm.currentBioMarker.id) {
                    if (newVal !=vm.masterCopyOfMarkerNameFromCadsr){
                        vm.currentBioMarker.status_alert=false;
                        vm.currentBioMarker.record_status="Pending";
                    }else if(newVal ==vm.masterCopyOfMarkerNameFromCadsr){
                        vm.currentBioMarker.record_status="Active";
                        vm.currentBioMarker.status_alert=true;
                    }

                    $scope.marker_form.$setDirty();
                }
                console.log(newVal);
                console.log(vm.currentBioMarker.cadsr_marker_id);

                if (vm.currentBioMarker.cadsr_marker_id > 0 && vm.currentBioMarker.id) {
                    console.log(vm.currentBioMarker.cadsr_marker_id);
                    console.log(vm.currentBioMarker.id);
                    if (newVal !=vm.masterCopyOfMarkerNameFromCadsr){
                        vm.currentBioMarker.status_alert=false;
                        vm.currentBioMarker.record_status="Pending";
                    }else if(newVal ==vm.masterCopyOfMarkerNameFromCadsr){
                        vm.currentBioMarker.record_status="Active";
                        vm.currentBioMarker.status_alert=true;
                    }
                }

            });
        }


        /**
         *  Set Add Mode.
         **/
        function setAddMode(addEditModeValue) {
            if (!(typeof addEditModeValue === 'undefined' || addEditModeValue === null)) {
                vm.addEditMode = addEditModeValue;
                $location.hash('section_top');
                $anchorScroll();
            } else {
                vm.addEditMode = true;
                vm.currentBioMarker= {};
                vm.currentBioMarker.record_status="Pending";
                vm.currentBioMarker.status_alert=true;
                vm.currentBioMarker.cadsr_marker_id=0;
                vm.checked_assay_types=[];
                vm.checked_eval_types=[];
                vm.checked_spec_types=[];
                vm.checked_biomarker_purposes=[];
                vm.selOrganization = {name: '', array: []};

                $scope.checked_eval_types=vm.checked_eval_types;
                $scope.checked_assay_types=vm.checked_assay_types;
                $scope.checked_spec_types=vm.checked_spec_types;
                $scope.checked_biomarker_purposes=vm.checked_biomarker_purposes;

                vm.isSpecTypeOtherChecked = false;
                vm.isAssayTypeOtherChecked = false
                vm.isEvalTypeOtherChecked = false;
                vm.disableBtn = false;
            }

            $scope.marker_form.$setPristine();
        }

        /**
         *  Set Edit Mode.
         **/
        function setEditMode(idx) {
            vm.addEditMode = true;
            vm.currentBioMarker = angular.copy(vm.curTrial.bio_markers[idx]);
            vm.currentBioMarker.status_alert=true;
            vm.currentBioMarker.index = idx;
            vm.currentBioMarkerIndex = idx;

            //vm.currentBioMarker.cadsr_marker_id=0;
            vm.masterCopyOfMarkerNameFromCadsr=angular.copy(vm.currentBioMarker.name);

            if (vm.currentBioMarker.assay_type_other && vm.currentBioMarker.assay_type_other.length > 0) {
                vm.isAssayTypeOtherChecked=true;
            } else {
                vm.isAssayTypeOtherChecked=false;
            }
            if (vm.currentBioMarker.evaluation_type_other && vm.currentBioMarker.evaluation_type_other.length > 0) {
                vm.isEvalTypeOtherChecked=true;
            } else {
                vm.isEvalTypeOtherChecked=false;
            }

            if (vm.currentBioMarker.specimen_type_other && vm.currentBioMarker.specimen_type_other.length > 0) {
                vm.isSpecTypeOtherChecked=true;
            } else {
                vm.isSpecTypeOtherChecked=false;
            }

            vm.checked_assay_types=[];
            vm.checked_assay_types = vm.currentBioMarker.assay_types;

            vm.checked_eval_types=[];
            vm.checked_eval_types = vm.currentBioMarker.eval_types;

            vm.checked_spec_types=[];
            vm.checked_spec_types = vm.currentBioMarker.spec_types;

            vm.checked_biomarker_purposes=[];
            vm.checked_biomarker_purposes=vm.currentBioMarker.biomarker_purposes;

            $scope.checked_eval_types=vm.checked_eval_types;
            $scope.checked_assay_types=vm.checked_assay_types;
            $scope.checked_spec_types=vm.checked_spec_types;
            $scope.checked_biomarker_purposes=vm.checked_biomarker_purposes;

        }

        function saveAndRetainMarker() {

            vm.currentBioMarker.id = null;
            vm.currentBioMarker.name =null;

        }

        function resetBioMarker() {
            var curIndex = vm.currentBioMarker.index;
            if (curIndex !== undefined) {
                setEditMode(curIndex);
                return;
            }
            vm.setAddMode();
            $scope.marker_form.$setPristine();
        }

        function getTrialDetailCopy() {
            $timeout(function() {
                vm.curTrial = PATrialService.getCurrentTrialFromCache();
                //console.log("vm.curTrial =" + JSON.stringify(vm.curTrial ));
            }, 1);
        } //getTrialDetailCopy

    }
})();
