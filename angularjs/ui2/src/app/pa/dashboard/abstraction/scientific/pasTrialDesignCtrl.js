(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasTrialDesignCtrl', pasTrialDesignCtrl);

    pasTrialDesignCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
        'MESSAGES', '_', '$timeout', 'groupedTrialDesignData'];

    function pasTrialDesignCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, _, $timeout, groupedTrialDesignData) {
        var vm = this;
        console.info('groupedTrialDesignData: ', groupedTrialDesignData);
        vm.trialDetailObj = {};
        vm.trialPhases = [];
        vm.researchCategories = [];
        vm.primaryPurposes = [];
        vm.secondaryPurposes = [];
        vm.interventionModels = [];
        vm.maskings = [];
        vm.isOtherPrimaryPurpose = false;

        activate();
        function activate() {
            _unpackPromisedData();
            _getTrialDetailCopy();
            _watchPrimaryPurpose();
            _watchResearchCategory();
        }

        // break down the grouped promised data as arrays
        function _unpackPromisedData() {
            if (groupedTrialDesignData.length === 4) {
                vm.trialPhases = groupedTrialDesignData[0];
                vm.researchCategories = groupedTrialDesignData[1];
                vm.primaryPurposes = groupedTrialDesignData[2];
                vm.secondaryPurposes = groupedTrialDesignData[3];
            }
        }

        function _getTrialDetailCopy() {
            $timeout(function() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
            }, 0);
        } // _getTrialDetailCopy

        function _watchResearchCategory() {
            $scope.$watch(function() {return vm.trialDetailObj.research_category_id;},
                function(newVal, oldVal) {
                    var curResearchCategoryObj = _.findWhere(vm.researchCategories, {id: newVal});
                    vm.researchCategoryTitle = !!curResearchCategoryObj ? ' - ' + curResearchCategoryObj.name : '';
                    vm.isExpandedAccess = vm.researchCategoryTitle.toLowerCase().indexOf('expand') > -1;
                    vm.isInterventional = vm.researchCategoryTitle.toLowerCase().indexOf('intervention') > -1;
                    vm.isObservational = vm.researchCategoryTitle.toLowerCase().indexOf('observation') > -1;
                    vm.isAncillary = vm.researchCategoryTitle.toLowerCase().indexOf('ancillary') > -1;

                    // fetch intervention models
                    if (vm.isInterventional && vm.interventionModels.length === 0) {
                        _fetchInterventionModels();
                    }

                    // fetch maskings
                    if (vm.isInterventional && vm.maskings.length === 0) {
                        _fetchMaskings();
                    }
                });
        } // _watchResearchCategory

        function _watchPrimaryPurpose() {
            $scope.$watch(function() {return vm.trialDetailObj.primary_purpose_id;},
                function(newVal, oldVal) {
                if (newVal !== undefined && newVal !== null) {
                    var curPrimaryPurposeObj = _.findWhere(vm.primaryPurposes, {id: newVal});
                    vm.isOtherPrimaryPurpose = curPrimaryPurposeObj.name.toLowerCase().indexOf('other') > -1;
                    // console.info('isOtherPrimaryPurpose: ', vm.isOtherPrimaryPurpose);
                }
            });
        } // _watchPrimaryPurpose

        /**
         * Fetch intervention models
         * @return {[type]} [description]
         */
        function _fetchInterventionModels() {
            PATrialService.getInterventionModels().then(function(res) {
                if (res.server_response.status === 200) {
                    vm.interventionModels = res.models || [];
                    console.info('models: ', vm.interventionModels);
                }
            });
        }

        function _fetchMaskings() {
            PATrialService.getMaskings().then(function(res) {
                if (res.server_response.status === 200) {
                    vm.maskings = res.maskings || [];
                    console.info(vm.maskings);
                }
            });
        } // _fetchMaskings

    } //pasTrialDesignCtrl

})();
