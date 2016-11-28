/**
 * Created by wus4 on 8/14/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.module.dataservices')
        .factory('TrialService', TrialService);

    TrialService.$inject = ['URL_CONFIGS', 'MESSAGES', '$log', '_', 'Common', '$rootScope',
        'PromiseTimeoutService', 'Upload', 'HOST', 'DateService', '$http', 'toastr', 'PromiseService'];

    function TrialService(URL_CONFIGS, MESSAGES, $log, _, Common, $rootScope,
            PromiseTimeoutService, Upload, HOST, DateService, $http, toastr, PromiseService) {

        var initTrialSearchParams = {
            //for pagination and sorting
            sort: '',
            order: '',
            rows: 20,
            start: 1
        }; //initial Trial Search Parameters


        var services = {
            getAllTrials: getAllTrials,
            getTrialById: getTrialById,
            upsertTrial: upsertTrial,
            searchTrials: searchTrials,
            searchTrialsPa: searchTrialsPa,
            getInitialTrialSearchParams: getInitialTrialSearchParams,
            getStudySources: getStudySources,
            getProtocolIdOrigins: getProtocolIdOrigins,
            getPhases: getPhases,
            getResearchCategories: getResearchCategories,
            getPrimaryPurposes: getPrimaryPurposes,
            getSecondaryPurposes: getSecondaryPurposes,
            getAccrualDiseaseTerms: getAccrualDiseaseTerms,
            getResponsibleParties: getResponsibleParties,
            getFundingMechanisms: getFundingMechanisms,
            getInstituteCodes: getInstituteCodes,
            getNci: getNci,
            getTrialStatuses: getTrialStatuses,
            getSrStatuses: getSrStatuses,
            getTrialStatusById: getTrialStatusById,
            getMilestones: getMilestones,
            getOnholdReasons: getOnholdReasons,
            getHolderTypes: getHolderTypes,
            getNih: getNih,
            getAcceptedFileTypesForRegistry: getAcceptedFileTypesForRegistry,
            getAuthorityOrgArr: getAuthorityOrgArr,
            checkOtherId: checkOtherId,
            checkAuthority: checkAuthority,
            addStatus: addStatus,
            validateStatus: validateStatus,
            validateMilestone: validateMilestone,
            validateSrStatus: validateSrStatus,
            searchClinicalTrialsGov: searchClinicalTrialsGov,
            importClinicalTrialsGov: importClinicalTrialsGov,
            uploadDocument: uploadDocument,
            deleteTrial: deleteTrial,
            getGrantsSerialNumber: getGrantsSerialNumber,
            upsertParticipatingSite: upsertParticipatingSite,
            getParticipatingSiteById: getParticipatingSiteById,
            deleteParticipatingSite: deleteParticipatingSite,
            upsertOutcomeMeasure: upsertOutcomeMeasure,
            deleteOutcomeMeasure: deleteOutcomeMeasure,
            getOutcomeMeasureTypes:getOutcomeMeasureTypes,
            getAssayTypes:getAssayTypes,
            getEvaluationTypes:getEvaluationTypes,
            getSpecimenTypes:getSpecimenTypes,
            getBiomarkerPurposes:getBiomarkerPurposes,
            getBiomarkerUses:getBiomarkerUses,
            createTransferTrialsOwnership: createTransferTrialsOwnership,
            getCountryList: getCountryList

        };

        return services;



        /*********************** implementations *****************/

        function getAllTrials() {
            return PromiseTimeoutService.getData(URL_CONFIGS.TRIAL_LIST);
        } //getAllTrials

        function getTrialById(trialId) {
            return PromiseTimeoutService.getData(URL_CONFIGS.A_TRIAL + trialId + '.json');
        } //getTrialById

        /**
         * Update or insert a new trial
         *
         * @param trialObj
         * @returns {*}
         */
        function upsertTrial(trialObj) {
            if (trialObj.new) {
                //create a new trial
                $log.info('creating a trial: ' + JSON.stringify(trialObj));
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.TRIAL_LIST, trialObj);
            }

            //update an existing trial
            var configObj = {}; //empty config
            $log.info('updating a trial: ' + JSON.stringify(trialObj));
            return PromiseTimeoutService.updateObj(URL_CONFIGS.A_TRIAL + trialObj.id + '.json', trialObj, configObj);
        } //upsertTrial

        /**
         *
         * @param searchParams, JSON object whose keys can include:
         * name, po_id, source_id, source_status, family_name, address, address2, city, state_province, country,
         * postal_code, and email
         *
         * @returns Array of JSON objects
         */
        function searchTrials(searchParams) {
            if (!!searchParams) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_TRIAL, searchParams);
            }
        } //searchTrials

        function searchTrialsPa(searchParams) {
            if (!!searchParams) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_TRIAL_PA, searchParams);
            }
        } //searchTrials

        function getGrantsSerialNumber(searchParams) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.GET_GRANTS_SERIALNUMBER, searchParams);
        } // getGrantsSerialNumber
        /**
         * get initial paramater object for trials search
         * @return initTrialSearchParams
         */
        function getInitialTrialSearchParams() {
            return initTrialSearchParams;
        } //getInitialTrialSearchParams

        /**
         * A helper function:
         * Use $rootScope to broadcast messages
         * @param msgCode
         * @param msgContent
         */
        function broadcastMsg(msgCode, msgContent) {
            $rootScope.$broadcast(msgCode, {content: msgContent});
        } //broadcastMsg

        function getStudySources() {
            return PromiseTimeoutService.getData(URL_CONFIGS.STUDY_SOURCES);
        }

        function getProtocolIdOrigins() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PROTOCOL_ID_ORIGINS);
        }

        function getPhases() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PHASES);
        }

        function getResearchCategories() {
            return PromiseTimeoutService.getData(URL_CONFIGS.RESEARCH_CATEGORIES);
        }

        function getPrimaryPurposes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PRIMARY_PURPOSES);
        }

        function getSecondaryPurposes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.SECONDARY_PURPOSES);
        }

        function getAccrualDiseaseTerms() {
            return PromiseTimeoutService.getData(URL_CONFIGS.ACCRUAL_DISEASE_TERMS);
        }

        function getResponsibleParties() {
            return PromiseTimeoutService.getData(URL_CONFIGS.RESPONSIBLE_PARTIES);
        }

        function getFundingMechanisms() {
            return PromiseTimeoutService.getData(URL_CONFIGS.FUNDING_MECHANISMS);
        }

        function getInstituteCodes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.INSTITUTE_CODES);
        }

        function getNci() {
            return PromiseTimeoutService.getData(URL_CONFIGS.NCI);
        }

        function getTrialStatuses() {
            return PromiseTimeoutService.getData(URL_CONFIGS.TRIAL_STATUSES);
        }

        function getSrStatuses() {
            return PromiseTimeoutService.getData(URL_CONFIGS.SITE_RECRUITMENT_STATUSES);
        }

        function getTrialStatusById(trialStatusId) {
            //insert the trialStatusId into the url
            var url = URL_CONFIGS.TRIALS.STATUS_WITH_ID.replace(/\s*\{.*?\}\s*/g, trialStatusId);
            return PromiseTimeoutService.getData(url);
        }

        function getParticipatingSiteById(participatingSiteId) {
            console.log('calling getParticipatingSiteById in TrialService');
            //return PromiseService.getData(URL_CONFIGS.AN_TRIAL + trialId + '.json');
            return PromiseTimeoutService.getData(URL_CONFIGS.A_PARTICIPATING_SITE + participatingSiteId + '.json');
        } //getTrialById


       // function getParticipatingSiteById(participatingSiteId) {
            //insert the participatingSiteId into the url
       //     var url = URL_CONFIGS.TRIALS.PARTICIPATING_SITE_WITH_ID.replace(/\s*\{.*?\}\s*/g, participatingSiteId);
      //      return PromiseTimeoutService.getData(url);
      //  }

        /**
         * Update or insert a Participating Site Records
         *
         * @param participatingSiteObj
         * @returns {*}
         */
        function upsertParticipatingSite(participatingSiteObj) {
            if (participatingSiteObj.new) {
                //create a new trial
                $log.info('creating a participating site: ' + JSON.stringify(participatingSiteObj));
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.PARTICIPATING_SITE_LIST, participatingSiteObj);
            }

            //update an Participating Site
            var configObj = {}; //empty config
            console.log('updating a participating site: ' + JSON.stringify(participatingSiteObj));
            $log.info('updating a participating site: ' + JSON.stringify(participatingSiteObj));
            return PromiseTimeoutService.updateObj(URL_CONFIGS.A_PARTICIPATING_SITE + participatingSiteObj.id + '.json', participatingSiteObj, configObj);
        } //upsertParticipatingSite


        /**
         * Update or insert a Outcome Measure Record
         *
         * @param outcomeMeasureObj
         * @returns {*}
         */
        function upsertOutcomeMeasure(outcomeMeasureObj) {
            if (outcomeMeasureObj.new) {
                //create a new trial
                $log.info('creating a outcome measure: ' + JSON.stringify(outcomeMeasureObj));
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.OUTCOME_MEASURE_LIST, outcomeMeasureObj);
            }

            //update an Participating Site
            var configObj = {}; //empty config
            console.log('updating a outcome measure: ' + JSON.stringify(outcomeMeasureObj));
            $log.info('updating a outcome measure: ' + JSON.stringify(outcomeMeasureObj));
            return PromiseTimeoutService.updateObj(URL_CONFIGS.A_OUTCOME_MEASURE + outcomeMeasureObj.id + '.json', outcomeMeasureObj, configObj);
        } //upsertOutcomeMeasure


        function getMilestones() {
            return PromiseTimeoutService.getData(URL_CONFIGS.MILESTONES);
        }

        function getOnholdReasons() {
            return PromiseTimeoutService.getData(URL_CONFIGS.ONHOLD_REASONS);
        }

        function getHolderTypes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.HOLDER_TYPES);
        }

        function getNih() {
            return PromiseTimeoutService.getData(URL_CONFIGS.NIH);
        }

        function getAcceptedFileTypesForRegistry() {
            return PromiseTimeoutService.getData(URL_CONFIGS.ACCEPTED_FILE_TYPES_REG);
        }

        function getAuthorityOrgArr(country) {
            return PromiseTimeoutService.getData(URL_CONFIGS.AUTHORITIES_FOR_A_COUNTRY + '?country=' + country);
        }

        function getCountryList() {
            return PromiseService.getData(URL_CONFIGS.COUNTRIES_LIST);
        }

        // Validation logic for Other Trial Identifier
        function checkOtherId(protocolIdOriginId, protocolIdOriginCode, protocolId, addedOtherIds) {
            var errorMsg = '';

            if (!protocolIdOriginId || !protocolId) {
                errorMsg = 'Both Protocol ID Origin and a Protocol ID are Required';
                return errorMsg;
            }

            // var idObj = _.findWhere(addedOtherIds, {'protocol_id': protocolId});
            var idObj = _.findWhere(addedOtherIds, {'protocol_id_origin_id': parseFloat(protocolIdOriginId)});
            if (!angular.isDefined(idObj)) {
                idObj = _.findWhere(addedOtherIds, {'protocol_id_origin_id': protocolIdOriginId}); // protocolIdOriginId is type string
            }
            var codeArr = ['OTH', 'ONCT', 'DNCI']; // these code allow duplicates
            if (angular.isDefined(idObj) && !_.contains(codeArr, protocolIdOriginCode)) {
                errorMsg = (idObj.protocol_id_origin_name || idObj.identifierName) + ' already exists';
                return errorMsg;
            }
            /*
            else if (angular.isDefined(idObj) && idObj.protocol_id === protocolId &&
                _.contains(codeArr, protocolIdOriginCode)) {

                errorMsg = (idObj.protocol_id_origin_name || idObj.identifierName) + ': ' + idObj.protocol_id + ' already exists';
                return errorMsg;
            }
            */
            // Validate the format of ClinicalTrials.gov Identifier: NCT00000000
            if ((protocolIdOriginCode === 'NCT' || protocolIdOriginCode === 'ONCT') && !/^NCT\d{8}$/.test(protocolId)) {
                errorMsg = 'The format must be "NCT" followed by 8 numeric characters';
                return errorMsg;
            }
            if (protocolIdOriginCode === 'ONCT' && _.findIndex(addedOtherIds, {'protocol_id': protocolId, 'protocol_id_origin_id': protocolIdOriginId}) > -1) {
                errorMsg = 'Obsolete ClinicalTrials.gov Identifier must be unique';
                return errorMsg;
            }

            if (protocolIdOriginCode === 'OTH' && _.findIndex(addedOtherIds, {'protocol_id': protocolId, 'protocol_id_origin_id': protocolIdOriginId}) > -1) {
                errorMsg = 'Other Identifier must be unique';
                return errorMsg;
            }

            if (protocolIdOriginCode === 'DNCI' && !/^NCI-\d{4}-\d{5}$/.test(protocolId)) {
                errorMsg = 'Duplicate NCI Identifier must be in this format: "NCI-yyyy-nnnnn"';
                return errorMsg;
            }

            if (protocolIdOriginCode === 'DNCI' && _.findIndex(addedOtherIds, {'protocol_id': protocolId}) > -1) {
                errorMsg = 'Duplicate NCI Identifier must be unique';
                return errorMsg;
            }

            return errorMsg;
        }

        // Validation logic for Trial Oversight Authority Country/Organization
        function checkAuthority(authorityCountry, authorityOrg, addedAuthorities) {
            var errorMsg = '';

            if (!authorityCountry || !authorityOrg) {
                errorMsg = 'Country and Organization is Required';
                return errorMsg;
            }
            for (var i = 0; i < addedAuthorities.length; i++) {
                if (addedAuthorities[i].country === authorityCountry && addedAuthorities[i].organization === authorityOrg) {
                    errorMsg = addedAuthorities[i].country + ' ' + addedAuthorities[i].organization + ' already exists';
                    return errorMsg;
                }
            }

            return errorMsg;
        }

        /**
         * Upload a file associated with a given trial
         *
         * @param trialId
         * @param documentType
         * @param file
         */
        function uploadDocument(trialId, documentType, documentSubtype, file, replacedDocId) {
            Upload.upload({
                url: HOST + URL_CONFIGS.TRIAL_DOCUMENT_LIST,
                method: 'POST',
                data: {
                    'trial_document[document_type]': documentType,
                    'trial_document[document_subtype]': documentSubtype,
                    'trial_document[trial_id]': trialId,
                    'trial_document[file]': file,
                    'replaced_doc_id': replacedDocId ? replacedDocId : ''
                }
                //file: file,
                //fileFormDataName: 'trial_document[file]'
            //}).progress(function (evt) {
                //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //$log.info('progress: ' + progressPercentage + '% ' + evt.config._file.name);
            }).success(function (data, status, headers, config) {
                Common.broadcastMsg(MESSAGES.DOCUMENT_UPLOADED);
                $log.info('file ' + config._file.name + ' uploaded.');
            }).error(function (data, status, headers, config) {
                $log.info('file ' + config._file.name + ' upload error. error status: ' + status);
            });
        }

        /**
         * Insert newStatus into statusArr ordered by status_date
         *
         * @param statusArr
         * @param newStatus
         */
        function addStatus(statusArr, newStatus) {
            var idx = statusArr.length;

            for (var i = 0; i < statusArr.length; i++) {
                var newDateStr = DateService.convertLocaleDateToISODateStr(newStatus.status_date);
                var newDate = new Date(newDateStr);
                var arrayDateStr = DateService.convertLocaleDateToISODateStr(statusArr[i].status_date);
                var arrayDate = new Date(arrayDateStr);

                if (newDate.getTime() < arrayDate.getTime()) {
                    idx = i;
                    break;
                }
            }
            statusArr.splice(idx, 0, newStatus);
        }

        /**
         * Get validation warnings/errors for trial statuses
         *
         * @param statuses
         */
        function validateStatus(statuses) {
            if (!!statuses) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.VALIDATE_TRIAL_STATUS, statuses);
            }
        }

        /**
         * Get validation errors for milestones
         *
         * @param params
         */
        function validateMilestone (params) {
            if (!!params) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.VALIDATE_MILESTONE, params);
            }
        }

        /**
         * Get validation warnings/errors for site recruitment statuses
         *
         * @param statuses
         */
        function validateSrStatus(statuses) {
            if (!!statuses) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.VALIDATE_SR_STATUS, statuses);
            }
        }

        /**
         * Search ClinicalTrials.gov using NCT ID
         *
         * @param nctId
         * @returns {*}
         */
        function searchClinicalTrialsGov(nctId) {
            if (!!nctId) {
                return PromiseTimeoutService.getData(URL_CONFIGS.SEARCH_CLINICAL_TRIALS_GOV + '?nct_id=' + nctId);
            }
        }

        /**
         * Import from ClinicalTrials.gov using NCT ID
         *
         * @param nctId
         */
        function importClinicalTrialsGov(nctId) {
            if (!!nctId) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.IMPORT_CLINICAL_TRIALS_GOV, {"nct_id": nctId});
            }
        }

        /**
         * delete an trial with the given trialId
         *
         * @param trialId
         * @returns {*}
         */
        function deleteTrial(trialId) {
            return PromiseTimeoutService.deleteObjFromBackend(URL_CONFIGS.A_TRIAL + trialId + '.json');
        }
        /**
         * delete an trial with the given trialId
         *
         * @param trialId
         * @returns {*}
         */
        function deleteParticipatingSite(psId) {
            return PromiseTimeoutService.deleteObjFromBackend(URL_CONFIGS.A_PARTICIPATING_SITE + psId + '.json');
        }

        /**
         * delete an trial with the given trialId
         *
         * @param trialId
         * @returns {*}
         */
        function deleteOutcomeMeasure(psId) {
            return PromiseTimeoutService.deleteObjFromBackend(URL_CONFIGS.A_OUTCOME_MEASURE + psId + '.json');
        }

        /**
         * retrieve out come measures types from backend service
         * @return {promise}
         */
        function getOutcomeMeasureTypes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.OUTCOME_MEASURE_TYPES);
        } //getSourceStatuses

        function getAssayTypes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.ASSAY_TYPES);
        }

        function getEvaluationTypes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.EVALUATION_TYPES);
        }

        function getSpecimenTypes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.SPECIMEN_TYPES);
        }
        function getBiomarkerPurposes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.BIOMARKER_PURPOSES);
        }
        function getBiomarkerUses() {
            return PromiseTimeoutService.getData(URL_CONFIGS.BIOMARKER_USES);
        }


        function createTransferTrialsOwnership(controller, userIdArr) {
            searchTrials({
                'organization_id': (controller.userDetails && controller.userDetails.organization ? controller.userDetails.organization.id: false) || controller.organization_id,
                'family_id': (controller.userDetails && controller.userDetails.org_families[0] ? controller.userDetails.org_families[0].id: false) || controller.family_id,
                'protocol_id':'*',
                'searchType': 'All Trials',
                'trial_ownership': true,
                'no_nih_nci_prog': true
            }).then(function (data) {
                var status = data.server_response.status;

                if (status >= 200 && status <= 210) {
                    if (controller.showAddTrialsModal === false) {
                        controller.showAddTrialsModal = true;
                    }
                    controller.trialOptions = {
                        title: '',
                        type: 'trials',
                        filterPlaceHolder: 'Start typing to filter the trials below.',
                        labelAll: 'Unselected Trials',
                        labelSelected: 'Selected Trials',
                        helpMessage: ' Click on trial details to transfer trials between selected and unselected.',
                        orderProperty: 'name',
                        resetItems: [],
                        items: [],
                        selectedItems: [],
                        openModal: controller.showAddTrialsModal,
                        showSave: controller.showAddTrialsModal,
                        confirmMessage: controller.userDetails ? 'You have selected to add ownership of the Selected Trial(s) above, to ' + controller.userDetails.last_name + ', '
                                    + controller.userDetails.first_name + ' (' + controller.userDetails.username + ')' + '.':'',
                        close: function () {
                            controller.showAddTrialsModal = false;
                        },
                        reset: function () {
                            controller.trialOptions.searchTerm = '';
                            controller.trialOptions.items = angular.copy(controller.trialOptions.resetItems);
                            controller.trialOptions.selectedItems = [];
                        },
                        save: function () {
                            controller.showAddTrialsModal = false;
                            var searchParams = {
                                user_ids: [controller.userDetails.id],
                                trial_ids: _.chain(controller.trialOptions.selectedItems).pluck('id').value()
                            };

                            PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.USER_TRIALS_ADD, searchParams).then(function (data) {
                                var postStatus = data.server_response.status;
                                if (postStatus >= 200 && postStatus <= 210) {
                                    if(data.results.complete) {
                                        toastr.success('Trial Ownership Created', 'Success!');
                                        controller.getUserTrials();
                                    }
                                }
                            });
                        }
                    };
                    _.each(data.trials, function (trial) {
                        if(trial.id ) {
                            controller.trialOptions.items.push({
                                'id': trial.id,
                                'col1': trial.nci_id,
                                'col2': trial.lead_protocol_id,
                                'col6': trial.lead_org,
                                'col7': trial.official_title
                            });
                        }
                    });
                    controller.trialOptions.resetItems = angular.copy(controller.trialOptions.items);
                }
            });
        }
    }
})();
