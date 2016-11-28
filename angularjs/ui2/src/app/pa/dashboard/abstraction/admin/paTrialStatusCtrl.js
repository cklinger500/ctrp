/**
 * Created by wangg5, December 31st, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialStatusCtrl', paTrialStatusCtrl);

    paTrialStatusCtrl.$inject = ['$scope', '_', 'PATrialService', 'TrialService',
        'trialStatuses', 'Common', 'DateService', '$timeout', 'CommentService',
        'UserService', 'toastr'];

    function paTrialStatusCtrl($scope, _, PATrialService, TrialService,
        trialStatuses, Common, DateService, $timeout, CommentService,
        UserService, toastr) {

        var vm = this;
        vm.trialStatusDict = trialStatuses //.sort(Common.a2zComparator()); // array of trial statuses
        vm.statusObj = _initStatusObj();
        vm.dateFormat = DateService.getFormats()[1];
        vm.startDateRequired = true;
        vm.statusDateOpened = false;
        vm.startDateOpened = false;
        vm.primaryCompDateOpened = false;
        vm.compDateOpened = false;
        vm.amendmentDateOpened = false;
        vm.showWhyStoppedField = false;
        vm.isExpandedAccess = false;
        vm.isDCPTrial = false;
        vm.isInterventional = false;
        vm.statusPopover = {open: false, content: ''};

        vm.dateOptions = DateService.getDateOptions();
        vm.trialDetailObj = {};
        vm.tempTrialStatuses = [];
        vm.commentList = [];
        vm.disableBtn = false;

        var commentField = 'trial-status'; // for marking comment entry
        var commentModel = 'Trial'; // model name for comment
        var statusesForWhyStopped = [
            'administratively complete', 'withdrawn',
            'temporarily closed to accrual',
            'temporarily closed to accrual and intervention'
        ];

        // actions
        vm.addTrialStatus = addTrialStatus;
        vm.openCalendar = openCalendar;
        vm.deleteTrialStatus = deleteTrialStatus;
        vm.editTrialStatus = editTrialStatus;
        vm.cancelEdit = cancelEdit;
        vm.commitEdit = commitEdit;
        vm.createComment = createComment;
        vm.updateComment = updateComment;
        vm.updateTrialStatuses = updateTrialStatuses;
        vm.resetForm = resetForm;
        vm.deleteAllStatuses = deleteAllStatuses;

        activate();
        function activate() {
            _watchTrialStatusChanges();
            _getTrialDetailCopy();

        } // activate

        function _getTrialDetailCopy() {
            $timeout(function() {
                vm.trialDetailObj = PATrialService.getCurrentTrialFromCache();
                var researchCategoryTitle = !!vm.trialDetailObj.research_category ? vm.trialDetailObj.research_category.name.toLowerCase() : '';
                vm.isExpandedAccess = researchCategoryTitle.indexOf('expand') > -1;
                vm.isInterventional = researchCategoryTitle.indexOf('intervention') > -1;
                if (!vm.isExpanedAccess) {
                    // disable some trial statuses if non-expanded access
                    _disableItemsInTrialStatusList();
                }
                // find out if the trial has DCP identifier
                if (vm.trialDetailObj.other_ids) {
                    _.each(vm.trialDetailObj.other_ids, function(id) {
                        if (id.protocol_id_origin && id.protocol_id_origin.code.indexOf('DCP') > -1) {
                            vm.isDCPTrial = true;
                            return;
                        }
                    });
                }
                vm.commentObj = _initCommentObj();
                // load comments for the trial with the field name {commentField}
                _loadComments(commentField);
                _convertDates();
                vm.tempTrialStatuses = PATrialService.annotateTrialStatusWithNameAndCode(vm.trialDetailObj.trial_status_wrappers, vm.trialStatusDict);
                validateStatuses();
            }, 0);
        } // _getTrialDetailCopy

        /**
         * Generate a new status object
         * @return {JSON} [fields: status_date, etc (see below)]
         */
        function _initStatusObj() {
            var statusObj = {
                status_date: '',
                trial_status_id: '',
                comment: '',
                why_stopped: '',
                _destroy: false
            };
            return statusObj;
        }

        function addTrialStatus() {
            vm.statusErrorMsg = '';
            if (vm.statusObj.status_date && vm.statusObj.trial_status_id) {
                var clonedStatusObj = angular.copy(vm.statusObj);
                var selectedStatus = _.findWhere(vm.trialStatusDict, {id: clonedStatusObj.trial_status_id});

                if (!!selectedStatus) {
                    clonedStatusObj.trial_status_name = selectedStatus.name;
                    clonedStatusObj.trial_status_code = selectedStatus.code;
                }
                // vm.tempTrialStatuses.push(clonedStatusObj);
                TrialService.addStatus(vm.tempTrialStatuses, clonedStatusObj);

                // Validate statuses:
                validateStatuses();
                // re-initialize the vm.statusObj
                vm.statusObj = _initStatusObj();
                vm.deleteStatusesAll = false;
            } else {
                vm.statusErrorMsg = 'Both status date and trial status are Required';
            }
        }

        function validateStatuses() {
            vm.statusValidationMsgs = [];
            var activeStatuses = []; // statuses not to be destroyed
            activeStatuses = _.filter(vm.tempTrialStatuses, function(status) {
                return !status._destroy;
            });
            return _validateStatusesDelegate(activeStatuses);
        }

        /**
         * Delegate for validating trial statuses
         * @param  {[type]} statusArr [array of trial statuses]
         * @return {[type]}           [description]
         */
        function _validateStatusesDelegate(statusArr) {
            if (statusArr.length === 0) return;

            vm.disableBtn = true;
            PATrialService.validatePAATrialStatus({"statuses": statusArr}).then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    if (res.validation_msgs && angular.isArray(res.validation_msgs)) {
                        vm.statusValidationMsgs = res.validation_msgs;
                        _.each(vm.tempTrialStatuses, function(status, index) {
                            if (status._destroy) {
                                vm.statusValidationMsgs.splice(index, 0, {});
                            }
                        });
                    }
                }
            }).catch(function(err) {
                console.log('error in validating status');
            }).finally(function() {
                vm.disableBtn = false;
            });
        } // _validateStatusesDelegate


        function deleteAllStatuses() {
            if (vm.deleteStatusesAll) {
                vm.deleteStatusesAll = false;
            } else {
                vm.deleteStatusesAll = true;
            }
            angular.forEach(vm.tempTrialStatuses, function (item) {
                item._destroy = vm.deleteStatusesAll;
            });
        }

        function deleteTrialStatus(index) {
            if (index < vm.tempTrialStatuses.length) {
                vm.tempTrialStatuses[index]._destroy = !vm.tempTrialStatuses[index]._destroy;
                // empty the edit fields if it's targeted for destroy
                if (vm.tempTrialStatuses[index]._destroy && vm.statusObj.edit) {
                    vm.statusObj = _initStatusObj();
                }
            }
            vm.deleteStatusesAll = false;
        } // deleteTrialStatus

        function editTrialStatus(index) {
            if (index < vm.tempTrialStatuses.length) {
                vm.statusObj = angular.copy(vm.tempTrialStatuses[index]);
                vm.statusObj.status_date = moment(vm.statusObj.status_date).toDate();
                vm.statusObj.edit = true;
                vm.statusObj.index = index;
            }
        }

        function commitEdit() {
            vm.statusErrorMsg = '';
            if (!vm.statusObj.status_date || !vm.statusObj.trial_status_id) {
                vm.statusErrorMsg = 'Both status date and trial status are Required';
                return;
            }
            if (vm.statusObj.edit) {
                var selectedStatus = _.findWhere(vm.trialStatusDict, {id: vm.statusObj.trial_status_id});
                if (!!selectedStatus) {
                    vm.statusObj.trial_status_name = selectedStatus.name;
                    vm.statusObj.trial_status_code = selectedStatus.code;
                }
                // vm.tempTrialStatuses.splice(vm.statusObj.index, 0, vm.statusObj);
                vm.tempTrialStatuses[vm.statusObj.index] = vm.statusObj;
                console.log('vm.tempTrialStatuses: ', vm.tempTrialStatuses);
                validateStatuses();
                vm.statusObj = _initStatusObj();
            }
        } // commitEdit

        function cancelEdit() {
            if (vm.statusObj.edit) {
                vm.statusObj = _initStatusObj();
                vm.showWhyStoppedField = false;
            }
        }

        /**
         * Fetch comments for the trial with its uuid and the fieldName
         * @param  {String} fieldName [field name for the comment, e.g. trial-status]
         * @return {Promise}           [resolved to an array of comments]
         */
        function _loadComments(fieldName) {
            vm.disableBtn = true;

            CommentService.getComments(vm.trialDetailObj.uuid, fieldName)
                .then(function(res) {
                    var status = res.server_response.status;

                    if (status >= 200 && status <= 210) {
                        vm.commentList = CommentService.annotateCommentIsEditable(res.comments);
                        vm.commentList.reverse();
                    }
                })
                .catch(function(err) {
                    console.log('error in retrieving comments');
                }).finally(function() {
                    vm.disableBtn = false;
                });
        }

        /**
        * POST commentObj to API
        */
        function createComment() {
            if (vm.commentObj.content === '') return;
            vm.disableBtn = true;

            CommentService.createComment(vm.commentObj)
              .then(function(res) {
                  var status = res.server_response.status;

                  if (status >= 200 && status <= 210) {
                     vm.commentObj = _initCommentObj();
                     _loadComments(commentField);

                     toastr.clear();
                     toastr.success('Your comment has been added', 'Successful!');
                  }
             }).finally(function() {
                 vm.disableBtn = false;
             });
        } //createComment

        function updateComment(newContent, index) {
            if (index < vm.commentList.length) {
                var editedComment = vm.commentList[index];
                editedComment.content = newContent;
                CommentService.updateComment(editedComment);
            }
        }

        function _initCommentObj() {
            return {
              content: '',
              username: UserService.getLoggedInUsername(),
              field: commentField,
              model: commentModel,
              instance_uuid: vm.trialDetailObj.uuid,
              parent_id: ''
            };
        }

        function _convertDates() {
            // format the trial-associated date fields
            vm.trialDetailObj.start_date = !!vm.trialDetailObj.start_date ? moment(vm.trialDetailObj.start_date).toDate() : '';
            vm.trialDetailObj.primary_comp_date = !!vm.trialDetailObj.primary_comp_date ? moment(vm.trialDetailObj.primary_comp_date).toDate() : '';
            vm.trialDetailObj.comp_date = !!vm.trialDetailObj.comp_date ? moment(vm.trialDetailObj.comp_date).toDate() : '';
            vm.trialDetailObj.amendment_date = !!vm.trialDetailObj.amendment_date ? moment(vm.trialDetailObj.amendment_date).toDate() : '';
        }

        function openCalendar ($event, type) {
            $event.preventDefault();
            $event.stopPropagation();

            if (type === 'status_date') {
                vm.statusDateOpened = !vm.statusDateOpened;
            } else if (type === 'start_date') {
                vm.startDateOpened = !vm.startDateOpened;
            } else if (type === 'primary_comp_date') {
                vm.primaryCompDateOpened = !vm.primaryCompDateOpened;
            } else if (type === 'comp_date') {
                vm.compDateOpened = !vm.compDateOpened;
            } else if (type === 'amendment_date') {
                vm.amendmentDateOpened = !vm.amendmentDateOpened;
            }
        }; //openCalendar

        function updateTrialStatuses() {
            createComment(); // if the user did not save the comment, save it here
            vm.trialDetailObj.trial_status_wrappers_attributes = vm.tempTrialStatuses;
            var outerTrial = {};
            outerTrial.new = false;
            outerTrial.id = vm.trialDetailObj.id;
            outerTrial.trial = vm.trialDetailObj;
            vm.disableBtn = true;

            // get the most updated lock_version
            outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;
            TrialService.upsertTrial(outerTrial).then(function(res) {
                var status = res.server_response.status;

                if (status >= 200 && status <= 210) {
                    vm.trialDetailObj = res;
                    vm.trialDetailObj.lock_version = res.lock_version;
                    // delete vm.trialDetailObj.admin_checkout;
                    // delete vm.trialDetailObj.scientific_checkout;
                    PATrialService.setCurrentTrial(vm.trialDetailObj); // update to cache
                    $scope.$emit('updatedInChildScope', {});

                    toastr.clear();
                    toastr.success('Trial statuses has been updated', 'Successful!');
                    _getTrialDetailCopy();
                    $scope.trial_status_form.$setPristine();
                }
            }).finally(function() {
                vm.disableBtn = false;
            });
        } // updateTrialStatuses

        function resetForm() {
            _getTrialDetailCopy();
            $scope.trial_status_form.$setPristine();
        }

        function _watchTrialStatusChanges() {
            $scope.$watch(function() {return vm.statusObj.trial_status_id;}, function(newVal, oldVal) {
                if (newVal) {
                    var selectedStatus = _.findWhere(vm.trialStatusDict, {id: newVal});
                    if (newVal !== oldVal) {
                        vm.statusPopover.content = selectedStatus.explanation;
                        vm.statusPopover.open = true; // when to turn off ?
                    } else {
                        vm.statusPopover.content = '';
                        vm.statusPopover.open = false;
                    }
                    vm.statusPopover.open = vm.statusPopover.content.length > 0; // if empty content, do not open popover
                    var statusName = selectedStatus.name || '';
                    if (_.contains(statusesForWhyStopped, statusName.toLowerCase())) {
                        vm.showWhyStoppedField = true;
                    } else {
                        vm.showWhyStoppedField = false;
                        vm.statusObj.why_stopped = '';
                    }
                } else {
                    vm.statusPopover.content = '';
                    vm.statusPopover.open = false;
                }
            }, true);
        }

        /**
         * If the trial is non-expanded access, disable the following items from trial status selection:
         * |Available |
         * |No longer available|
         * |Temporarily not available|
         * |Approved for marketing|
         * @return {Void}
         */
        var nonSelectableStatuses = [
            'available',
            'no longer available',
            'temporarily not available',
            'approved for marketing'
        ];
        function _disableItemsInTrialStatusList() {
            vm.trialStatusDict = _.map(vm.trialStatusDict, function(status) {
                status.disabled = _.contains(nonSelectableStatuses, status.name.toLowerCase());
                return status;
            });
        } // _disableItemsInTrialStatusList

    } // paTrialStatusCtrl



})();
