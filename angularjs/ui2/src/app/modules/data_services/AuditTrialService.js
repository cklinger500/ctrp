/**
 * Created by wangg5 on 6/2/15.
 */

(function () {
    'use strict';

    angular.module('ctrp.module.dataservices')
        .factory('AuditService', AuditService);

    AuditService.$inject = ['URL_CONFIGS', 'MESSAGES', '$log', '_',
        'GeoLocationService', 'Common', '$rootScope', 'PromiseTimeoutService','UserService','uiGridConstants','HOST', 'uiGridExporterConstants', 'uiGridExporterService', '$filter'];

    function AuditService(URL_CONFIGS, MESSAGES, $log, _,
                        GeoLocationService, Common, $rootScope,
                        PromiseTimeoutService,UserService,uiGridConstants,HOST, uiGridExporterConstants, uiGridExporterService, $filter) {

        var initUpdateSearchParams = {
            //for pagination and sorting
            sort: '',
            order: '',
            rows: 10,
            start: 1
        }; //initial Audits Search Parameters

        var initSubmissionSearchParams = {
            //for pagination and sorting
            sort: '',
            order: '',
            rows: 5,
            start: 1

        };

        var initAuditInitialSearchParams = {
            sort: '',
            order: '',
            rows: 500,
            start: 1
        };

        var updatesGridOptions = {
            rowTemplate: '<div>'+
            '<div>' +
            ' <div ng-mouseover="rowStyle={\'background-color\': \'red\'}; grid.appScope.onRowHover(this);" ng-mouseleave="rowStyle={}" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name"' +
            ' class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader,' +
            ' \'nonselectable-row\': grid.appScope.curationShown && grid.appScope.userRole === \'curator\' &&' +
            ' grid.appScope.rowFormatter( row )}" ui-grid-cell></div></div>',
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            // enableFullRowSelection: true,
            enableSelectAll: false,
            //enableRowSelection: false,
            paginationPageSizes: [10, 20],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            expandableRowTemplate:'innerTable.html',
            expandableRowHeight: 150,
            enableExpandableRowHeader:false,
            exporterCsvFilename: 'audit_trail_updates.csv',
            exporterMenuAllData: true,
            exporterMenuPdf: false,
            exporterMenuCsv: true,
            gridMenuCustomItems: [{
                title: 'Export All Data As CSV',
                order: 100,
                action: function ($event){
                    this.grid.api.exporter.csvExport(uiGridExporterConstants.ALL, uiGridExporterConstants.ALL);
                }
            }],
            columnDefs: [
                {name: 'submission_num',pinnedLeft: true, displayName: 'Submission Number' , enabledSorting: true , minWidth: '100', width: '*'},
                {name: 'submission_date',displayName:'Update Date', enableSorting: true, minWidth: '100', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.submission_date  | dateFormat}}</div>'},
                {name: 'submission_source', displayName:'Update Source',enableSorting: true, minWidth: '100', width: '*'},
                {
                    name: 'Acknowledge ',
                    cellTemplate: '<div class="text-center ui-grid-cell-contents"><button type="button" class="btn btn-primary" restriction-field ng-hide="(row.entity.acknowledge != \'No\')" ng-click="grid.appScope.editRow(grid,row,\'updates\')">Acknowledge</button><div ng-hide="(row.entity.acknowledge != \'Yes\')">Acknowledged</div>'
                },
                {name: 'acknowledge_comment', displayName:'Comment',enableSorting: true, minWidth: '100', width: '*'},
                {name: 'acknowledge_date', displayName:'Update Acknowldegement Date',enableSorting: true, minWidth: '100', width: '*',
                cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.acknowledge_date | dateFormat}}</div>'},
                {name: 'acknowledged_by', displayName:'User ID',enableSorting: true, minWidth: '150', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' + '{{COL_FIELD CUSTOM_FILTERS}}</div>'}

            ]
        };


        var submissionsGridOptions = {
            rowTemplate: '<div>'+
            '<div>' +
            ' <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name"' +
            ' class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader,' +
            ' \'nonselectable-row\': grid.appScope.curationShown && grid.appScope.userRole === \'curator\' &&' +
            ' grid.appScope.rowFormatter( row )}" ui-grid-cell></div></div>',
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 110,
            enableSelectAll: false,
            enableRowSelection: false,
            paginationPageSizes: [5,10, 25],
            paginationPageSize: 5,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            enableVerticalScrollbar: 1,// uiGridConstants.scrollbars.WHEN_NEEDED,
            enableHorizontalScrollbar:1,// uiGridConstants.scrollbars.WHEN_NEEDED,
            exporterCsvFilename: 'audit_trail_submissions.csv',
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
                {name: 'submission_num',pinnedLeft: true, displayName: 'Submission Number' , minWidth: '100', width: '*'},
                {name: 'submission_date',displayName:'Date', minWidth: '100', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.submission_date | dateFormat}}</div>'},
                {field: 'submission_type_list', displayName: 'Type',minWidth: '150', width: '*',enableSorting:true, cellTemplate:'<div class="ui-grid-cell-contents">{{COL_FIELD}}</div>'},
                {field: 'first_four_docs',displayName:'Documents', enableSorting: true, minWidth: '380', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents">' +
                    '<ul ng-repeat="doc in row.entity[col.field]"><li><a href="{{grid.appScope.downloadBaseUrl}}/{{doc.id}}">{{doc.file_name}}</a>  {{doc.source_document}} </li></ul>' +
                    '<a  class="cursor-pointer" ng-show="(row.entity.docs_size > 4)" ng-click="grid.appScope.showTrialDocuments(grid,row)">Show more ...</a>'+
                    '</div>'},
                {field: 'milestone', displayName: 'Current Milestone', minWidth: '220',width: '*',enableSorting:true, cellTemplate:'<div class="ui-grid-cell-contents"><div ng-repeat="item in row.entity[col.field]">{{item}}</div></div>'},

                {
                    name: 'Action ',
                    cellTemplate: '<div class="text-center ui-grid-cell-contents">' +
                    '<button type="button" class="btn btn-primary" restriction-field ng-show="(row.entity.submission_type == \'Amendment\' && !row.entity.is_rejected)" ng-click="grid.appScope.editRow(grid,row,\'submissions\')" ><i class="glyphicon glyphicon-edit"> </button>' +
                    '</div>',
                    minWidth:'10',width: '95'

                }
            ]
        };


        var deleteDocsGridOptions = {
            rowTemplate: '<div>'+
            '<div>' +
            ' <div ng-mouseover="rowStyle={\'background-color\': \'red\'}; grid.appScope.onRowHover(this);" ng-mouseleave="rowStyle={}" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name"' +
            ' class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader,' +
            ' \'nonselectable-row\': grid.appScope.curationShown && grid.appScope.userRole === \'curator\' &&' +
            ' grid.appScope.rowFormatter( row )}" ui-grid-cell></div></div>',
            enableColumnResizing: true,
            totalItems: null,
            rowHeight: 22,
            enableSelectAll: false,
            paginationPageSizes: [10, 20],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,
            enableGridMenu: true,
            enableFiltering: true,
            flatEntityAccess: true,

            columnDefs: [

                {name: 'deletion_date',displayName:'Deletion Date', enableSorting: true, minWidth: '100', width: '*',
                    cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.deletion_date | dateFormat}}</div>'},

                {name: 'deleted_by',displayName:'Deleted by Username', enableSorting: true, minWidth: '100', width: '*'},


                {name: 'document_type',displayName:'Document Type', enableSorting: true, minWidth: '100', width: '*'},
                {field: 'file_name',pinnedLeft: true, displayName: 'File Name' , enabledSorting: true , minWidth: '100', width: '*'},
                    //cellTemplate: '<div class="ui-grid-cell-contents"><a href="{{grid.appScope.downloadBaseUrl}}/{{row.entity[col.field].id}}">{{row.entity[col.field].file_name}}</a> {{doc.source_document}}</div></div>'},

                {name: 'original',displayName:'Original', enableSorting: true, minWidth: '100', width: '*'},

                {name: 'deleted_or_revised',displayName:'Deleted/Revised', enableSorting: true, minWidth: '100', width: '*'},

                {name: 'why_deleted',displayName:'Deletion Comments', enableSorting: true, minWidth: '100', width: '*'},

            ]
        };


        var auditsGridOptions = {
            rowModelType: 'pagination',
            enableColResize: true,
            enableSorting: false,
            enableFilter: true,
            rowHeight: 30,
            rowData:null,
            angularCompileRows: true,
            suppressRowClickSelection: true,
            suppressSizeToFit: false,

            columnDefs: [
                {field: 'created_at',  headerName:'Created At', cellRenderer: dateTimeFormatRenderer},
                {field: 'event',  headerName:'Event '},
                {field: 'updated_by',   headerName:'Updated By'},
                {field: 'nci_id', headerName: 'NCI ID'},
                {field: 'lead_protocol_id', headerName: 'Lead Protocol'},

                {field: 'official_title', headerName:'Official Title'},
                {field: 'pilot',   headerName:'Pilot'},

                {field: 'program_code',   headerName:'Program Code'},
                {field: 'grant_question',   headerName:'Grant Question'},
                {field: 'start_date',   headerName:'Start Date', cellRenderer: dateFormatRenderer},
                {field: 'start_date_qual',   headerName:'Start Date Qual'},
                {field: 'primary_comp_date',   headerName:'Primary Comp Date', cellRenderer: dateFormatRenderer},
                {field: 'primary_comp_date_qual',   headerName:'Primary Comp Date Qual'},
                {field: 'comp_date',   headerName:'Completion Date', cellRenderer: dateFormatRenderer},
                {field: 'comp_date_qual',   headerName:'Completion Date Qual'},
                {field: 'ind_ide_question',   headerName:'Ind Ide Question'},
                {field: 'intervention_indicator',   headerName:'Intervention Indicator'},
                {field: 'sec801_indicator',   headerName:'Sec801 Indicator'},
                {field: 'data_monitor_indicator',   headerName:'Data Monitor Indicator'},
                {field: 'study_source',   headerName:'Study Source'},
                {field: 'phase',   headerName:'Phase'},
                {field: 'primary_purpose',   headerName:'Primary Purpose'},
                {field: 'primary_purpose_other',   headerName:'Primary Purpose Other'},

                {field: 'secondary_purpose',   headerName:'Secondary Purpose'},
                {field: 'secondary_purpose_other',   headerName:'Secondary Purpose Other'},

                {field: 'responsible_party',   headerName:'Responsible Party'},


                {field: 'pi', headerName: 'Principal Investigator'},
                {field: 'lead_org', headerName: 'Lead Organization'},
                {field: 'sponsor',  headerName:'Sponsor'},

                {field: 'investigator',  headerName:'Investigator'},

                {field: 'research_category',   headerName:'Research Category'},
                {field: 'accrual_disease_term',   headerName:'Accrual Disease Term'},
                {field: 'investigator_title', headerName: 'Investigator Title'},
                {field: 'investigator_aff_id',   headerName:'Investigator Aff Id'},
                {field: 'created_by',   headerName:'Created By'},
                {field: 'process_priority',   headerName:'Process Priority'},
                {field: 'process_comment',   headerName:'Process Comment'},
                {field: 'acronym',   headerName:'Acronym'},
                {field: 'keywords',   headerName:'Keywords'},
                {field: 'nih_nci_div',   headerName:'Nih Nci Div'},
                {field: 'nih_nci_prog',   headerName:'Nih Nci Program'},
                {field: 'send_trial',   headerName:'Send Trial'},
                {field: 'board_approval_num',   headerName:'Board Approval Num'},
                {field: 'brief_title',   headerName:'Brief Title'},
                {field: 'brief_summary',   headerName:'Brief Summary'},
                {field: 'detailed_description',   headerName:'Detailed Description'},
                {field: 'objective',   headerName:'Objective'},
                {field: 'target_enrollment',   headerName:'Target Enrollment'},
                {field: 'final_enrollment',   headerName:'Final Enrollment'},
                {field: 'accruals',   headerName:'Accruals'},
                {field: 'study_model',   headerName:'Study Model'},
                {field: 'study_model_other',   headerName:'Study Model Other'},
                {field: 'time_perspective',   headerName:'Time Perspective Other'},
                {field: 'time_perspective_other',   headerName:''},
                {field: 'accept_vol',   headerName:'Accept Vol'},
                {field: 'min_age',   headerName:'Min Age'},
                {field: 'max_age',   headerName:'Max Age'},
                {field: 'board_approval_status',   headerName:'Board Approval Status'},
                {field: 'intervention_model',   headerName:'Intervention Model'},
                {field: 'masking',   headerName:'Masking'},
                {field: 'masking_role_caregiver',   headerName:'Masking Role Caregiver'},
                {field: 'masking_role_investigator',   headerName:'Masking Role Investigator'},
                {field: 'masking_role_outcome_assessor',   headerName:'Masking Role Outcome Assessor'},
                {field: 'masking_role_subject',   headerName:'Masking Role Subject'},

                {field: 'allocation',   headerName:'Allocation'},
                {field: 'study_classification',   headerName:'Study Classification'},
                {field: 'gender',   headerName:'Gender'},
                {field: 'min_age',   headerName:'Min Age'},
                {field: 'max_age',   headerName:'Max Age'},
                {field: 'anatomic_site',   headerName:'Anatomic Site'},
                {field: 'num_of_arms',   headerName:'Number of Arms'},
                {field: 'verification_date',   headerName:'Verification Date'},
                {field: 'sampling_method',   headerName:'Samplinh Method'},
                {field: 'study_pop_desc',   headerName:'Study Pop Description'},
                {field: 'board_name',   headerName:'Board Name'},
                {field: 'board_affiliation',   headerName:'Board  Affiliation'},


                {field: 'other_ids',   headerName:'Other IDs'},

                {field: 'outcome_measures',headerName: 'Outcome Measures'},

                {field: 'grants',headerName: 'Grants'},

                {field: 'eligibility_criteria',headerName: 'Eligibility Criteria'},
                {field: 'associated_trials',   headerName:'Associated Trials'},
                {field: 'interventions', headerName:'Interventions'},
                {field: 'arms_groups',  headerName:'Arms Groups'},
                {field: 'sub_groups',  headerName:'Sub Groups'},
                {field: 'trial_owners',  headerName:'Trial Owners'},
                {field: 'trial_documents', headerName:'Trial Documents'},

                {field: 'alternative_titles',   headerName:''},

                {field: 'central_contacts',   headerName:'Central Contacts'},

                {field: 'citations',   headerName:'Citations'},

                {field: 'collaborators',   headerName:'Collaborators'},
                {field: 'ind_ides',   headerName:'Ind Ides'},

                {field: 'links',   headerName:'Links'},

                {field: 'milestones',   headerName:'Milestones'},

                {field: 'submissions',   headerName:'Submissions'},

                {field: 'oversight_authorities',   headerName:'Oversight Authorities'},
                {field: 'processing_statuses',   headerName:'Processing Statuses'},
                {field: 'trial_co_leads',   headerName:'Trial co Leads'},
                {field: 'trial_co_pis',   headerName:'Trial co PIs'},
                {field: 'trial_statuses',   headerName:'Trial Statuses'},



                {field: 'submission_number',   headerName:'Submission Number'},
                {field: 'submission_date',   headerName:'Submission Date', cellRenderer: dateFormatRenderer},





                {field: 'nci_specific_comment',   headerName:'Nci Specific Comment'},


            ]
        };


        var services = {
            getAuditsGridOptions: getAuditsGridOptions,
            getAudits: getAudits,
            getUpdatesGridOptions: getUpdatesGridOptions,
            getUpdates: getUpdates,
            getUpdateInitialSearchParams:getUpdateInitialSearchParams,
            getSubmissions: getSubmissions,
            getSubmissionsGridOptions: getSubmissionsGridOptions,
            upsertSubmission:upsertSubmission,
            getDeletedDocs:getDeletedDocs,
            getDeleteDocsGridOptions:getDeleteDocsGridOptions,
            getSubmissionInitialSearchParams:getSubmissionInitialSearchParams,
            getAuditInitialSearchParams:getAuditInitialSearchParams
        };

        return services;


        /*********************** Grid Helper Callbacks *****************/

        function dateTimeFormatRenderer(dateTime) {
            return $filter('dateFormat')(dateTime.value, '', 'DD-MMM-YYYY, H:mm');
        }

        function dateFormatRenderer(date) {
            return $filter('dateFormat')(date.value, '', 'DD-MMM-YYYY');
        }


        /*********************** implementations *****************/

        function getUpdateInitialSearchParams() {
            return initUpdateSearchParams;
        }
        function getSubmissionInitialSearchParams() {
            return  initSubmissionSearchParams;
        }

        function getAuditInitialSearchParams() {
            return  initAuditInitialSearchParams;
        }

        function getAudits(obj){
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.AUDIT_HISTORY, obj);

        }


        function getAuditsGridOptions() {
            return auditsGridOptions;
        }



        function getUpdates(obj) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.TRIAL_UPDATES_HISTORY, obj);
        }

        function getUpdatesGridOptions() {
            return updatesGridOptions;
        }

        function getSubmissionsGridOptions() {
            return submissionsGridOptions;
        }


        function getSubmissions(obj) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.TRIAL_SUBMISSIONS_HISTORY, obj);

        }

        function getDeletedDocs(obj) {
            return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.TRIAL_DELETED_DOCUMENTS, obj);

        }

        function getDeleteDocsGridOptions() {
            return deleteDocsGridOptions;
        }
                /**
         * Update submission for Updates Tab Updates
         *
         * @param obj
         * @returns {*}
         */
        function upsertSubmission(obj) {
            if (obj.new) {
                //return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.ORG_LIST, orgObj);
            }

            var configObj={};
            return PromiseTimeoutService.updateObj(URL_CONFIGS.A_SUBMISSION + obj.id + '.json', obj, configObj);

        } //upsertOrg

    }


})();
