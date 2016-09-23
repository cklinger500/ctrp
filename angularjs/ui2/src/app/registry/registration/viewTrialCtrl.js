/**
 * Created by wus4 on 2/3/16.
 */

(function () {
    'use strict';

    angular.module('ctrp.app.registry').controller('viewTrialCtrl', viewTrialCtrl);

    viewTrialCtrl.$inject = ['trialDetailObj', 'TrialService', 'toastr', '$state', 'DateService', 'HOST', '_'];

    function viewTrialCtrl(trialDetailObj, TrialService, toastr, $state, DateService, HOST, _) {

        var vm = this;
        vm.curTrial = trialDetailObj;
        vm.documents = [];
        vm.downloadBaseUrl = HOST + '/ctrp/registry/trial_documents/download';
        console.info('curTrial: ', vm.curTrial);
        console.info('ind_ides: ', vm.curTrial.ind_ides);
        vm.addMySite = function () {
            $state.go('main.addParticipatingSite', {trialId: vm.curTrial.id});
        };

        activate();

        /****************************** implementations **************************/

        function activate() {
            convertDate();
            getTrialDocuments();
        }

        function convertDate() {
            vm.curTrial.start_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.start_date);
            vm.curTrial.primary_comp_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.primary_comp_date);
            vm.curTrial.comp_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.comp_date);
            vm.curTrial.current_trial_status_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.current_trial_status_date);
            vm.curTrial.last_amendment_date = DateService.convertISODateToLocaleDateStr(vm.curTrial.last_amendment_date);
        }

        function getTrialDocuments() {
            var documents = _.groupBy(vm.curTrial.trial_documents, 'document_type');
            // vm.documents = [{file_type: 'Other Documents', list: documents['Other Document']}];
            // console.info('other docs: ', documents['Other Document']);
            _.keys(documents).forEach(function(docKey) {
                var fileList = documents[docKey].filter(function(doc) {
                    return doc.is_latest && doc.status === 'active';
                });
                vm.documents.push({file_type: docKey, list: fileList});
            });
            console.info('vm.documents: ', vm.documents.reverse());
        }
    }
})();
