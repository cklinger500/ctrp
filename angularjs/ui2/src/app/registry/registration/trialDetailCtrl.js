/**
 * Created by wus4 on 8/14/2015.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('trialDetailCtrl', trialDetailCtrl);

    trialDetailCtrl.$inject = ['trialDetailObj', 'TrialService', 'DateService','$timeout','toastr', 'MESSAGES', '$scope', '$window',
        'Common', '$state', '$uibModal', 'studySourceCode', 'studySourceObj', 'protocolIdOriginObj', 'phaseObj', 'researchCategoryObj', 'primaryPurposeObj',
        'secondaryPurposeObj', 'accrualDiseaseTermObj', 'responsiblePartyObj', 'fundingMechanismObj', 'instituteCodeObj', 'nciObj', 'trialStatusObj',
        'holderTypeObj', 'countryList', 'HOST', '$stateParams', 'acceptedFileTypesObj', '_'];

    function trialDetailCtrl(trialDetailObj, TrialService, DateService, $timeout, toastr, MESSAGES, $scope, $window,
                             Common, $state, $uibModal, studySourceCode, studySourceObj, protocolIdOriginObj, phaseObj, researchCategoryObj, primaryPurposeObj,
                             secondaryPurposeObj, accrualDiseaseTermObj, responsiblePartyObj, fundingMechanismObj, instituteCodeObj, nciObj, trialStatusObj,
                             holderTypeObj, countryList, HOST, $stateParams, acceptedFileTypesObj, _) {
        var vm = this;
        vm.curTrial = trialDetailObj || {lead_protocol_id: ""}; //trialDetailObj.data;
        vm.curTrial = vm.curTrial.data || vm.curTrial;
        vm.collapsed = false;
        vm.studySourceCode = studySourceCode.toUpperCase();
        vm.isExp = false;
        vm.studySourceArr = studySourceObj;
        vm.protocolIdOriginArr = protocolIdOriginObj;
        vm.phaseArr = phaseObj;
        vm.researchCategoryArr = researchCategoryObj;
        vm.primaryPurposeArr = primaryPurposeObj;
        vm.secondaryPurposeArr = secondaryPurposeObj;
        vm.accrualDiseaseTermArr = accrualDiseaseTermObj;
        vm.responsiblePartyArr = responsiblePartyObj;
        vm.fundingMechanismArr = fundingMechanismObj;
        vm.instituteCodeArr = instituteCodeObj;
        vm.nciArr = nciObj;
        vm.trialStatusArr = trialStatusObj;
        vm.grantorArr = [];
        vm.holderTypeArr = holderTypeObj;
        vm.nihNciArr = [];
        vm.countryArr = countryList;
        vm.authorityOrgArr = [];
        vm.status_date_opened = false;
        vm.start_date_opened = false;
        vm.primary_comp_date_opened = false;
        vm.comp_date_opened = false;
        vm.amendment_date_opened = false;
        vm.addedOtherIds = [];
        vm.addedFses = [];
        vm.addedGrants = [];
        vm.addedStatuses = [];
        vm.addedIndIdes = [];
        vm.addedAuthorities = [];
        vm.addedDocuments = [];
        vm.selectedLoArray = [];
        vm.selectedPiArray = [];
        vm.selectedSponsorArray = [];
        vm.selectedInvArray = [];
        vm.selectedIaArray = [];
        vm.selectedFsArray = [];
        vm.showPrimaryPurposeOther = false;
        vm.showSecondaryPurposeOther = false;
        vm.showInvestigator = false;
        vm.showInvSearchBtn = true;
        vm.why_stopped_disabled = true;
        vm.showAddOtherIdError = false;
        vm.addOtherIdError = '';
        vm.showAddGrantError = false;
        vm.showAddStatusError = false;
        vm.showAddStatusDateError = false;
        vm.showAddIndIdeError = false;
        vm.showAddAnthorityError = false;
        vm.addAuthorityError = '';
        vm.otherDocNum = 1;
        vm.fsNum = 0;
        vm.grantNum = 0;
        vm.tsNum = 0;
        vm.indIdeNum = 0;
        vm.toaNum = 0;
        vm.protocolDocNum = 0;
        vm.irbApprovalNum = 0;
        vm.informedConsentNum = 0;
        vm.changeMemoNum = 0;
        vm.protocolHighlightedNum = 0;
        vm.showLpiError = false;
        vm.downloadBaseUrl = HOST + '/ctrp/registry/trial_documents/download';
        vm.acceptedFileExtensions = acceptedFileTypesObj.accepted_file_extensions;
        vm.acceptedFileTypes = acceptedFileTypesObj.accepted_file_types;
        vm.docUploadedCount = 0;
        vm.disableBtn = false;
        vm.grantsInputs = {grantResults: [], disabled: true};
        vm.currentStatusCode = null;
        vm.currentStatusName = null;

        vm.updateTrial = function(updateType) {
            // Prevent multiple submissions
            vm.disableBtn = true;

            if (vm.selectedLoArray.length > 0) {
                vm.curTrial.lead_org_id = vm.selectedLoArray[0].id
            } else {
                vm.curTrial.lead_org_id = null;
            }

            if (vm.selectedPiArray.length > 0) {
                vm.curTrial.pi_id = vm.selectedPiArray[0].id;
            } else {
                vm.curTrial.pi_id = null;
            }

            if (vm.selectedSponsorArray.length > 0) {
                vm.curTrial.sponsor_id = vm.selectedSponsorArray[0].id;
            } else {
                vm.curTrial.sponsor_id = null;
            }

            if (vm.selectedInvArray.length > 0) {
                vm.curTrial.investigator_id = vm.selectedInvArray[0].id;
            } else {
                vm.curTrial.investigator_id = null;
            }

            if (vm.selectedIaArray.length > 0) {
                vm.curTrial.investigator_aff_id = vm.selectedIaArray[0].id;
            } else {
                vm.curTrial.investigator_aff_id = null;
            }

            // Construct nested attributes
            if (vm.addedOtherIds.length > 0) {
                vm.curTrial.other_ids_attributes = [];
                _.each(vm.addedOtherIds, function (otherId) {
                    vm.curTrial.other_ids_attributes.push(otherId);
                });
            }

            if (vm.addedFses.length > 0) {
                vm.curTrial.trial_funding_sources_attributes = [];
                _.each(vm.addedFses, function (fs) {
                    vm.curTrial.trial_funding_sources_attributes.push(fs);
                });
            }

            if (vm.addedGrants.length > 0) {
                vm.curTrial.grants_attributes = [];
                _.each(vm.addedGrants, function (grant) {
                    vm.curTrial.grants_attributes.push(grant);
                });
            }

            if (vm.addedStatuses.length > 0) {
                vm.curTrial.trial_status_wrappers_attributes = [];
                _.each(vm.addedStatuses, function (status) {
                    vm.curTrial.trial_status_wrappers_attributes.push(status);
                });
            }

            if (vm.addedIndIdes.length > 0) {
                vm.curTrial.ind_ides_attributes = [];
                _.each(vm.addedIndIdes, function (indIde) {
                    vm.curTrial.ind_ides_attributes.push(indIde);
                });
            }

            if (vm.addedAuthorities.length > 0) {
                vm.curTrial.oversight_authorities_attributes = [];
                _.each(vm.addedAuthorities, function (authority) {
                    vm.curTrial.oversight_authorities_attributes.push(authority);
                });
            }

            if (vm.addedDocuments.length > 0) {
                vm.curTrial.trial_documents_attributes = [];
                _.each(vm.addedDocuments, function (document) {
                    if (document._destroy) {
                        // Soft delete the document
                        document._destroy = false;
                        document.status = 'deleted';
                        vm.curTrial.trial_documents_attributes.push(document);
                    }
                });
            }

            if (vm.curTrial.edit_type === 'amend') {
                var submissionObj = {};
                submissionObj.amendment_num = vm.amendment_num;
                submissionObj.amendment_date = vm.amendment_date;
                submissionObj._destroy = false;
                vm.curTrial.submissions_attributes = [submissionObj];
            }

            if (updateType == 'draft') {
                vm.curTrial.is_draft = true;
            } else {
                vm.curTrial.is_draft = false;
            }

            // An outer param wrapper is needed for nested attributes to work
            var outerTrial = {};
            outerTrial.new = vm.curTrial.new;
            outerTrial.id = vm.curTrial.id;
            outerTrial.trial = vm.curTrial;

            TrialService.upsertTrial(outerTrial).then(function(response) {
                if (response.server_response.status < 300) {
                    var docCount = uploadDocuments(response.id);
                    // Poll docUploadedCount every 100 ms until upload finishes
                    var intvl = setInterval(function() {
                        if (vm.docUploadedCount === docCount) {
                            clearInterval(intvl);
                            if (vm.curTrial.is_draft) {
                                $state.go('main.trialDetail', {trialId: response.id, editType: 'complete'}, {reload: true});
                            } else {
                                $state.go('main.viewTrial', {trialId: response.id});
                            }
                            toastr.success('Trial ' + vm.curTrial.lead_protocol_id + ' has been recorded', 'Operation Successful!');
                        }
                    }, 100);
                } else {
                    // Enable buttons in case of backend error
                    vm.disableBtn = false;
                }
            }).catch(function(err) {
                vm.disableBtn = true; // re-enable button to allow more attempts without having to refresh page
                console.log("error in updating trial " + JSON.stringify(outerTrial));
            }).finally(function() {
                // do something here if necessary
            });
        }; // updateTrial

        vm.saveDraft = function() {
            if ($scope.trial_form.lead_protocol_id.$error.required) {
                vm.showLpiError = true;
                // Scroll to the top
                $window.scrollTo(0, 0);
            } else {
                vm.updateTrial('draft');
            }
        };


        $scope.refreshGrants = function(serial_number) {

            if (vm.funding_mechanism && vm.institute_code && serial_number.length > 1) {
                var queryObj = {
                    "funding_mechanism": vm.funding_mechanism,
                    "institute_code": vm.institute_code,
                    "serial_number": serial_number
                };
                return TrialService.getGrantsSerialNumber(queryObj).then(function(res) {
                    var transformedGrantsObjs = [];
                    var unique = [];
                    console.log('res is: ', res);
                    vm.grantsInputs.grantResults = res.tempgrants;
                    /*
                    transformedGrantsObjs = res.tempgrants.map(function (tempgrant) {
                        return tempgrant; //.serial_number;
                    });
                     unique = transformedGrantsObjs.filter(function (g) {
                        return _.findIndex(unique, {serial_number: g.serial_number}) === -1;
                    });

                    console.log('unique: ', unique);

                    vm.grantsInputs.grantResults = transformedGrantsObjs; // unique; //['13467']; // uniquesnums;
                    console.log(vm.grantsInputs.grantResults);
                    */

                });

            }
        }


        vm.collapseAccordion = function() {
            vm.accordions = [false, false, false, false, false, false, false, false, false, false, false, false];
            vm.collapsed = true;
        };

        vm.expandAccordion = function() {
            vm.accordions = [true, true, true, true, true, true, true, true, true, true, true, true];
            vm.collapsed = false;
        };

        vm.reload = function() {
            $state.go($state.$current, null, { reload: true });
        };

        // Delete the associations
        vm.toggleSelection = function (index, type) {
            if (type == 'other_id') {
                if (index < vm.addedOtherIds.length) {
                    vm.addedOtherIds[index]._destroy = !vm.addedOtherIds[index]._destroy;
                }
            } else if (type == 'funding_source') {
                if (index < vm.addedFses.length) {
                    vm.addedFses[index]._destroy = !vm.addedFses[index]._destroy;
                    if (vm.addedFses[index]._destroy) {
                        vm.fsNum--;
                    } else {
                        vm.fsNum++;
                    }
                }
            } else if (type == 'grant') {
                if (index < vm.addedGrants.length) {
                    vm.addedGrants[index]._destroy = !vm.addedGrants[index]._destroy;
                    if (vm.addedGrants[index]._destroy) {
                        vm.grantNum--;
                    } else {
                        vm.grantNum++;
                    }
                }
            } else if (type == 'trial_status') {
                if (index < vm.addedStatuses.length) {
                    vm.addedStatuses[index]._destroy = !vm.addedStatuses[index]._destroy;
                    if (vm.addedStatuses[index]._destroy) {
                        vm.tsNum--;
                    } else {
                        vm.tsNum++;
                    }
                    vm.validateStatus();
                    updateCurrentStatus();
                }
            } else if (type == 'ind_ide') {
                if (index < vm.addedIndIdes.length) {
                    vm.addedIndIdes[index]._destroy = !vm.addedIndIdes[index]._destroy;
                    if (vm.addedIndIdes[index]._destroy) {
                        vm.indIdeNum--;
                    } else {
                        vm.indIdeNum++;
                    }
                }
            } else if (type == 'authority') {
                if (index < vm.addedAuthorities.length) {
                    vm.addedAuthorities[index]._destroy = !vm.addedAuthorities[index]._destroy;
                    if (vm.addedAuthorities[index]._destroy) {
                        vm.toaNum--;
                    } else {
                        vm.toaNum++;
                    }
                }
            } else if (type == 'document') {
                if (index < vm.addedDocuments.length) {
                    vm.addedDocuments[index]._destroy = !vm.addedDocuments[index]._destroy;

                    // Change the doc number accordingly for validation purpose
                    if (vm.addedDocuments[index].document_type === 'Protocol Document') {
                        if (vm.addedDocuments[index]._destroy) {
                            vm.protocolDocNum--;
                        } else {
                            vm.protocolDocNum++;
                        }
                    } else if (vm.addedDocuments[index].document_type === 'IRB Approval') {
                        if (vm.addedDocuments[index]._destroy) {
                            vm.irbApprovalNum--;
                        } else {
                            vm.irbApprovalNum++;
                        }
                    } else if (vm.addedDocuments[index].document_type === 'Informed Consent') {
                        if (vm.addedDocuments[index]._destroy) {
                            vm.informedConsentNum--;
                        } else {
                            vm.informedConsentNum++;
                        }
                    } else if (vm.addedDocuments[index].document_type === 'Change Memo Document') {
                        if (vm.addedDocuments[index]._destroy) {
                            vm.changeMemoNum--;
                        } else {
                            vm.changeMemoNum++;
                        }
                    } else if (vm.addedDocuments[index].document_type === 'Protocol Highlighted Document') {
                        if (vm.addedDocuments[index]._destroy) {
                            vm.protocolHighlightedNum--;
                        } else {
                            vm.protocolHighlightedNum++;
                        }
                    }
                }
            }
        };// toggleSelection

        vm.dateFormat = DateService.getFormats()[1];
        vm.dateOptions = DateService.getDateOptions();
        vm.today = DateService.today();
        vm.openCalendar = function ($event, type) {
            $event.preventDefault();
            $event.stopPropagation();

            if (type == 'status_date') {
                vm.status_date_opened = !vm.status_date_opened;
                if (vm.status_date_opened) {
                    vm.start_date_opened = false;
                    vm.primary_comp_date_opened = false;
                    vm.comp_date_opened = false;
                    vm.amendment_date_opened = false;
                }
            } else if (type == 'start_date') {
                vm.start_date_opened = !vm.start_date_opened;
                if (vm.start_date_opened) {
                    vm.status_date_opened = false;
                    vm.primary_comp_date_opened = false;
                    vm.comp_date_opened = false;
                    vm.amendment_date_opened = false;
                }
            } else if (type == 'primary_comp_date') {
                vm.primary_comp_date_opened = !vm.primary_comp_date_opened;
                if (vm.primary_comp_date_opened) {
                    vm.status_date_opened = false;
                    vm.start_date_opened = false;
                    vm.comp_date_opened = false;
                    vm.amendment_date_opened = false;
                }
            } else if (type == 'comp_date') {
                vm.comp_date_opened = !vm.comp_date_opened;
                if (vm.comp_date_opened) {
                    vm.status_date_opened = false;
                    vm.start_date_opened = false;
                    vm.primary_comp_date_opened = false;
                    vm.amendment_date_opened = false;
                }
            } else if (type == 'amendment_date') {
                vm.amendment_date_opened = !vm.amendment_date_opened;
                if (vm.amendment_date_opened) {
                    vm.status_date_opened = false;
                    vm.start_date_opened = false;
                    vm.primary_comp_date_opened = false;
                    vm.comp_date_opened = false;
                }
            }
        }; //openCalendar

        // Add other ID to a temp array
        vm.addOtherId = function () {
            // Get other ID origin name
            var originCode;
            var originName;
            _.each(vm.protocolIdOriginArr, function (origin) {
                if (origin.id == vm.protocol_id_origin_id) {
                    originCode = origin.code;
                    originName = origin.name;
                }
            });

            // Force NCT ID to be upper case
            if (originCode === 'NCT' || originCode === 'ONCT') {
                vm.protocol_id = vm.protocol_id.toUpperCase();
            }

            var errorMsg = TrialService.checkOtherId(vm.protocol_id_origin_id, originCode, vm.protocol_id, vm.addedOtherIds);

            if (!errorMsg) {
                var newId = {};
                newId.protocol_id_origin_id = vm.protocol_id_origin_id;
                newId.protocol_id_origin_name = originName;
                newId.protocol_id = vm.protocol_id;
                newId._destroy = false;
                vm.addedOtherIds.push(newId);
                vm.protocol_id_origin_id = null;
                vm.protocol_id = null;
                vm.addOtherIdError = '';
                vm.showAddOtherIdError = false;
            } else {
                vm.addOtherIdError = errorMsg;
                vm.showAddOtherIdError = true;
            }
        };

        // Add grant to a temp array
        vm.addGrant = function () {
            if (vm.funding_mechanism && vm.institute_code && vm.serial_number && vm.nci) {
                var newGrant = {};
                newGrant.funding_mechanism = vm.funding_mechanism;
                newGrant.institute_code = vm.institute_code;
                newGrant.serial_number = vm.serial_number.serial_number;
                newGrant.nci = vm.nci;
                newGrant._destroy = false;
                vm.addedGrants.push(newGrant);
                vm.grantNum++;
                vm.funding_mechanism = null;
                vm.institute_code = null;
                vm.serial_number = null;
                vm.nci = null;
                vm.showAddGrantError = false;
                vm.grantsInputs.grantResults= [];
            } else {
                vm.showAddGrantError = true;
            }
        };

        // Add trial status to a temp array
        vm.addStatus = function () {
            if (vm.status_date && vm.trial_status_id && (vm.why_stopped_disabled || (!vm.why_stopped_disabled && vm.why_stopped))) {
                if (notFutureDate(vm.status_date)) {
                    var newStatus = {};
                    newStatus.status_date = DateService.convertISODateToLocaleDateStr(vm.status_date);
                    newStatus.trial_status_id = vm.trial_status_id;
                    // For displaying status name in the table
                    _.each(vm.trialStatusArr, function (status) {
                        if (status.id == vm.trial_status_id) {
                            newStatus.trial_status_name = status.name;
                            newStatus.trial_status_code = status.code;
                        }
                    });
                    newStatus.comment = vm.status_comment;
                    newStatus.why_stopped = vm.why_stopped;
                    newStatus._destroy = false;
                    TrialService.addStatus(vm.addedStatuses, newStatus);
                    vm.tsNum++;
                    vm.status_date = null;
                    vm.trial_status_id = null;
                    vm.status_comment = null;
                    vm.why_stopped = null;
                    vm.showAddStatusError = false;
                    vm.showAddStatusDateError = false;
                    vm.why_stopped_disabled = true;
                    vm.validateStatus();
                    updateCurrentStatus();
                } else {
                    vm.showAddStatusError = false;
                    vm.showAddStatusDateError = true;
                }
            } else {
                vm.showAddStatusError = true;
                vm.showAddStatusDateError = false;
            }
        };

        // Add IND/IDE to a temp array
        vm.addIndIde = function () {
            if (vm.ind_ide_type && vm.ind_ide_number && vm.grantor && vm.holder_type_id) {
                var newIndIde = {};
                newIndIde.ind_ide_type = vm.ind_ide_type;
                newIndIde.ind_ide_number = vm.ind_ide_number;
                newIndIde.grantor = vm.grantor;
                newIndIde.holder_type_id = vm.holder_type_id;
                // For displaying name in the table
                _.each(vm.holderTypeArr, function (holderType) {
                    if (holderType.id == vm.holder_type_id) {
                        newIndIde.holder_type_name = holderType.name;
                    }
                });
                newIndIde.nih_nci = vm.nih_nci;
                newIndIde._destroy = false;
                vm.addedIndIdes.push(newIndIde);
                vm.indIdeNum++;
                vm.ind_ide_type = null;
                vm.ind_ide_number = null;
                vm.grantor = null;
                vm.holder_type_id = null;
                vm.nih_nci = null;
                vm.grantorArr = [];
                vm.nihNciArr = [];
                vm.showAddIndIdeError = false;
            } else {
                vm.showAddIndIdeError = true;
            }
        };

        // Add Oversight Authority to a temp array
        vm.addAuthority = function () {
            var errorMsg = TrialService.checkAuthority(vm.authority_country, vm.authority_org, vm.addedAuthorities);

            if (!errorMsg) {
                var newAuthority = {};
                newAuthority.country = vm.authority_country;
                newAuthority.organization = vm.authority_org;
                newAuthority._destroy = false;
                vm.addedAuthorities.push(newAuthority);
                vm.toaNum++;
                vm.authority_country = null;
                vm.authority_org = null;
                vm.authorityOrgArr = [];
                vm.addAuthorityError = '';
                vm.showAddAuthorityError = false;
            } else {
                vm.addAuthorityError = errorMsg;
                vm.showAddAuthorityError = true;
            }
        };

        // Add Founding Source to a temp array
        $scope.$watch(function() {
            return vm.selectedFsArray.length;
        }, function(newValue, oldValue) {
            if (newValue == oldValue + 1) {
                var newFs = {};
                newFs.organization_id = vm.selectedFsArray[vm.selectedFsArray.length - 1].id;
                newFs.organization_name = vm.selectedFsArray[vm.selectedFsArray.length - 1].name;
                newFs._destroy = false;
                vm.addedFses.push(newFs);
                vm.fsNum++;
            }
        });

        // If the responsible party is PI, the Investigator field changes with PI field
        $scope.$watch(function() {
            return vm.selectedPiArray;
        }, function(newValue, oldValue) {
            var piOption = vm.responsiblePartyArr.filter(findPiOption);
            if (piOption[0].id == vm.curTrial.responsible_party_id) {
                vm.selectedInvArray = vm.selectedPiArray;
                $scope.trial_form.$setDirty();
            }

            if (!angular.equals(newValue, oldValue)) {
                console.log('pi different');
                $scope.trial_form.$setDirty();
            }
        });

        // If the responsible party is Sponsor Investigator, the Investigator Affiliation field changes with Sponsor field
        $scope.$watch(function() {
            return vm.selectedSponsorArray;
        }, function(newValue, oldValue) {
            var siOption = vm.responsiblePartyArr.filter(findSiOption);
            if (siOption[0].id == vm.curTrial.responsible_party_id) {
                vm.selectedIaArray = vm.selectedSponsorArray;
            }

            if (!angular.equals(newValue, oldValue)) {
                console.log('sponsor different');
                $scope.trial_form.$setDirty();
            }
        });

        $scope.$watch(function() {
            return vm.selectedLoArray;
        }, function(newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                console.log('lo different');
                $scope.trial_form.$setDirty();
            }
        });

        $scope.$watch(function() {
            return vm.addedFses;
        }, function(newValue, oldValue) {
            if (!angular.equals(newValue, oldValue)) {
                console.log('fses different');
                $scope.trial_form.$setDirty();
            }
        }, true);

        $scope.$watch(function() {
            return vm.curTrial.intervention_indicator;
        }, function(newValue, oldValue) {
            if (newValue == 'No') {
                vm.curTrial.sec801_indicator = 'No';
            }


        });

        vm.watchOption = function(type) {
            if (type == 'primary_purpose') {
                var otherObj = vm.primaryPurposeArr.filter(findOtherOption);
                if (otherObj[0].id == vm.curTrial.primary_purpose_id) {
                    vm.showPrimaryPurposeOther = true;
                } else {
                    vm.showPrimaryPurposeOther = false;
                    vm.curTrial.primary_purpose_other = '';
                }
            } else if (type == 'secondary_purpose') {
                var otherObj = vm.secondaryPurposeArr.filter(findOtherOption);
                if (otherObj[0].id == vm.curTrial.secondary_purpose_id) {
                    vm.showSecondaryPurposeOther = true;
                } else {
                    vm.showSecondaryPurposeOther = false;
                    vm.curTrial.secondary_purpose_other = '';
                }
            } else if (type == 'responsible_party') {
                var piOption = vm.responsiblePartyArr.filter(findPiOption);
                var siOption = vm.responsiblePartyArr.filter(findSiOption);
                if (piOption[0].id == vm.curTrial.responsible_party_id) {
                    vm.showInvestigator = true;
                    vm.showInvSearchBtn = false;
                    vm.curTrial.investigator_title = 'Principal Investigator';
                    // Copy the value from PI and Sponsor
                    vm.selectedInvArray = vm.selectedPiArray;
                    vm.selectedIaArray = vm.selectedSponsorArray;
                } else if (siOption[0].id == vm.curTrial.responsible_party_id) {
                    vm.showInvestigator = true;
                    vm.showInvSearchBtn = true;
                    vm.curTrial.investigator_title = 'Principal Investigator';
                    // Copy the value from PI and Sponsor
                    vm.selectedInvArray = vm.selectedPiArray;
                    vm.selectedIaArray = vm.selectedSponsorArray;
                } else {
                    vm.showInvestigator = false;
                    vm.curTrial.investigator_title = '';
                    vm.selectedInvArray = [];
                    vm.selectedIaArray = [];
                }
            } else if (type == 'trial_status') {
                var stopOptions = vm.trialStatusArr.filter(findStopOptions);
                for (var i = 0; i < stopOptions.length; i++) {
                    if (stopOptions[i].id == vm.trial_status_id) {
                        vm.why_stopped_disabled = false;
                        break;
                    } else {
                        vm.why_stopped_disabled = true;
                    }
                }
            } else if (type == 'ind_ide_type') {
                vm.grantor = '';
                if (vm.ind_ide_type == 'IND') {
                    vm.grantorArr = ['CDER', 'CBER'];
                } else if (vm.ind_ide_type == 'IDE') {
                    vm.grantorArr = ['CDRH', 'CBER'];
                } else {
                    vm.grantorArr = [];
                }
            } else if (type == 'holder_type') {
                vm.nih_nci = '';
                var nciOption = vm.holderTypeArr.filter(findNciOption);
                var nihOption = vm.holderTypeArr.filter(findNihOption);
                if (nciOption[0].id == vm.holder_type_id) {
                    TrialService.getNci().then(function (response) {
                        vm.nihNciArr = response;
                    }).catch(function (err) {
                        console.log("Error in retrieving NCI Division/Program code.");
                    });
                } else if (nihOption[0].id == vm.holder_type_id) {
                    TrialService.getNih().then(function (response) {
                        vm.nihNciArr = response;
                    }).catch(function (err) {
                        console.log("Error in retrieving NIH Institution code.");
                    });
                } else {
                    vm.nihNciArr = [];
                }
            } else if (type == 'authority_country') {
                vm.authority_org = '';
                vm.authorityOrgArr = TrialService.getAuthorityOrgArr(vm.authority_country);
            }
        };

        // Transfer a number to an array
        vm.getNumArr = function(num) {
            return new Array(num);
        };

        // Add an other document
        vm.addOtherDoc = function() {
            vm.otherDocNum++;
        };

        // Listen to file upload
        $scope.$on(MESSAGES.DOCUMENT_UPLOADED, function() {
            vm.docUploadedCount++;
        });

        // Validate Trials Stautuses
        vm.validateStatus = function() {
            // Remove statuses with _destroy is true
            var noDestroyStatusArr = [];
            for (var i = 0; i < vm.addedStatuses.length; i++) {
                if (!vm.addedStatuses[i]._destroy) {
                    noDestroyStatusArr.push(vm.addedStatuses[i]);
                }
            }

            TrialService.validateStatus({"statuses": noDestroyStatusArr}).then(function(response) {
                vm.statusValidationMsgs = response.validation_msgs;

                // Add empty object to positions where _destroy is true
                for (var i = 0; i < vm.addedStatuses.length; i++) {
                    if (vm.addedStatuses[i]._destroy) {
                        vm.statusValidationMsgs.splice(i, 0, {});
                    }
                }
            }).catch(function(err) {
                console.log("Error in validating trial status: " + err);
            });
        };

        // Scenario #7a in Reg F11
        vm.validateStartDateQual = function() {
            if (vm.currentStatusCode && ['INR', 'APP', 'WIT'].indexOf(vm.currentStatusCode) < 0 && vm.curTrial.start_date_qual === 'Anticipated') {
                return true;
            } else {
                return false;
            }
        };

        // Scenario #8 in Reg F11
        vm.validateStartDateQual2 = function() {
            var startDate = new Date(vm.curTrial.start_date);
            var today = new Date();
            today.setHours(0,0,0,0);
            if ((vm.curTrial.start_date_qual === 'Actual' && startDate.getTime() > today.getTime()) || (vm.curTrial.start_date_qual === 'Anticipated' && startDate.getTime() < today.getTime())) {
                return true;
            } else {
                return false;
            }
        };

        // Scenario #7b in Reg F11
        vm.validatePrimaryCompDateQual = function() {
            if (vm.currentStatusCode && ['ACO', 'COM'].indexOf(vm.currentStatusCode) > -1 && vm.curTrial.primary_comp_date_qual === 'Anticipated') {
                return true;
            } else {
                return false;
            }
        };

        // Scenario #8 in Reg F11
        vm.validatePrimaryCompDateQual2 = function() {
            var primaryCompDate = new Date(vm.curTrial.primary_comp_date);
            var today = new Date();
            today.setHours(0,0,0,0);
            if ((vm.curTrial.primary_comp_date_qual === 'Actual' && primaryCompDate.getTime() > today.getTime()) || (vm.curTrial.primary_comp_date_qual === 'Anticipated' && primaryCompDate.getTime() < today.getTime())) {
                return true;
            } else {
                return false;
            }
        };

        // Scenario #9 in Reg F11
        vm.validatePrimaryCompDate = function() {
            var startDate = new Date(vm.curTrial.start_date);
            var primaryCompDate = new Date(vm.curTrial.primary_comp_date);
            if (startDate.getTime() > primaryCompDate.getTime()) {
                return true;
            } else {
                return false;
            }
        };

        // Scenario #7c in Reg F11
        vm.validateCompDateQual = function() {
            if (vm.currentStatusCode && (['ACO', 'COM'].indexOf(vm.currentStatusCode) < 0 && vm.curTrial.comp_date_qual === 'Actual')
                || (['ACO', 'COM'].indexOf(vm.currentStatusCode) > -1 && vm.curTrial.comp_date_qual === 'Anticipated')) {
                return true;
            } else {
                return false;
            }
        };

        // Scenario #8 in Reg F11
        vm.validateCompDateQual2 = function() {
            var compDate = new Date(vm.curTrial.comp_date);
            var today = new Date();
            today.setHours(0,0,0,0);
            if ((vm.curTrial.comp_date_qual === 'Actual' && compDate.getTime() > today.getTime()) || (vm.curTrial.comp_date_qual === 'Anticipated' && compDate.getTime() < today.getTime())) {
                return true;
            } else {
                return false;
            }
        };

        // Scenario #9 in Reg F11
        vm.validateCompDate = function() {
            var primaryCompDate = new Date(vm.curTrial.primary_comp_date);
            var compDate = new Date(vm.curTrial.comp_date);
            if (primaryCompDate.getTime() > compDate.getTime()) {
                return true;
            } else {
                return false;
            }
        };

        activate();

        /*
            Moving these variable definitions after activate() has been invoked.
            isOpenByDefault value is only important for accordion groups that do not have any writeable fields when edit_type === 'update'
        */
        vm.isOpenByDefault =  vm.curTrial.new || vm.curTrial.edit_type === 'complete' || vm.curTrial.edit_type === 'amend';
        vm.accordions = [true, true, vm.isOpenByDefault, vm.isOpenByDefault, vm.isOpenByDefault, vm.isOpenByDefault, true, true, true, true, vm.isOpenByDefault, true];

        /****************** implementations below ***************/
        function activate() {
            appendNewTrialFlag();
            getExpFlag();
            adjustResearchCategoryArr();
            adjustTrialStatusArr();

            if (vm.curTrial.new) {
                vm.curTrial.pilot = 'No';
                vm.curTrial.grant_question = 'Yes';
                vm.curTrial.ind_ide_question = 'Yes';
                vm.curTrial.intervention_indicator = 'N/A';
                vm.curTrial.sec801_indicator = 'N/A';
                vm.curTrial.data_monitor_indicator = 'N/A';
                populateStudySource();
            } else {
                appendEditType();
                convertDate();
                displayPOs();
                ppFieldChange();
                spFieldChange();
                rpFieldChange();
                appendOtherIds();
                appendFses();
                appendGrants();
                appendStatuses();
                appendIndIdes();
                appendAuthorities();
                appendDocuments();
            }
        }

        /**
         * Append a 'new' key to the vm.curTrial to
         * indicate this is a new trial, not an trial
         * for editing/curating
         *
         */
        function appendNewTrialFlag() {
            if ($state.$current.name.indexOf('add') > -1) {
                vm.curTrial.new = true;  //
                vm.curTrial.edit_type = 'original';
            }
        }

        function getExpFlag() {
            if (vm.curTrial.new) {
                if (vm.studySourceCode == 'EXP') {
                    vm.isExp = true;
                }
            } else {
                if (vm.curTrial.study_source && vm.curTrial.study_source.code == 'EXP') {
                    vm.isExp = true;
                }
            }
        }

        function adjustResearchCategoryArr() {
            for (var i = vm.researchCategoryArr.length - 1; i >= 0; i--) {
                if (vm.researchCategoryArr[i].code == 'EXP') {
                    vm.researchCategoryArr.splice(i, 1);
                }
            }
        }

        function adjustTrialStatusArr() {
            if (!vm.isExp) {
                for (var i = vm.trialStatusArr.length - 1; i >= 0; i--) {
                    if (vm.trialStatusArr[i].code == 'AVA' || vm.trialStatusArr[i].code == 'NLA' || vm.trialStatusArr[i].code == 'TNA' || vm.trialStatusArr[i].code == 'AFM') {
                        vm.trialStatusArr.splice(i, 1);
                    }
                }
            }
        }

        function appendEditType() {
            if (vm.curTrial.actions.indexOf($stateParams.editType) < 0) {
                // Action not allowed
                $state.go('main.trials', null, {reload: true});
            } else {
                vm.curTrial.edit_type = $stateParams.editType;
            }
        }

        function convertDate() {
            vm.curTrial.start_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.start_date);
            vm.curTrial.primary_comp_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.primary_comp_date);
            vm.curTrial.comp_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.comp_date);
            vm.curTrial.amendment_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.amendment_date);
        }

        // Populate Study Source field based on the param studySourceCode
        function populateStudySource() {
            _.each(vm.studySourceArr, function (studySource) {
                if (studySource.code == vm.studySourceCode) {
                    vm.curTrial.study_source_id = studySource.id;
                }
            });
        }

        function displayPOs() {
            if (vm.curTrial.lead_org_id) {
                $timeout( function(){ vm.selectedLoArray.push(vm.curTrial.lead_org); }, 1500);
            }

            if (vm.curTrial.pi_id) {
                $timeout( function(){ vm.selectedPiArray.push(vm.curTrial.pi); }, 1500);
            }

            if (vm.curTrial.sponsor_id) {
                $timeout( function(){ vm.selectedSponsorArray.push(vm.curTrial.sponsor); }, 1500);
            }

            if (vm.curTrial.investigator_id) {
                $timeout( function(){ vm.selectedInvArray.push(vm.curTrial.investigator); }, 1500);
            }

            if (vm.curTrial.investigator_aff_id) {
                $timeout( function(){ vm.selectedIaArray.push(vm.curTrial.investigator_aff); }, 1500);
            }
        }

        function ppFieldChange() {
            var otherObj = vm.primaryPurposeArr.filter(findOtherOption);
            if (otherObj[0].id == vm.curTrial.primary_purpose_id) {
                vm.showPrimaryPurposeOther = true;
            }
        }

        function spFieldChange() {
            var otherObj = vm.secondaryPurposeArr.filter(findOtherOption);
            if (otherObj[0].id == vm.curTrial.secondary_purpose_id) {
                vm.showSecondaryPurposeOther = true;
            }
        }

        function rpFieldChange() {
            var piOption = vm.responsiblePartyArr.filter(findPiOption);
            var siOption = vm.responsiblePartyArr.filter(findSiOption);
            if (piOption[0].id == vm.curTrial.responsible_party_id) {
                vm.showInvestigator = true;
                vm.showInvSearchBtn = false;
            } else if (siOption[0].id == vm.curTrial.responsible_party_id) {
                vm.showInvestigator = true;
            }
        }

        // Append associations for existing Trial
        function appendOtherIds() {
            for (var i = 0; i < vm.curTrial.other_ids.length; i++) {
                var otherId = {};
                otherId.id = vm.curTrial.other_ids[i].id;
                otherId.protocol_id_origin_id = vm.curTrial.other_ids[i].protocol_id_origin_id;
                // For displaying other ID origin name in the table
                _.each(vm.protocolIdOriginArr, function (origin) {
                    if (origin.id == vm.curTrial.other_ids[i].protocol_id_origin_id) {
                        otherId.protocol_id_origin_name = origin.name;
                    }
                });
                otherId.protocol_id = vm.curTrial.other_ids[i].protocol_id;
                otherId._destroy = false;
                vm.addedOtherIds.push(otherId);
            }
        }

        function appendFses() {
            for (var i = 0; i < vm.curTrial.trial_funding_sources.length; i++) {
                var tfs = {};
                tfs.id = vm.curTrial.trial_funding_sources[i].id;
                tfs.organization_id = vm.curTrial.trial_funding_sources[i].organization_id;
                _.each(vm.curTrial.funding_sources, function (fs) {
                    if (tfs.organization_id == fs.id) {
                        tfs.organization_name = fs.name;
                    }
                });
                tfs._destroy = false;
                vm.addedFses.push(tfs);
                vm.fsNum++;
            }
        }

        function appendGrants() {
            for (var i = 0; i < vm.curTrial.grants.length; i++) {
                var grant = {};
                grant.id = vm.curTrial.grants[i].id;
                grant.funding_mechanism = vm.curTrial.grants[i].funding_mechanism;
                grant.institute_code = vm.curTrial.grants[i].institute_code;
                grant.serial_number = vm.curTrial.grants[i].serial_number;
                grant.nci = vm.curTrial.grants[i].nci;
                grant._destroy = false;
                vm.addedGrants.push(grant);
                vm.grantNum++;
            }
        }

        function appendStatuses() {
            for (var i = 0; i < vm.curTrial.trial_status_wrappers.length; i++) {
                var statusWrapper = {};
                statusWrapper.id = vm.curTrial.trial_status_wrappers[i].id;
                statusWrapper.status_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.trial_status_wrappers[i].status_date);
                statusWrapper.trial_status_id = vm.curTrial.trial_status_wrappers[i].trial_status_id;
                // For displaying status name in the table
                _.each(vm.trialStatusArr, function (status) {
                    if (status.id == vm.curTrial.trial_status_wrappers[i].trial_status_id) {
                        statusWrapper.trial_status_name = status.name;
                        statusWrapper.trial_status_code = status.code;
                    }
                });
                statusWrapper.comment = vm.curTrial.trial_status_wrappers[i].comment;
                statusWrapper.why_stopped = vm.curTrial.trial_status_wrappers[i].why_stopped;
                statusWrapper._destroy = false;
                TrialService.addStatus(vm.addedStatuses, statusWrapper);
                vm.tsNum++;
            }
            vm.validateStatus();
            updateCurrentStatus();
        }

        function appendIndIdes() {
            for (var i = 0; i < vm.curTrial.ind_ides.length; i++) {
                var indIde = {};
                indIde.id = vm.curTrial.ind_ides[i].id;
                indIde.ind_ide_type = vm.curTrial.ind_ides[i].ind_ide_type;
                indIde.ind_ide_number = vm.curTrial.ind_ides[i].ind_ide_number;
                indIde.grantor = vm.curTrial.ind_ides[i].grantor;
                indIde.holder_type_id = vm.curTrial.ind_ides[i].holder_type_id;
                // For displaying name in the table
                _.each(vm.holderTypeArr, function (holderType) {
                    if (holderType.id == vm.curTrial.ind_ides[i].holder_type_id) {
                        indIde.holder_type_name = holderType.name;
                    }
                });
                indIde.nih_nci = vm.curTrial.ind_ides[i].nih_nci;
                indIde._destroy = false;
                vm.addedIndIdes.push(indIde);
                vm.indIdeNum++;
            }
        }

        function appendAuthorities() {
            for (var i = 0; i < vm.curTrial.oversight_authorities.length; i++) {
                var authority = {};
                authority.id = vm.curTrial.oversight_authorities[i].id;
                authority.country = vm.curTrial.oversight_authorities[i].country;
                authority.organization = vm.curTrial.oversight_authorities[i].organization;
                authority._destroy = false;
                vm.addedAuthorities.push(authority);
                vm.toaNum++;
            }
        }

        function appendDocuments() {
            for (var i = 0; i < vm.curTrial.trial_documents.length; i++) {
                var document = {};
                document.id = vm.curTrial.trial_documents[i].id;
                document.file_name = vm.curTrial.trial_documents[i].file_name;
                document.document_type = vm.curTrial.trial_documents[i].document_type;
                document.document_subtype = vm.curTrial.trial_documents[i].document_subtype;
                document.is_latest = vm.curTrial.trial_documents[i].is_latest;
                document.status = vm.curTrial.trial_documents[i].status;
                document._destroy = vm.curTrial.trial_documents[i]._destroy;
                vm.addedDocuments.push(document);

                // Keep track of doc number for validation purpose
                if (vm.curTrial.trial_documents[i].document_type === 'Protocol Document' && vm.curTrial.trial_documents[i].status === 'active') {
                    vm.protocolDocNum++;
                } else if (vm.curTrial.trial_documents[i].document_type === 'IRB Approval' && vm.curTrial.trial_documents[i].status === 'active') {
                    vm.irbApprovalNum++;
                }  else if (vm.curTrial.trial_documents[i].document_type === 'Informed Consent' && vm.curTrial.trial_documents[i].status === 'active') {
                    vm.informedConsentNum++;
                }  else if (vm.curTrial.trial_documents[i].document_type === 'Change Memo Document' && vm.curTrial.trial_documents[i].status === 'active') {
                    vm.changeMemoNum++;
                }  else if (vm.curTrial.trial_documents[i].document_type === 'Protocol Highlighted Document' && vm.curTrial.trial_documents[i].status === 'active') {
                    vm.protocolHighlightedNum++;
                }
            }
        }

        // Return true if the option is "Other"
        function findOtherOption(option) {
            if (option.code == 'OTH') {
                return true;
            } else {
                return false;
            }
        }

        // Return true if the option is "Principal Investigator"
        function findPiOption(option) {
            if (option.code == 'PI') {
                return true;
            } else {
                return false;
            }
        }

        // Return true if the option is "Sponsor Investigator"
        function findSiOption(option) {
            if (option.code == 'SI') {
                return true;
            } else {
                return false;
            }
        }

        function findStopOptions(option) {
            if (option.code == 'TCL' || option.code == 'TCA' || option.code == 'ACO' || option.code == 'WIT') {
                return true;
            } else {
                return false;
            }
        }

        function findNciOption(option) {
            if (option.code == 'NCI') {
                return true;
            } else {
                return false;
            }
        }

        function findNihOption(option) {
            if (option.code == 'NIH') {
                return true;
            } else {
                return false;
            }
        }

        // Return the number of documents to be uploaded
        function uploadDocuments(trialId) {
            var docCount = 0;
            var latestDocId = null;

            if (vm.protocol_document) {
                docCount++;
                // Inactivate the document only in draft stage
                latestDocId = vm.curTrial.edit_type === 'complete' ? getLatestDocId('Protocol Document') : null;
                TrialService.uploadDocument(trialId, 'Protocol Document', '', vm.protocol_document, latestDocId);
            }
            if (vm.irb_approval) {
                docCount++;
                latestDocId = vm.curTrial.edit_type === 'complete' ? getLatestDocId('IRB Approval') : null;
                TrialService.uploadDocument(trialId, 'IRB Approval', '', vm.irb_approval, latestDocId);
            }
            if (vm.participating_sites) {
                docCount++;
                latestDocId = vm.curTrial.edit_type === 'complete' ? getLatestDocId('List of Participating Sites') : null;
                TrialService.uploadDocument(trialId, 'List of Participating Sites', '', vm.participating_sites, latestDocId);
            }
            if (vm.informed_consent) {
                docCount++;
                latestDocId = vm.curTrial.edit_type === 'complete' ? getLatestDocId('Informed Consent') : null;
                TrialService.uploadDocument(trialId, 'Informed Consent', '', vm.informed_consent, latestDocId);
            }
            for (var key in vm.other_documents) {
                docCount++;
                var subtype = (vm.other_document_subtypes && vm.other_document_subtypes[key]) ? vm.other_document_subtypes[key] : '';
                TrialService.uploadDocument(trialId, 'Other Document', subtype, vm.other_documents[key], null);
            }
            if (vm.change_memo) {
                docCount++;
                latestDocId = vm.curTrial.edit_type === 'complete' ? getLatestDocId('Change Memo Document') : null;
                TrialService.uploadDocument(trialId, 'Change Memo Document', '', vm.change_memo, latestDocId);
            }
            if (vm.protocol_highlighted) {
                docCount++;
                latestDocId = vm.curTrial.edit_type === 'complete' ? getLatestDocId('Protocol Highlighted Document') : null;
                TrialService.uploadDocument(trialId, 'Protocol Highlighted Document', '', vm.protocol_highlighted, latestDocId);
            }

            return docCount;
        }

        function getLatestDocId(docType) {
            var latestDocId = null;

            for (var i = 0; i < vm.addedDocuments.length; i++) {
                if (vm.addedDocuments[i].document_type === docType && vm.addedDocuments[i].is_latest) {
                    latestDocId = vm.addedDocuments[i].id;
                }
            }

            return latestDocId;
        }

        // Update the current status code and name
        function updateCurrentStatus() {
            for (var i = vm.addedStatuses.length - 1; i >= 0; i--) {
                if (!vm.addedStatuses[i]._destroy) {
                    vm.currentStatusCode = vm.addedStatuses[i].trial_status_code;
                    vm.currentStatusName = vm.addedStatuses[i].trial_status_name;
                    return;
                }
            }

            vm.currentStatusCode = null;
            vm.currentStatusName = null;
            return;
        }

        // Return true if the date is today or in the past
        function notFutureDate(date) {
            var dateObj = new Date(date);
            var today = new Date();
            today.setHours(0,0,0,0);
            if (dateObj.getTime() <= today.getTime()) {
                return true;
            } else {
                return false;
            }
        }
    }
})();
