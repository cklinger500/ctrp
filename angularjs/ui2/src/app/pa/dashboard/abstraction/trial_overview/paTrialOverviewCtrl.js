/**
 * Created by wangg5, Deember 2nd, 2015
 */

(function() {
    'use strict';

    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialOverviewCtrl', paTrialOverviewCtrl)
    .controller('checkinModalCtrl', checkinModalCtrl); // checkin modal controller

    paTrialOverviewCtrl.$inject = ['$state', '$stateParams', 'PATrialService',
        '$mdToast', '$document', '$timeout', 'Common', 'MESSAGES', 'researchCategories',
        '$scope', 'TrialService', 'UserService', 'curTrial', '_', 'PersonService', '$uibModal'];

    checkinModalCtrl.$inject = ['$scope', '$uibModalInstance', 'curTrialObj', 'trialStatusDict',
        'PATrialService', 'TrialService', 'validationResults', '_', '$state']; // checkin modal controller
    function paTrialOverviewCtrl($state, $stateParams, PATrialService,
            $mdToast, $document, $timeout, Common, MESSAGES, researchCategories,
            $scope, TrialService, UserService, curTrial, _, PersonService, $uibModal) {

        var vm = this;
        var curUserRole = UserService.getUserRole() || '';
        var researchCats = researchCategories;
        vm.accordionOpen = true; //default open accordion
        vm.loadingTrialDetail = true;
        vm.trialDetailObj = curTrial;
        console.info('curTrial: ', curTrial);
        vm.adminCheckoutObj = Common.jsonStrToObject(vm.trialDetailObj.admin_checkout);
        vm.scientificCheckoutObj = Common.jsonStrToObject(vm.trialDetailObj.scientific_checkout);

        vm.isPanelOpen = true;
        vm.togglePanelOpen = togglePanelOpen;
        vm.backToPATrialSearch = backToPATrialSearch;
        vm.trialId = $stateParams.trialId;
        vm.checkoutTrial = checkoutTrial;
        vm.checkinTrial = checkinTrial;
        vm.adminCheckoutAllowed = false;
        vm.adminCheckinAllowed = true;

        vm.adminCheckoutBtnDisabled = false;
        vm.scientificCheckoutAllowed = false;
        vm.scientificCheckinAllowed = true;
        vm.scientificCheckoutBtnDisabled = false;
        vm.curUser = UserService.currentUser();
        vm.submitter = {}; // container for the last submitter information
        vm.submitterPopOver = {
            submitter: vm.submitter,
            templateUrl: 'submitterPopOverTemplate.html',
            title: 'Last Trial Submitter'
        };
        var paMenuTypes = {
            'abstraction': false,
            'trialValidProtocol': false,
            'trialValidImport': false,
            'rejection': false,
            'hideFlagForRejection': false
        };
        // milestone codes that trigger validation menus
        var MILESTONE_CODES_FOR_VALIDATION = ['SRD', 'VPS', 'VPC']; // "Submission Received Date" , "Validation Processing Start Date" or "Validation Processing Completed Date"
        // milestone code that triggers rejection menus
        var MILESTONE_CODES_FOR_REJECTION = ['LRD', 'STR'];
        // mile stone codes that DO not trigger abstraction menus
        var MILESTONE_CODES_FOR_ABSTRACTION_EXCEPT = MILESTONE_CODES_FOR_REJECTION.concat(MILESTONE_CODES_FOR_VALIDATION); // Late Rejection Date and VALIDATION codes

        var ROLE_LIST_TO_HIDE_FROM = ['ROLE_ABSTRACTOR', 'ROLE_SUPER', 'ROLE_ADMIN'];

        vm.disableBtn = false;

        activate();

        function activate() {
            updateTrialDetailObj(vm.trialDetailObj);
            watchCheckoutButtons();
            watchUpdatesInChildrenScope();
        } //activate

        function togglePanelOpen() {
            vm.isPanelOpen = !vm.isPanelOpen;
        } //togglePanelOpen

        function backToPATrialSearch() {
            $state.go('main.paTrialSearch');
        } //backToPATrialSearch

        function _parseCheckoutinObjects(serverResponse, type) {
            vm.adminCheckoutObj = Common.jsonStrToObject(serverResponse.result.admin_checkout);
            vm.scientificCheckoutObj = Common.jsonStrToObject(serverResponse.result.scientific_checkout);
            Common.broadcastMsg(MESSAGES.TRIALS_CHECKOUT_IN_SIGNAL);
        }

        function checkoutTrial(checkoutType) {
            // To prevent multiple submissions before Ajax call is completed
            vm.disableBtn = true;
            PATrialService.checkoutTrial(vm.trialId, checkoutType).then(function(res) {
                var status = res.server_response.status;
                if (status >= 200 && status <= 210) {
                    var checkout_message = res.checkout_message || 'Checkout was not successful, other user may have checked it out ';
                    if (res.checkout_message !== null) {
                        updateTrialDetailObj(res.result);
                        _parseCheckoutinObjects(res, checkoutType);
                        showToastr(checkout_message, 'top right');
                    }
                }
            }).finally(function() {
                vm.disableBtn = false;
            });
        }

        function checkinTrial(checkinType) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pa/dashboard/abstraction/trial_overview/_trial_checkin_modal.html',
                bindToController: true,
                backdrop: 'static', // do not close modal for click outside modal
                controller: 'checkinModalCtrl',
                controllerAs: 'checkinModalView',
                size: 'md',
                resolve: {
                    curTrialObj: vm.trialDetailObj,
                    trialStatusDict: TrialService.getTrialStatuses(),
                    validationResults: PATrialService.validateAbstractionOnTrial(vm.trialDetailObj.id),
                }
            });
            var modalOpened = true;
            vm.disableBtn = true;
            modalInstance.result.then(function(checkinComment) {
                if (angular.isDefined(checkinComment) && checkinComment.length > 0) {
                    _performTrialCheckin(checkinType, vm.trialDetailObj.id, checkinComment);
                }
            }, function() {
                vm.disableBtn = false;
            });
            modalOpened = false;
        }

        function _performTrialCheckin(checkinType, trialId, checkinComment) {
            vm.disableBtn = true;
            var commentText = 'experimental comment';
            PATrialService.checkinTrial(trialId, checkinType, checkinComment).then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    var checkin_message = res.checkin_message || 'Checkin was not successful, other user may have checked it in already ';
                    var status = res.server_response.status;
                    if (status >= 200 && status <= 210) {
                        // console.log('checkin result: ', res.result);
                        updateTrialDetailObj(res.result);
                        _parseCheckoutinObjects(res, checkinType);
                        showToastr(checkin_message, 'top right');
                    }
                }
            }).finally(function() {
                vm.disableBtn = false;
            });
        }

        /**
         * Update the trial detail object for the checkout/in results
         * @param  {JSON} data [updated trial detail object with the checkout/in records]
         */
        function updateTrialDetailObj(data) {

            if (vm.trialDetailObj.pi && !vm.trialDetailObj.pi.fullName) {
                vm.trialDetailObj.pi.fullName = PersonService.extractFullName(vm.trialDetailObj.pi);
            }
            // sort the submissions by DESC submission_num
            vm.trialDetailObj.submissions = _.sortBy(vm.trialDetailObj.submissions, function(s) {
                return -s.submission_num; // DESC order
            });

            if (!vm.trialDetailObj.central_contacts) {
                vm.trialDetailObj.central_contacts = [].concat({});
            }

            // fill submitter's info:
            vm.submitterPopOver.submitter = vm.trialDetailObj.submitter || {};
            vm.submitterPopOver.submitter.organization = vm.trialDetailObj.submitters_organization || '';

            // check if the trial is registered or not (registered/reported or imported)
            var internalSourceObj = vm.trialDetailObj.internal_source; // if null, then it is imported
            vm.trialDetailObj.isImported = !!internalSourceObj ? (internalSourceObj.code !== 'REG') : true;

            // get research category name and determine its research category
            vm.trialDetailObj.researchCategoryName = _getResearchCategory(researchCats, vm.trialDetailObj.research_category_id);
            vm.trialDetailObj.isExpandedAccess = vm.trialDetailObj.researchCategoryName.indexOf('expand') > -1;
            vm.trialDetailObj.isInterventional = vm.trialDetailObj.researchCategoryName.indexOf('intervention') > -1;
            vm.trialDetailObj.isObservational = vm.trialDetailObj.researchCategoryName.indexOf('observation') > -1;
            vm.trialDetailObj.isAncillary = vm.trialDetailObj.researchCategoryName.indexOf('ancillary') > -1;
            var infoSourceName = !!internalSourceObj ? internalSourceObj.name.toLowerCase() : '';
            vm.trialDetailObj.isInfoSourceProtocol = infoSourceName.indexOf('proto') > -1;
            vm.trialDetailObj.isInfoSourceImport = !vm.isInfoSourceProtocol && infoSourceName.indexOf('reg') === -1; // not from registry AND not protocol

            vm.curPAMenuTypes = _checkMilestoneCode(vm.trialDetailObj); // TODO: use this in subscreen to control their visbility
            vm.curPAMenuTypes.hideFlagForRejection = _checkRejectionAndRole(vm.trialDetailObj);
            vm.trialDetailObj.menuTypes = vm.curPAMenuTypes; // update the menuTypes so that PAMenu controller can use it
            // console.log('vm.submitterPopOver: ', vm.submitterPopOver);
            vm.trialDetailObj.lock_version = data.lock_version;
            vm.trialDetailObj.is_draft = ''
            vm.trialDetailObj.edit_type = vm.trialDetailObj.isImported ? 'imported_update' : '';
            PATrialService.setCurrentTrial(vm.trialDetailObj, 'checkoutin'); //cache the trial data
            Common.broadcastMsg(MESSAGES.TRIAL_DETAIL_SAVED);
            $scope.trialDetailObj = vm.trialDetailObj;
        }

        /**
         * Watcher for the checkout / checkin buttons,
         * watch for whether or not checkout/in is allowed, and
         * whether or not the buttons should be disabled (if the user is not the same as the one
         * who checked it out)
         * @return {Void}
         */
        function watchCheckoutButtons() {

            $scope.$watch(function() {return vm.adminCheckoutObj;},
                function(newVal) {
                    vm.adminCheckoutAllowed = (newVal === null); // boolean, if not null, do not allow checkout again
                    // trial is not editable if checkout is allowed (in checkedin state) or
                    // the curUserRole is Super or Admin
                    var checkedoutByUsername = !!newVal ? newVal.by : '';
                    vm.adminCheckinAllowed = !vm.adminCheckoutAllowed && (vm.curUser === checkedoutByUsername ||
                        curUserRole === 'ROLE_SUPER' || curUserRole === 'ROLE_ABSTRACTOR-SU' ||
                        curUserRole === 'ROLE_ADMIN');
                    _checkEditableStatus();

                    if (!!newVal) {
                        // ROLE_SUPER can override the checkout button
                        vm.adminCheckoutBtnDisabled = vm.curUser !== checkedoutByUsername &&
                        curUserRole !== 'ROLE_SUPER' && curUserRole !== 'ROLE_ABSTRACTOR' &&
                        curUserRole !== 'ROLE_ABSTRACTOR-SU' && curUserRole !== 'ROLE_ADMIN';
                    }
                });

            $scope.$watch(function() {return vm.scientificCheckoutObj;},
                function(newVal) {
                    vm.scientificCheckoutAllowed = (newVal === null); // if not null, do not allow checkout again
                    // trial is not editable if checkout is allowed (in checkedin state) or
                    // the curUserRole is Super or Admin
                    var checkedoutByUsername = !!newVal ? newVal.by : '';
                    vm.scientificCheckinAllowed = !vm.scientificCheckoutAllowed && (vm.curUser === checkedoutByUsername ||
                        curUserRole === 'ROLE_SUPER' || curUserRole === 'ROLE_ABSTRACTOR-SU' ||
                        curUserRole === 'ROLE_ADMIN');

                    _checkEditableStatus();
                    if (!!newVal) {
                        // ROLE_SUPER can override the checkout button
                        vm.scientificCheckoutBtnDisabled = vm.curUser !== checkedoutByUsername &&
                            curUserRole !== 'ROLE_SUPER' && curUserRole !== 'ROLE_ABSTRACTOR' &&
                            curUserRole !== 'ROLE_ABSTRACTOR-SU' && curUserRole !== 'ROLE_ADMIN';
                    }
                });
        } //watchCheckoutButtons


        /**
         * Throw a toaster for checkout and checkin operations
         * @param  {String} message  [toastr message]
         * @param  {String} position [where the toastr is displayed]
         * @return {Void}
         */
        function showToastr(message, position) {
            $mdToast.show({
            template: '<md-toast style="background-color: #6200EA"><span flex>' + message + '</span></md-toast>',
            parent: $document[0].querySelector('#checkoutORin_message'),
            hideDelay: 3000,
            position: position
          });
        } //showToastr

        function watchUpdatesInChildrenScope() {
            $scope.$on('updatedInChildScope', function() {
                console.info('updatedInChildScope, getting current trial now!');
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
                console.info('milestone wrappers: ', vm.trialDetailObj.milestone_wrappers);
                _checkEditableStatus();
                updateTrialDetailObj(vm.trialDetailObj);
            });
        }

        /**
         * Check the current milestone and decide the visibility of certain PA menu items and screens
         * @param  {JSON object} trialDetailObj [fetched trial detail object]
         * @return {JSON object, updated values are all boolean}                [paMenuTypes to control visibility of certain menu items/screens]
         */
        function _checkMilestoneCode(trialDetailObj) {
            var informationSourceCode = !!trialDetailObj.internal_source ? trialDetailObj.internal_source.code : 'IMP'; // if code is missing, assumed to be IMP (imported)
            var milestones = _.map(trialDetailObj.milestone_wrappers, function(msObj) {
                msObj.milestone.submission_id = msObj.submission.id; // move attribute one-level up
                msObj.milestone.submission_num = parseInt(msObj.submission.submission_num); // move one-level up
                msObj.milestone.submission_type_code = msObj.submission.submission_type_code; // move one-level up
                return msObj.milestone; // {id: '', code: '', name: ''}
            });
            var updatedPAMenuTypes;
            var curMilestone = milestones.length > 0 ? milestones[milestones.length - 1] : null;
            var curMilestoneCode = !!curMilestone ? curMilestone.code : ''; // get the current mile stone code
            var altCurMilestoneIndex = -1;
            // if current milestone code is 'SRE', use the latest milestone prior to 'STR'
            if (curMilestoneCode === 'SRE') {
                console.info('curMilestoneCode: SRE!');
                altCurMilestoneIndex = _.findLastIndex(milestones, {code: 'STR'});
                console.info('altCurMilestoneIndex: ', altCurMilestoneIndex);
                if (altCurMilestoneIndex > 0) {
                    altCurMilestoneIndex -= 1;
                    curMilestoneCode = milestones[altCurMilestoneIndex].code;
                }
            } else if (curMilestoneCode === 'SRJ') {
                console.info('curMilestoneCode: SRJ -- submission rejection date, curMilestone.submission_num: ', curMilestone.submission_num);
                // submission rejection date and last submission type is 'Amendment'
                if (trialDetailObj.last_submission_type_code === 'AMD') {
                    console.info('SRJ, last_submission_type_code is AMD!');
                    altCurMilestoneIndex = _.findLastIndex(milestones, {submission_num: curMilestone.submission_num - 1}); // find the active in last submission
                    curMilestoneCode = altCurMilestoneIndex > -1 ? milestones[altCurMilestoneIndex].code : '';
                } else if (trialDetailObj.last_submission_type_code === 'ORI') {
                    altCurMilestoneIndex = _.findLastIndex(milestones, {code: 'SRJ'});
                    console.info('SRJ, last_submission_type_code is ORI, altCurMilestoneIndex: ', altCurMilestoneIndex);
                    // curMilestoneCode = altCurMilestoneIndex > 0 ? milestones[altCurMilestoneIndex-1].code : '';
                    curMilestoneCode = altCurMilestoneIndex > 0 ? milestones[altCurMilestoneIndex].code : '';
                }
            }

            if (MILESTONE_CODES_FOR_VALIDATION.indexOf(curMilestoneCode) > -1) {
                if (informationSourceCode === 'IMP') {
                    updatedPAMenuTypes = _falsifyValuesExcept(paMenuTypes, 'trialValidImport');
                } else if (informationSourceCode === 'PRO') {
                    updatedPAMenuTypes = _falsifyValuesExcept(paMenuTypes, 'trialValidProtocol');
                }
            } else if (MILESTONE_CODES_FOR_REJECTION.indexOf(curMilestoneCode) > -1 && informationSourceCode === 'PRO') {
                updatedPAMenuTypes = _falsifyValuesExcept(paMenuTypes, 'rejection');
            } else if (MILESTONE_CODES_FOR_ABSTRACTION_EXCEPT.indexOf(curMilestoneCode) === -1) {
                updatedPAMenuTypes = _falsifyValuesExcept(paMenuTypes, 'abstraction');
            }

            return updatedPAMenuTypes;
        }

        function _checkRejectionAndRole(trialDetailObj) {
            if (trialDetailObj.is_rejected && ROLE_LIST_TO_HIDE_FROM.indexOf(curUserRole) > -1) {
                return true;
            } else {
                return false;
            }
        }

        var overridingUserRoles = ['ROLE_SUPER', 'ROLE_ADMIN'];
        function _checkEditableStatus() {
            vm.trialDetailObj.pa_editable = vm.adminCheckinAllowed || _.contains(overridingUserRoles, curUserRole);
            vm.trialDetailObj.pa_sci_editable = vm.scientificCheckinAllowed || _.contains(overridingUserRoles, curUserRole);
        }

        /**
         * Mark all values in jsonObj to false with the exception for 'exceptKey'
         * @param  {JSON object} jsonObj   [values are boolean]
         * @param  {String} exceptKey [this value is to be set to true]
         * @return {JSON object}           [values are boolean, with only one true value]
         */
        function _falsifyValuesExcept(jsonObj, exceptKey) {
            var clonedObj = JSON.parse(JSON.stringify(jsonObj)); // clone
            Object.keys(clonedObj).forEach(function(key) {
                if (clonedObj.hasOwnProperty(key)) {
                    clonedObj[key] = key === exceptKey ? true : false;
                }
            });
            return clonedObj;
        }

        /**
         * Find the research category name in the provided research category array
         * @param  {Array} researchCategoryArr array of JSON objects
         * @param  {Integer} researchCatId       e.g. vm.trialDetailObj.research_category_id
         * @return {String}                     research category name (lower case), could be empty if not found
         */
        function _getResearchCategory(researchCategoryArr, researchCatId) {
            var catObj = _.findWhere(researchCategoryArr, {id: researchCatId});
            var catName = !!catObj ? catObj.name : '';
            return catName.toLowerCase();
        }
    } // paTrialOverviewCtrl

    /**
     * Checkin modal controller
     */
    function checkinModalCtrl($scope, $uibModalInstance, curTrialObj, trialStatusDict,
            PATrialService, TrialService, validationResults, _, $state) {
        var viewModel = this;
        viewModel.curTrialObj = curTrialObj;
        viewModel.checkinComment = null;
        viewModel.isValidatingStatus = true;
        viewModel.isTrialStatusValid = true;
        viewModel.isAbstractionValid = validationResults.length === 0;
        var annotatedTrialStatuses = PATrialService.annotateTrialStatusWithNameAndCode(curTrialObj.trial_status_wrappers, trialStatusDict);

        activate();
        function activate() {
            validateTrialStatuses(annotatedTrialStatuses);
        }
        viewModel.proceedCheckin = function() {
            $uibModalInstance.close(viewModel.checkinComment);
        };
        viewModel.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
        viewModel.viewAbstractionValidation = function() {
            $state.go('main.pa.trialOverview.abstractValidation', {reload: true});
            viewModel.cancel();
        };

        function validateTrialStatuses(annotatedStatusArr) {
            viewModel.isValidatingStatus = true;
            TrialService.validateStatus({"statuses": annotatedStatusArr}).then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    if (res.validation_msgs && angular.isArray(res.validation_msgs) && res.validation_msgs.length > 0) {

                        res.validation_msgs.forEach(function(msg) {
                            if ((msg.errors && msg.errors.length > 0) ||
                                    (msg.warnings && msg.warnings.length > 0)) {

                                        viewModel.isTrialStatusValid = false;
                                        return;
                                }
                        }); // forEach
                    } else {
                        viewModel.isTrialStatusValid = true;
                    }
                }
            }).catch(function(err) {
                console.error('error in validating status: ', err);
            }).finally(function() {
                viewModel.isValidatingStatus = false;
            });
        }

    } // checkin modal controller

})();
