/**
 * Created by wus4 on 8/14/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.pa')
        .factory('PATrialService', PATrialService);

    PATrialService.$inject = ['URL_CONFIGS', 'MESSAGES', '$log', '_', 'Common', 'Upload', 'TrialService',
            '$rootScope', 'PromiseTimeoutService', 'DateService', 'HOST', 'LocalCacheService', 'uiGridConstants', 'uiGridExporterConstants', 'uiGridExporterService'];

    function PATrialService(URL_CONFIGS, MESSAGES, $log, _, Common, Upload, TrialService,
            $rootScope, PromiseTimeoutService, DateService, HOST, LocalCacheService, uiGridConstants, uiGridExporterConstants, uiGridExporterService) {

        var curTrial = {};
        var initTrialSearchParams = {
            //for pagination and sorting
            sort: '',
            order: '',
            rows: 10,
            start: 1,
            // protocol_id: '',
            // protocol_origin_type_codes: [],
        }; //initial Trial Search Parameters

        var gridOptions = {
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            paginationPageSizes: [20, 50, 100],
            paginationPageSize: 20,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: false,
            enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
            exporterCsvFilename: 'trials.csv',
            exporterMenuAllData: true,
            exporterMenuPdf: false,
            exporterMenuCsv: false,
            gridMenuCustomItems: [{
                title: 'Export All Data As CSV',
                order: 100,
                action: function ($event){
                    this.grid.api.exporter.csvExport(uiGridExporterConstants.ALL, uiGridExporterConstants.ALL);
                }
            }],
            columnDefs: [
                {name: 'nci_id', displayName: 'NCI ID', enableSorting: true, minWidth: '150', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.pa.trialOverview.trialIdentification({trialId : row.entity.id })"> {{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'lead_protocol_id', displayName: 'Lead Protocol ID', enableSorting: true, minWidth: '170', width: '3%', sort: { direction: 'asc', priority: 1},
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.pa.trialOverview.trialIdentification({trialId : row.entity.id })"> {{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'official_title', enableSorting: true, minWidth: '150', width: '8%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'phase', enableSorting: true, minWidth: '75', width: '6%'},
                {name: 'purpose', enableSorting: true, minWidth: '100', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'},
                {name: 'pilot', enableSorting: true, minWidth: '75', width: '6%'},
                {name: 'pi', displayName: 'Principal Investigator', enableSorting: true, minWidth: '190', width: '5%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'lead_org', displayName: 'Lead Organization', enableSorting: true, minWidth: '170', width: '5%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'sponsor', enableSorting: true, minWidth: '100', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'study_source', enableSorting: true, minWidth: '150', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'current_trial_status', enableSorting: true, minWidth: '190', width: '7%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'current_milestone', enableSorting: true, minWidth: '200', width: '7%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'scientific_milestone', enableSorting: true, minWidth: '250', width: '9%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'admin_milestone', enableSorting: true, minWidth: '250', width: '9%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'other_ids',displayName:'Other Identifiers', enableSorting: true, minWidth: '400', width: '25%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'current_processing_status', enableSorting: true, minWidth: '225', width: '10%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'submission_type', enableSorting: true, minWidth: '180', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'submission_method', enableSorting: true, minWidth: '180', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'submission_source', enableSorting: true, minWidth: '180', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'nih_nci_div', enableSorting: true, minWidth: '180', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'nih_nci_prog', enableSorting: true, minWidth: '130', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'internal_source', displayName: 'Information Source', enableSorting: true, minWidth: '130', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                }
            ]
        };

        var services = {
            getAllTrials: getAllTrials,
            getTrialById: getTrialById,
            upsertTrial: upsertTrial,
            searchTrialsPa: searchTrialsPa,
            getInitialTrialSearchParams: getInitialTrialSearchParams,
            getGridOptions: getGridOptions,
            getStudySources: getStudySources,
            getProtocolIdOrigins: getProtocolIdOrigins,
            getPhases: getPhases,
            getResearchCategories: getResearchCategories,
            getAccrualDiseaseTerms: getAccrualDiseaseTerms,
            getResponsibleParties: getResponsibleParties,
            getFundingMechanisms: getFundingMechanisms,
            getInstituteCodes: getInstituteCodes,
            getNci: getNci,
            getNciDiv: getNciDiv,
            getNciProg: getNciProg,
            getTrialStatuses: getTrialStatuses,
            getMilestones: getMilestones,
            getProcessingStatuses: getProcessingStatuses,
            getHolderTypes: getHolderTypes,
            getSubmissionTypes: getSubmissionTypes,
            getSubmissionMethods: getSubmissionMethods,
            getInvestigatorTypes: getInvestigatorTypes,
            getNih: getNih,
            checkOtherId: checkOtherId,
            deleteTrial: deleteTrial,
            setCurrentTrial: setCurrentTrial,
            getCurrentTrialFromCache: getCurrentTrialFromCache,
            checkoutTrial: checkoutTrial,
            checkinTrial: checkinTrial,
            getCentralContactTypes: getCentralContactTypes,
            getBoardApprovalStatuses: getBoardApprovalStatuses,
            getSiteRecruitementStatuses: getSiteRecruitementStatuses,
            getTrialDocumentTypes: getTrialDocumentTypes,
            uploadTrialRelatedDocs: uploadTrialRelatedDocs,
            prepUploadingTrialRelatedDocs: prepUploadingTrialRelatedDocs,
            groupTrialDesignData: groupTrialDesignData,
            getAcceptedFileTypesPA: getAcceptedFileTypesPA,
            getInterventionModels: getInterventionModels,
            getMaskings: getMaskings,
            getAllocations: getAllocations,
            getStudyClassifications: getStudyClassifications,
            getStudyModels: getStudyModels,
            getTimePerspectives: getTimePerspectives,
            getBiospecimenRetentions: getBiospecimenRetentions,
            getAgeUnits: getAgeUnits,
            getGenderList: getGenderList,
            getSamplingMethods: getSamplingMethods,
            getAnatomicSites: getAnatomicSites,
            groupPATrialSearchFieldsData: groupPATrialSearchFieldsData,
            getTrialIdentifierTypes: getTrialIdentifierTypes,
            searchClinicalTrialsGovIgnoreExists: searchClinicalTrialsGovIgnoreExists,
            searchNCITrial: searchNCITrial,
            lookupTrial: lookupTrial,
            associateTrial: associateTrial,
            lookupNcitInterventions: lookupNcitInterventions,
            getInterventionTypes: getInterventionTypes,
            searchCtrpInterventionsByName: searchCtrpInterventionsByName,
            updateTrial: updateTrial,
            getMailLogs: getMailLogs,
            getTrialCheckoutHistory: getTrialCheckoutHistory,
            annotateTrialStatusWithNameAndCode: annotateTrialStatusWithNameAndCode,
            getInternalSources: getInternalSources,
            getAmendReasons: getAmendReasons,
            validateAbstractionOnTrial: validateAbstractionOnTrial,
            validatePAATrialStatus: validatePAATrialStatus,
            abstractionValidateTrialStatus: abstractionValidateTrialStatus,
        };

        return services;



        /*********************** implementations *****************/

        function getAllTrials() {
            return PromiseTimeoutService.getData(URL_CONFIGS.TRIAL_LIST);
        } //getAllTrials

        function getTrialById(trialId) {
            console.log('calling getTrialById in TrialService');
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

        function searchTrialsPa(searchParams) {
            if (!!searchParams) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.SEARCH_TRIAL_PA, searchParams);
            }
        } //searchTrials

        /**
         * get initial paramater object for trials search
         * @return initTrialSearchParams
         */
        function getInitialTrialSearchParams() {
            return angular.copy(initTrialSearchParams);
        } //getInitialTrialSearchParams

        function getGridOptions() {
            return gridOptions;
        }

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

        function getMilestones() {
            return PromiseTimeoutService.getData(URL_CONFIGS.MILESTONES);
        }

        function getAnatomicSites() {
            return PromiseTimeoutService.getData(URL_CONFIGS.ANATOMIC_SITES);
        }

        function getProcessingStatuses() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PROCESSING_STATUSES);
        }

        function getHolderTypes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.HOLDER_TYPES);
        }

        function getNih() {
            return PromiseTimeoutService.getData(URL_CONFIGS.NIH);
        }

        function getNciDiv() {
            return PromiseTimeoutService.getData(URL_CONFIGS.NCI_DIV_PA);
        }

        function getNciProg() {
            return PromiseTimeoutService.getData(URL_CONFIGS.NCI_PROG_PA);
        }

        function getSubmissionTypes() {
            //(original/update/amendment
            // TODO: check if hardcoding is OK
            var submission_types = [{"name":"Original"},{"name":"Update"},{"name":"Amendment"}];
            return submission_types;
        }

        function getSubmissionMethods() {
            return PromiseTimeoutService.getData(URL_CONFIGS.SUBMISSION_METHODS);
        }

        function getSiteRecruitementStatuses() {
            console.log("In getSiteRecruitementStatuses");
            return PromiseTimeoutService.getData(URL_CONFIGS.SITE_RECRUITMENT_STATUSES);
        }

        function getInvestigatorTypes() {
            // TODO: check if hardcoding is OK
            var investigator_types = [{"name":"Principal Investigator"},{"name":"Sub-Investigator"}];
            return investigator_types;
        }

        // Validation logic for Other Trial Identifier
        function checkOtherId(protocolIdOriginId, protocolIdOriginName, protocolId, addedOtherIds) {
            var errorMsg = '';

            if (!protocolIdOriginId || !protocolId) {
                errorMsg = 'Select a Protocol ID Origin and enter a Protocol ID';
                return errorMsg;
            }
            for (var i = 0; i < addedOtherIds.length; i++) {
                if (addedOtherIds[i].protocol_id_origin_id == protocolIdOriginId
                    && protocolIdOriginName !== 'Other Identifier'
                    && protocolIdOriginName !== 'Obsolete ClinicalTrials.gov Identifier') {
                    errorMsg = addedOtherIds[i].protocol_id_origin_name + ' already exists';
                    return errorMsg;
                } else if (addedOtherIds[i].protocol_id_origin_id == protocolIdOriginId
                    && addedOtherIds[i].protocol_id === protocolId
                    && (protocolIdOriginName === 'Other Identifier'
                    || protocolIdOriginName === 'Obsolete ClinicalTrials.gov Identifier')) {
                    errorMsg = addedOtherIds[i].protocol_id_origin_name + ' ' + addedOtherIds[i].protocol_id + ' already exists';
                    return errorMsg;
                }
            }
            // Validate the format of ClinicalTrials.gov Identifier: NCT00000000
            if (protocolIdOriginName === 'ClinicalTrials.gov Identifier' && !/^NCT\d{8}/.test(protocolId)) {
                errorMsg = 'The format must be "NCT" followed by 8 numeric characters';
                return errorMsg;
            }

            return errorMsg;
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
         * Cache the current trial object
         * @param {JSON} trialDetailObj
         * @param {String} checkoutinFlag, if 'undefined', ignore its checkout record
         */
        function setCurrentTrial(trialDetailObj, checkoutinFlag) {
            // trim off unused fields
            delete trialDetailObj.server_response;
            delete trialDetailObj.history;
            curTrial = trialDetailObj;

            // trialDetailObj comes from controllers other than trial overview controller,
            // the flag is undefined, the checkout record should be retained from trial overview controller
            if (checkoutinFlag === undefined) {
                // curTrial = getCurrentTrialFromCache();
                trialDetailObj.admin_checkout = curTrial.admin_checkout;
                trialDetailObj.scientific_checkout = curTrial.scientific_checkout;
            }

            // LocalCacheService.cacheItem('current_trial_object', trialDetailObj);
        }

        /**
         * get the currently cached trial detail object
         * @return {JSON}
         */
        function getCurrentTrialFromCache() {
            // var curTrial = LocalCacheService.getCacheWithKey('current_trial_object');

            _.each(curTrial.participating_sites, function (site) {
                site.site_rec_status_wrappers = DateService.formatDateArray(site.site_rec_status_wrappers, 'status_date', 'DD-MMM-YYYY');
            });

            delete curTrial.admin_checkout;
            delete curTrial.scientific_checkout;
            return angular.copy(curTrial);
        }

        function checkoutTrial(trialId, checkoutType) {
            var url = URL_CONFIGS.PA.TRIALS_CHECKOUT_IN.replace('{:trialId}', trialId);
            url = url.replace('{:checkWhat}', 'checkout');
            url = url.replace('{:checkoutType}', checkoutType);
            return PromiseTimeoutService.getData(url);
        }

        function checkinTrial(trialId, checkinType, commentText) {
            var url = URL_CONFIGS.PA.TRIALS_CHECKOUT_IN.replace('{:trialId}', trialId);
            url = url.replace('{:checkWhat}', 'checkin');
            url = url.replace('{:checkoutType}', checkinType);
            // return PromiseTimeoutService.getData(url);
            return PromiseTimeoutService.postDataExpectObj(url, {checkin_comment: commentText});
        }

        /**
         * Get the list of central contact types
         * @return {Promise -> resolve to a JSON object}
         */
        function getCentralContactTypes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.TRIALS_CENTRAL_CONTACT_TYPES);
        }

        /**
         * Get the array of board approval statuses
         * @return {Promise -> resolve to a JSON object with 'statuses' as key and an array as value}
         */
        function getBoardApprovalStatuses() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.BOARD_APPROVAL_STATUSES);
        }

        function getTrialDocumentTypes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.TRIAL_DOCUMENT_TYPES);
        }

        function getAcceptedFileTypesPA() {
            return PromiseTimeoutService.getData(URL_CONFIGS.ACCEPTED_FILE_TYPES);
        }

        function getInterventionModels() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.INTERVENTION_MODELS);
        }

        function getMaskings() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.MASKINGS);
        }

        function getAllocations() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.ALLOCATIONS);
        }

        function getStudyClassifications() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.STUDY_CLASSIFICATIONS);
        }

        function getStudyModels() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.STUDY_MODELS);
        }

        function getTimePerspectives() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.TIME_PERSPECTIVES);
        }

        function getBiospecimenRetentions() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.BIOSPECIMEN_RETENTIONS);
        }

        function getGenderList() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.GENDERS);
        }

        function getAgeUnits() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.AGE_UNITS);
        }

        function getSamplingMethods() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.SAMPLING_METHODS);
        }

        function getTrialIdentifierTypes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.TRIAL_ID_TYPES);
        }

        function getAmendReasons() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.AMENDMENT_REASONS);
        }

        function validateAbstractionOnTrial(trialId) {
            var url = URL_CONFIGS.PA.VALIDATE_ABSTRACTION.replace(/\s*\{.*?\}\s*/g, trialId);
            return PromiseTimeoutService.getData(url);
        }

        /**
         * Search clinical trials, ignoring existing trials even if they have been imported
         * @param  {String} nctId        NCT trial id
         * @param  {binary 1 or 0} ignoreExists whether or not ignores the NCT trial has been imported (1 for ignored, 0 for not ignored)
         * @return {Promise}
         */
        function searchClinicalTrialsGovIgnoreExists(nctId) {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.SEARCH_CLINICAL_TRIALS_GOV_IGNORE_EXITS + '?nct_id=' + nctId);
        }

        function searchCtrpInterventionsByName(cCode) {
            var url = URL_CONFIGS.PA.SEARCH_CTRP_INTERVENTIONS.replace(/\s*\{.*?\}\s*/g, cCode);
            return PromiseTimeoutService.getData(url);
        }

        /**
         * Retrieve email logs sent out for this trialId
         * @param  {Integer} trialId
         * @return {Promise}
         */
        function getMailLogs(trialId) {
            var url = URL_CONFIGS.PA.MAIL_LOGS.replace(/\s*\{.*?\}\s*/g, trialId);
            return PromiseTimeoutService.getData(url);
        }

        function getTrialCheckoutHistory(trialId) {
            var url = URL_CONFIGS.PA.CHECKOUT_HISTORY.replace(/\s*\{.*?\}\s*/g, trialId);
            return PromiseTimeoutService.getData(url);
        }

        /**
         * Search NCI trial in the database
         * @param  {String} nciTrialId, trial id that starts with NCI- (e.g. NCI-2014-00894)
         * @return {Promise}
         */
        function searchNCITrial(nciTrialId) {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.SEARCH_NCI_TRIAL + '?nci_id=' + nciTrialId);
        }

        /**
         * Get a list of intervention types from CTRP/local database
         * @return {[Promise resolved to array]} [possible values include 'Device', 'Drug', etc]
         */
        function getInterventionTypes() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.INTERVENTION_TYPES);
        }

        /**
         * Look up a trial with the given identifier from either NCT or NCI (local database)
         * @param  {[type]} trialIdentifier [description]
         * @return {[type]}                 [description]
         */
        function lookupTrial(trialIdentifier) {
            trialIdentifier = trialIdentifier.toUpperCase();
            if (!!trialIdentifier && trialIdentifier.startsWith('NCT')) {
                return searchClinicalTrialsGovIgnoreExists(trialIdentifier);
            } else {
                return searchNCITrial(trialIdentifier);
            }
        }

        /**
         * Associate a Trial with another trial
         * @param  {JSON object} associatedTrialObj: fields include 'trial_identifier', 'associated_trial_id',
         *                       'identifier_type_id', 'official_title', 'research_category_name'
         * @return {[type]}                    [description]
         */
        function associateTrial(associatedTrialObj) {
            console.info('associating trial: ', associatedTrialObj);
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.PA.ASSOCIATE_TRIAL, associatedTrialObj);
        }

        function lookupNcitInterventions(searchParams) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.PA.NCIT_INTERVENTIONS_LOOKUP, searchParams);
        }

        /**
         * Get validation warnings/errors for trial statuses in PAA
         *
         * @param statuses
         */
        function validatePAATrialStatus(statuses) {
            if (!!statuses) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.PAA_VALIDATE_TRIAL_STATUS, statuses);
            }
        }

        /**
         * Get validation warnings/errors for trial statuses in Abstraction Validation
         *
         * @param statuses
         */
        function abstractionValidateTrialStatus(statuses) {
            if (!!statuses) {
                return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.ABSTRACTION_VALIDATE_TRIAL_STATUS, statuses);
            }
        }

        /**
         * Update an existing trial
         * @param  {[JSON]} trialObj - Trial detail object
         * @return {[Promise]}
         */
        function updateTrial(trialObj) {
            if (!angular.isDefined(trialObj.id)) {
                return;
            }
            var outerTrial = {};
            outerTrial.new = false;
            outerTrial.id = trialObj.id;
            outerTrial.trial = trialObj;
            outerTrial.trial.lock_version = getCurrentTrialFromCache().lock_version;
            return upsertTrial(outerTrial);
        }

        /**
         * Convert each trial doc object to a promise for uploading, the doc must be 'active' to be uploaded
         * @param  {JSON Object} trialDocObj
         * @param  {Integer} trialId
         * @return {a single promise}
         */
        function prepUploadingTrialRelatedDocs(trialDocObj, trialId) {
            if (typeof trialDocObj.file === 'object' &&
                !!trialDocObj.file.size && trialDocObj.status === 'active') {
                return Upload.upload({
                    url: HOST + URL_CONFIGS.TRIAL_DOCUMENT_LIST,
                    method: 'POST',
                    data: {
                        'trial_document[document_type]': trialDocObj.document_type,
                        'trial_document[document_subtype]': trialDocObj.document_subtype,
                        'trial_document[trial_id]': trialId,
                        'trial_document[source_document]': trialDocObj.source_document || 'PA',
                        'trial_document[file]': trialDocObj.file,
                        'replaced_doc_id': trialDocObj.replacedDocId || ''  // if not present, use empty string
                    }
                });
            } else {
                console.log('not file');
                return null;
            }
        }

        function uploadTrialRelatedDocs(trialDocsArr, trialId) {
            var promises = [];
            promises = _.map(trialDocsArr, function(trialDocObj) {
                return prepUploadingTrialRelatedDocs(trialDocObj, trialId);
            });

            return PromiseTimeoutService.groupPromises(promises);
        }

        /**
         * Annotate each trial status with name and code that is found in the provided trialStatusDictArr
         * @param  {Array} trialStatusArr     [description]
         * @param  {Array} trialStatusDictArr [description]
         * @return {Array}                    annotated trial status array
         */
        function annotateTrialStatusWithNameAndCode(trialStatusArr, trialStatusDictArr) {
            var tempStatuses = [];
            if (!angular.isArray(trialStatusArr) || !angular.isArray(trialStatusDictArr)) {
                return tempStatuses;
            }
            tempStatuses = _.map(trialStatusArr, function(status) {
                var curStatusObj = _.findWhere(trialStatusDictArr, {id: status.trial_status_id});
                status.trial_status_name = curStatusObj.name || '';
                status.trial_status_code = curStatusObj.code || '';
                status._destroy = false;
                //status.status_date = moment(status.status_date).format("DD-MMM-YYYY");
                delete status.trial_status; // delete the trial_status object
                delete status.updated_at;
                delete status.created_at;
                return status;
            }).filter(function(s) {
                return !s._destroy; // only return active statuses
            });

            return tempStatuses;
        } // annotateTrialStatusWithNameAndCode

        /**
         * Get grouped data objects/arrays for Trial Design,
         * the ordered array: phases, research_category, primaryPurpose, secondaryPurpose
         * @return {Array of promises} To be resolved as an array
         */
        function groupTrialDesignData() {
            var promises = [
                TrialService.getPhases(),
                TrialService.getResearchCategories(),
                TrialService.getPrimaryPurposes(),
                TrialService.getSecondaryPurposes()
            ];
            return PromiseTimeoutService.groupPromises(promises);
        }

        /**
         * Group the promise calls to return the data/list required
         * in the PA Trial Search form
         * @return {Array of promises} [description]
         */
        function groupPATrialSearchFieldsData() {
            var promises = [];
            promises.push(TrialService.getStudySources());
            promises.push(TrialService.getPhases());
            promises.push(TrialService.getPrimaryPurposes());
            promises.push(TrialService.getTrialStatuses());
            promises.push(TrialService.getProtocolIdOrigins());
            promises.push(getMilestones());
            promises.push(getResearchCategories());
            promises.push(getNciDiv());
            promises.push(getNciProg());
            promises.push(getSubmissionTypes());
            promises.push(getSubmissionMethods());
            promises.push(getProcessingStatuses());

            return PromiseTimeoutService.groupPromises(promises);
        }

        function getInternalSources() {
            return PromiseTimeoutService.getData(URL_CONFIGS.PA.INTERNAL_SOURCES);
        }

    }
})();
