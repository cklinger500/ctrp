/**
 * Created by wus4 on 8/14/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.pa')
        .factory('PATrialService', PATrialService);

    PATrialService.$inject = ['URL_CONFIGS', 'MESSAGES', '$log', '_', 'Common',
            '$rootScope', 'PromiseTimeoutService', 'Upload', 'HOST', 'LocalCacheService', 'uiGridConstants'];

    function PATrialService(URL_CONFIGS, MESSAGES, $log, _, Common,
            $rootScope, PromiseTimeoutService, Upload, HOST, LocalCacheService, uiGridConstants) {

        var initTrialSearchParams = {
            //for pagination and sorting
            sort: '',
            order: '',
            rows: 10,
            start: 1
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
            enableFiltering: true,
            enableVerticalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
            columnDefs: [
                {name: 'nci_id', displayName: 'NCI ID', enableSorting: true, minWidth: '150', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.pa.trialOverview({trialId : row.entity.id })"> {{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'lead_protocol_id', displayName: 'Lead Protocol ID', enableSorting: true, minWidth: '120', width: '3%', sort: { direction: 'asc', priority: 1},
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                    '<a ui-sref="main.pa.trialOverview({trialId : row.entity.id })"> {{COL_FIELD CUSTOM_FILTERS}}</a></div>'
                },
                {name: 'official_title', enableSorting: true, minWidth: '150', width: '8%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'phase', enableSorting: true, minWidth: '75', width: '6%'},
                {name: 'purpose', enableSorting: true, minWidth: '100', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'},
                {name: 'pilot', enableSorting: true, minWidth: '75', width: '6%'},
                {name: 'pi', displayName: 'Principal Investigator', enableSorting: true, minWidth: '150', width: '5%',
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
                {name: 'current_trial_status', enableSorting: true, minWidth: '160', width: '7%',
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
                {name: 'other_ids', enableSorting: true, minWidth: '400', width: '25%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'current_processing_status', enableSorting: true, minWidth: '225', width: '10%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'submission_type', enableSorting: true, minWidth: '100', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'submission_method', enableSorting: true, minWidth: '100', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'submission_source', enableSorting: true, minWidth: '100', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'nih_nci_div', enableSorting: true, minWidth: '100', width: '3%',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'
                },
                {name: 'nih_nci_prog', enableSorting: true, minWidth: '100', width: '3%',
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
            getTrialDocumentTypes: getTrialDocumentTypes
        };

        return services;



        /*********************** implementations *****************/

        function getAllTrials() {
            return PromiseTimeoutService.getData(URL_CONFIGS.TRIAL_LIST);
        } //getAllTrials

        function getTrialById(trialId) {
            console.log('calling getTrialById in TrialService');
            //return PromiseService.getData(URL_CONFIGS.AN_TRIAL + trialId + '.json');
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
            return initTrialSearchParams;
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

        // Validation logic for Other Trial Identifier
        function checkOtherId(protocolIdOriginId, protocolIdOriginName, protocolId, addedOtherIds) {
            var errorMsg = '';

            if (!protocolIdOriginId || !protocolId) {
                errorMsg = 'Please select a Protocol ID Origin and enter a Protocol ID';
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
         */
        function setCurrentTrial(trialDetailObj) {
            // trim off unused fields
            delete trialDetailObj.server_response;
            delete trialDetailObj.history;
            LocalCacheService.cacheItem('current_trial_object', trialDetailObj);
        }

        /**
         * get the currently cached trial detail object
         * @return {JSON}
         */
        function getCurrentTrialFromCache() {
            return LocalCacheService.getCacheWithKey('current_trial_object');
        }

        function checkoutTrial(trialId, checkoutType) {
            var url = URL_CONFIGS.PA.TRIALS_CHECKOUT_IN.replace('{:trialId}', trialId);
            url = url.replace('{:checkWhat}', 'checkout');
            url = url.replace('{:checkoutType}', checkoutType);
            return PromiseTimeoutService.getData(url);
        }

        function checkinTrial(trialId, checkinType) {
            var url = URL_CONFIGS.PA.TRIALS_CHECKOUT_IN.replace('{:trialId}', trialId);
            url = url.replace('{:checkWhat}', 'checkin');
            url = url.replace('{:checkoutType}', checkinType);
            return PromiseTimeoutService.getData(url);
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

    }
})();
