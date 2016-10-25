/**
 * Created by wangg5, February 16, 2016
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('paTrialRelatedDocsCtrl', paTrialRelatedDocsCtrl);

    paTrialRelatedDocsCtrl.$inject = ['$scope', '_', 'PATrialService', 'TrialService', '$popover',
        'Common', 'DateService', '$timeout', 'CommentService', 'documentTypes', '$mdToast',
        '$document', 'UserService', 'toastr', 'HOST', 'URL_CONFIGS', 'acceptedFileTypesObj', 'Upload'];

        function paTrialRelatedDocsCtrl($scope, _, PATrialService, TrialService, $popover,
            Common, DateService, $timeout, CommentService, documentTypes, $mdToast,
            $document, UserService, toastr, HOST, URL_CONFIGS, acceptedFileTypesObj, Upload) {

            var vm = this;
            var DOC_STATUSES = ['active', 'inactive', 'deleted']; // for storing document status in database
            vm.acceptedFileExtensions = acceptedFileTypesObj.accepted_file_extensions;
            vm.acceptedFileTypes = acceptedFileTypesObj.accepted_file_types;
            vm.downloadBaseUrl = HOST + '/ctrp/registry/trial_documents/download';
            vm.curTrialDetailObj = {};
            vm.curDoc = _initCurDoc();
            vm.docSubtypeShown = false;
            vm.docTypeError = '';
            vm.formError = '';
            vm.documentTypes = documentTypes.types.split(',').sort();
            var requiredDocTypes = _.filter(vm.documentTypes, function(type) {
                return type.indexOf('IRB') > -1 || type.indexOf('Protocol Doc') > -1;
            });
            var uniqueDocTypes = _.filter(vm.documentTypes, function(type) {
                return type.indexOf('IRB') > -1 ||
                        type.indexOf('Protocol Doc') > -1 ||
                        type.indexOf('Informed') > -1 ||
                        type.indexOf('Participating') > -1 ||
                        type.indexOf('Highlighted') > -1;
            }); // array of doc types that do not allow mutation

            // actions
            vm.saveDocuments = saveDocuments;
            vm.deleteDoc = deleteDoc;
            vm.toggleDeleteStatus = toggleDeleteStatus;
            vm.editDoc = editDoc;
            vm.cancelEdit = cancelEdit;
            vm.upsertDoc = upsertDoc; //upsertDoc;
            vm.resetForm = resetForm;
            vm.disableBtn = false;

            activate();
            function activate() {
                _getTrialDetailCopy();
                _watchCurDocType();
            }

            /**
             * get a data clone of the trial detail object from Local Cache
             * @return {Void}
             */
            function _getTrialDetailCopy() {
                $timeout(function() {
                    vm.curTrialDetailObj = PATrialService.getCurrentTrialFromCache();
                    _filterActiveDocs();
                    vm.curTrialDetailObj.trial_documents = _sortDocsLatestFirst(vm.curTrialDetailObj.trial_documents);
                }, 0);
            } //getTrialDetailCopy

            /**
             * Toggle the deletion status on the document
             * @param  {Integer} index - index in the trial_documents array
             * @return {Void}
             */
            function toggleDeleteStatus(index) {
                if (index < vm.curTrialDetailObj.trial_documents.length) {
                    var curStatus = vm.curTrialDetailObj.trial_documents[index].status || 'deleted';
                    if (curStatus === 'active' && index === vm.curDoc.index) {
                        // cancel editing the doc that is to be deleted
                        cancelEdit();
                    }
                    $timeout(function() {
                        // apply the changes to the scope
                        vm.curTrialDetailObj.trial_documents[index].status = (curStatus === 'deleted') ? 'active' : 'deleted'; // toggle active and deleted
                        if (vm.curTrialDetailObj.trial_documents[index].status === 'active') {
                            vm.curTrialDetailObj.trial_documents[index].why_deleted = null;
                            vm.curTrialDetailObj.trial_documents[index].deleted_by = null;
                            vm.curTrialDetailObj.trial_documents[index].deletion_date = null;
                        } else {
                            vm.curTrialDetailObj.trial_documents[index].deleted_by = UserService.getLoggedInUsername();
                            vm.curTrialDetailObj.trial_documents[index].deletion_date = moment().format('DD-MMM-YYYY');
                        }
                    }, 0);
                }
            }

            function deleteDoc(deletionComment, index) {
                if (deletionComment === null || deletionComment.trim().length === 0) {
                    return;
                }
                toggleDeleteStatus(index);
            }

            var prevFile = '';
            function editDoc(index) {
                if (index < vm.curTrialDetailObj.trial_documents.length) {
                    // vm.curDoc = Object.assign({}, vm.curTrialDetailObj.trial_documents[index], {edit: true});
                    vm.curDoc = angular.copy(vm.curTrialDetailObj.trial_documents[index]);
                    vm.curDoc.index = index;
                    prevFile = angular.copy(vm.curDoc.file);
                    vm.curDoc.file = '';
                    vm.curDoc.edit = true;
                    console.log('curDoc: ', vm.curDoc);
                }
            }

            /**
             * Initialize curDoc
             * @return {[type]} [description]
             */
            function _initCurDoc() {

                var doc = {
                    document_type: '',
                    file_name: '',
                    file: '', // File to be uploaded
                    document_subtype: null,
                    added_by: {},
                    added_by_id: null,
                    created_at: '',
                    edit: false,
                    index: null,
                    _destroy: false,
                    status: 'active',
                    why_deleted: null,
                    deleted_by: null,
                    deletion_date: null,
                    isPopoverOpen: false,
                    source_document: 'PA'
                };
                return doc;
            }

            function findIndices(arrayObjs, field, value) {
                var indices = []; // array of integers
                _.each(arrayObjs, function(obj, index) {
                    if (obj[field] === value) {
                        indices.push(index);
                    }
                });
                return indices;
            }

            /**
             * Make sure no duplication of the same document type except for 'Other Document'
             * @param  {String} docType[if null, it's a new document]
             * @return {Void}       [description]
             */
            function isDocTypeExistent(docType) {
                vm.docTypeError = '';
                return _.contains(uniqueDocTypes, docType) &&
                       _.findIndex(vm.curTrialDetailObj.trial_documents, {'document_type': docType}) > -1;
            }

            function upsertDoc(index) {
                if (index === null && vm.curDoc.file === '') {
                    console.error('null document object');
                    return;
                }
                if (index !== null && !vm.curDoc.file.size) {
                    // update without uploading
                    vm.curDoc.file = prevFile !== '' ? prevFile : vm.curDoc.file;
                    vm.curTrialDetailObj.trial_documents[index] = angular.copy(vm.curDoc);
                } else if (!!vm.curDoc.file.size) {
                    // file to be uploaded
                    // replacing document id
                    vm.curDoc.replacedDocId = vm.curDoc.id || null; // what if vm.curDoc.document_type.indexOf('Other') > -1 ?????
                    vm.curDoc.file_name = vm.curDoc.file.name; // extract name from the File object
                    if (index !== null) {
                        // existing document
                        vm.curTrialDetailObj.trial_documents[index] = vm.curDoc;
                    } else {
                        // new document
                        if (isDocTypeExistent(vm.curDoc.document_type)) {
                            console.error('doctype exists already: ', vm.curDoc.document_type);
                            vm.docTypeError = 'The selected document type has already been selected.';
                            return;
                        } // check document type for new document
                        vm.curDoc.created_at = new Date();
                        vm.curDoc.added_by = {username: UserService.getLoggedInUsername()};
                        vm.curDoc.added_by_id = UserService.getCurrentUserId();
                        vm.curTrialDetailObj.trial_documents.unshift(vm.curDoc);
                    }
                }
                // re-initialize the vm.curDoc
                vm.curDoc = _initCurDoc();
                prevFile = '';
            }

            /**
             * Watch for the document type of the document to be uploaded,
             * if the document type is 'Other', show the input field 'document_subtype'
             * @return {[type]} [description]
             */
            function _watchCurDocType() {
                $scope.$watch(function() {return vm.curDoc.document_type;},
                    function(newVal, oldVal) {
                        vm.docSubtypeShown = newVal.indexOf('Other') > -1;
                        // vm.curDoc.document_subtype = '';
                    });
            }

            /**
             * Reset the form
             */
            function resetForm() {
                _getTrialDetailCopy();
                vm.curDoc = _initCurDoc();
                $scope.trial_docs_form.$setPristine();
            }

            /**
             * POST the updated trial to backend
             * @param  {Boolean} showToastr [show toastr or not]
             * @return {Void}
             */
            function saveDocuments(showToastr, formName) {
                // warning toastr for edited document
                // cancelEdit();
                console.info('saving documents....');
                if (vm.curDoc.edit === true) {
                    // _showWarningToastr('Please cancel or commit the edited document first', 'bottom right');
                    vm.formError = 'Cancel or commit the edited document first';
                    return;
                }
                if (!_isFormValid()) {
                    formName.$valid = false;
                    console.error('form validity: ', formName.$valid);
                    return;
                }
                vm.saveBtnDisabled = true;
                PATrialService.uploadTrialRelatedDocs(vm.curTrialDetailObj.trial_documents, vm.curTrialDetailObj.id)
                    .then(function(res) {
                        if (angular.isArray(res)) {
                            _.each(res, function(uploadedDoc, index) {
                                if (uploadedDoc !== null) {
                                    vm.curTrialDetailObj.trial_documents[index].id = uploadedDoc.data.id;
                                    vm.curTrialDetailObj.trial_documents[index].added_by = {username: UserService.getLoggedInUsername()};
                                }
                            });
                        }

                        vm.curTrialDetailObj.trial_documents_attributes = vm.curTrialDetailObj.trial_documents;
                        var outerTrial = {};
                        outerTrial.new = false;
                        outerTrial.id = vm.curTrialDetailObj.id;
                        outerTrial.trial = vm.curTrialDetailObj;
                        // get the most updated lock_version
                        outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;
                        TrialService.upsertTrial(outerTrial).then(function(res) {
                            var status = res.server_response.status;

                            if (status >= 200 && status <= 210) {
                                vm.curTrialDetailObj = res;
                                vm.curTrialDetailObj.lock_version = res.lock_version;
                                PATrialService.setCurrentTrial(vm.curTrialDetailObj); // update to cache
                                // $scope.$emit('updatedInChildScope', {});
                                _filterActiveDocs();
                                vm.curDoc = _initCurDoc();
                                vm.docTypeError = '';
                                vm.formError = '';
                                if (showToastr) {
                                    toastr.clear();
                                    toastr.success('Trial related documents have been saved', 'Successful!');
                                }

                                // To make sure setPristine() is executed after all $watch functions are complete
                                $timeout(function() {
                                   $scope.trial_docs_form.$setPristine();
                                }, 1);
                            }
                        }).catch(function(err) {
                            console.log('trial update error: ', err);
                        }).finally(function() {
                            vm.saveBtnDisabled = false;
                        });
                    }).catch(function(err) {
                        console.error('group promise err: ', err);
                    });
            } // updatedTrial

            /**
             * Filter out inactive or deleted documents from display
             * @return {Void} [description]
             */
            function _filterActiveDocs() {
                vm.curTrialDetailObj.trial_documents = _.filter(vm.curTrialDetailObj.trial_documents, function(doc) {
                    return doc.status === 'active'; // do not show soft deleted or inactive document
                }).map(function(filteredDoc) {
                    delete filteredDoc._destroy;
                    filteredDoc.why_deleted = filteredDoc.why_deleted || null; // initialize why_deleted field if not present
                    filteredDoc.deleted_by = filteredDoc.deleted_by || null;
                    filteredDoc.deletion_date = filteredDoc.deletion_date || null;
                    return filteredDoc;
                });
            }

            function _sortDocsLatestFirst(trialDocs){
                var sortedDocs = [];
                if (!!trialDocs && angular.isArray(trialDocs)) {
                    sortedDocs = trialDocs.sort(function(a, b) { return a.updated_at > b.updated_at ? -1 : 1; });
                }
                return sortedDocs;
            }

            function cancelEdit() {
                vm.curDoc = _initCurDoc();
            }

            function _showWarningToastr(message, position) {
                $mdToast.show({
                controller: 'warningToastrCtrl',
                template: '<md-toast style="background-color: #6200EA"><span flex>' + message + '</span><md-button ng-click="closeWarning()">Close</md-button></md-toast>',
                parent: $document[0].querySelector('#warning_message'),
                hideDelay: 15000,
                position: position,
                action: ''
              });
            } // _showWarningToastr

            /**
             * check form for required fields
             * @return {Boolean}
             */
            function _isFormValid() {
                var valid = true;
                _.each(requiredDocTypes, function(type) {
                    if (_.findIndex(vm.curTrialDetailObj.trial_documents, {'document_type': type, 'status': 'active'}) === -1) {
                        valid = false;
                        return;
                    }
                });
                vm.formError = valid ? '' : 'Both Protocol Document and IRB Approval Document are Required';
                return valid;
            }


        } // paTrialRelatedDocsCtrl

})();
