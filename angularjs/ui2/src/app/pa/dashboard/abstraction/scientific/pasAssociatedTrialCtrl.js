/**
 * created by wangg5 on March 21, 2016
 */
(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
        .controller('pasAssociatedTrialCtrl', pasAssociatedTrialCtrl);

    pasAssociatedTrialCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', '$state', 'toastr',
        'MESSAGES', '_', '$timeout', 'identifierTypes', '$location', '$anchorScroll'];

    function pasAssociatedTrialCtrl($scope, TrialService, PATrialService, $state, toastr,
        MESSAGES, _, $timeout, identifierTypes, $location, $anchorScroll) {
            var vm = this;
            vm.identifierTypes = identifierTypes;
            vm.trialQueryObj = {identifierTypeId: '', trialIdentifier: ''}; // to be POSTed for search
            vm.trialDetailObj = {};
            vm.trialDetailObj.associated_trials = [];
            vm.showLookupForm = false;
            vm.deleteAllAssoCheckbox = false;

            // actions
            vm.resetTrialLookupForm = resetTrialLookupForm;
            vm.associateTrial = associateTrial;
            vm.lookupTrial = lookupTrial;
            vm.showTrialLookupForm = showTrialLookupForm;
            vm.closeLookupForm = closeLookupForm;
            vm.deleteTrialAssociations = deleteTrialAssociations;
            // vm.resetAssociations = _getTrialDetailCopy;
            vm.deleteAllAssociations = deleteAllAssociations;
            vm.reload = reload;

            vm.disableBtn = false;

            activate();
            function activate() {
                _getTrialDetailCopy();
                vm.foundTrialObj = _initFoundTrialObj();
                watchDeletionCheckbox();
                watchIdentifierTypeId();
            }

            function lookupTrial() {
                if (!vm.trialQueryObj.identifierTypeId || !vm.trialQueryObj.trialIdentifier || vm.trialQueryObj.trialIdentifier.trim().length === 0) {
                    return;
                }
                var selectedIdentifier = _.findWhere(vm.identifierTypes, {id: vm.trialQueryObj.identifierTypeId});
                if (!selectedIdentifier || !vm.trialQueryObj.trialIdentifier.startsWith(selectedIdentifier.name)) {
                    vm.foundTrialObj.errorMsg = 'Trial identifier must match its identifier type';
                    return;
                }

                vm.disableBtn = true;
                vm.associationErrorMsg = '';

                PATrialService.lookupTrial(vm.trialQueryObj.trialIdentifier.trim())
                    .then(function(res) {
                        var status = res.server_response.status;

                        if (status >= 200 && status <= 210) {
                            vm.foundTrialObj.trial_identifier = res.nct_id || res.nci_id;
                            vm.foundTrialObj.associated_trial_id = res.id || ''; // for hyperlink only
                            vm.foundTrialObj.identifierTypeStr = _.findWhere(vm.identifierTypes, {id: vm.trialQueryObj.identifierTypeId}).name; // not to be persisted
                            vm.foundTrialObj.identifier_type_id = vm.trialQueryObj.identifierTypeId;
                            vm.foundTrialObj.official_title = res.official_title || '';
                            vm.foundTrialObj.researchCategory = res.research_category || null; // not to be persisted!
                            vm.foundTrialObj.research_category_name = res.research_category;
                            vm.foundTrialObj.errorMsg = res.error_msg || '';
                        }
                }).catch(function(err) {
                    console.error('err in looking up the trial: ', vm.trialQueryObj);
                }).finally(function() {
                    vm.disableBtn = false;
                });
            } // lookupTrial

            function resetTrialLookupForm(form) {
                vm.trialQueryObj = {identifierTypeId: 1, trialIdentifier: 'NCI-'};
                vm.foundTrialObj = _initFoundTrialObj();
                $scope.associated_trials_form.$setPristine();
                // TODO: reset form to $pristine, etc.
            }

            function reload() {
                $state.go($state.$current, null, { reload: true });
            };

            function _initFoundTrialObj() {
                return {
                    trial_identifier: '',
                    identifier_type_id: '',
                    trial_id: vm.trialDetailObj.id, // parent trial id, associated trials are its children
                    official_title: '',
                    _destroy: false
                };
            }

            function _getTrialDetailCopy() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
                vm.trialDetailObj.associated_trials = _.map(vm.trialDetailObj.associated_trials, function(trial) {
                    trial.identifierTypeStr = _.findWhere(vm.identifierTypes, {id: trial.identifier_type_id}).name;
                    trial.researchCategory = ''; // TODO:
                    return trial;
                });
            }

            function showTrialLookupForm(form) {
                vm.showLookupForm = true;
                resetTrialLookupForm(form);
                // form.trial_identifier.$error = null;
                // form.identifier_type.$error = null;
            }

            function closeLookupForm() {
                vm.showLookupForm = false;
                $location.hash('section_top');
                $anchorScroll();
            }

            /**
             * Add the trial to the trial associations array
             * @param  {Object}  trialLookUpResult [description]
             * @return {Void}                   [description]
             */
            function associateTrial(trialLookUpResult) {
                if (_.findIndex(vm.trialDetailObj.associated_trials, {trial_identifier: trialLookUpResult.trial_identifier}) > -1) {
                        vm.associationErrorMsg = 'Error: Trial association already exists';
                    // no duplicate
                    return;
                }
                vm.disableBtn = true; // disable the button
                PATrialService.associateTrial(trialLookUpResult).then(function(res) {
                    var status = res.server_response.status;

                    if (status >= 200 && status <= 210) {
                        delete res.server_response;
                        res.associated_trial_id = trialLookUpResult.associated_trial_id; // res.id;
                        vm.trialDetailObj.associated_trials.unshift(res);
                        closeLookupForm();

                        toastr.clear();
                        toastr.success('Record Created.', 'Operation Successful!');
                        vm.deleteAllAssoCheckbox = false;
                    }
                }).catch(function(err) {
                    console.error('error in associating the trial: ', err);
                }).finally(function(done) {
                    vm.disableBtn = false;
                });

            } // associateTrial

            function deleteAllAssociations(booleanFlag) {
                _.each(vm.trialDetailObj.associated_trials, function(trial, idx) {
                    vm.trialDetailObj.associated_trials[idx]._destroy = booleanFlag;
                });
            }

            function watchDeletionCheckbox() {
                $scope.$watch(function() {return vm.trialDetailObj.associated_trials;},
                    function(newVal, oldVal) {
                        if (angular.isDefined(newVal) && angular.isArray(newVal)) {
                            vm.deleteBtnDisabled = _.findIndex(newVal, {_destroy: true}) === -1;
                        }
                }, true);
            }

            function watchIdentifierTypeId() {
                $scope.$watch(function() {return vm.trialQueryObj.identifierTypeId;},
                    function(newVal, oldVal) {
                        if (newVal) {
                            if (newVal === 1) {
                                vm.trialQueryObj.trialIdentifier = 'NCI-';
                            } else {
                                vm.trialQueryObj.trialIdentifier = 'NCT';
                            }
                        }
                }, true);
            }

            /**
             * Update associated trials at the backend
             * @return {Void}
             */

            function deleteTrialAssociations() {
                if (vm.trialDetailObj.associated_trials.length === 0) {
                    return;
                }
                vm.trialDetailObj.associated_trials_attributes = vm.trialDetailObj.associated_trials;
                var outerTrial = {};
                outerTrial.new = false;
                outerTrial.id = vm.trialDetailObj.id;
                outerTrial.trial = vm.trialDetailObj;
                outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;
                vm.disableBtn = true;
                PATrialService.upsertTrial(outerTrial).then(function(res) {
                    var status = res.server_response.status;

                    if (status >= 200 && status <= 210) {
                        vm.trialDetailObj = res;
                        vm.trialDetailObj.lock_version = res.lock_version;
                        PATrialService.setCurrentTrial(vm.trialDetailObj); // update to cache
                        $scope.$emit('updatedInChildScope', {});
                        vm.deleteAllAssoCheckbox = false;

                        toastr.clear();
                        toastr.success('Record(s) deleted.', 'Operation Successful!');
                        _getTrialDetailCopy();
                    }
                }).catch(function(err) {
                    console.error('trial association error: ', err);
                }).finally(function() {
                    vm.disableBtn = false;
                });
            }
        }

    })();
