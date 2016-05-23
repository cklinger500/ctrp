/**
 * Created by wangg5, Deember 31st, 2015
 */

(function() {
    'use strict';
    angular.module('ctrp.app.pa.dashboard')
    .controller('generalTrialDetailsCtrl', generalTrialDetailsCtrl);

    generalTrialDetailsCtrl.$inject = ['$scope', 'TrialService', 'PATrialService', 'toastr',
            'MESSAGES', 'protocolIdOriginObj', '_', '$timeout', 'centralContactTypes', 'PersonService'];

    function generalTrialDetailsCtrl($scope, TrialService, PATrialService, toastr,
        MESSAGES, protocolIdOriginObj, _, $timeout, centralContactTypes, PersonService) {
      var vm = this;
      var _defaultCountry = 'United States'; // for phone number validation
      var _curCentralContactId = '';
      vm.generalTrialDetailsObj = {};
      vm.saveGeneralTrialDetails = saveGeneralTrialDetails;
      vm.resetGeneralTrialDetails = resetGeneralTrialDetails;
      vm.addOtherIdentifier = addOtherIdentifier;
      vm.deleteOtherIdentifier = deleteOtherIdentifier;
      vm.updateOtherId = updateOtherId;
      vm.isValidPhoneNumber = isValidPhoneNumber;
      vm.addAltTitle = addAltTitle;
      vm.updateAlternateTitle = updateAlternateTitle;
      vm.deleteAltTitle = deleteAltTitle;
      vm.editTrialIdentifiers = editTrialIdentifiers;
      vm.escapeEditTrialIdentifier = escapeEditTrialIdentifier;
      vm.updateTrialIdentifier = updateTrialIdentifier;
      vm.editLeadProtocolId = editLeadProtocolId;
      vm.deleteAllOtherIdentifiers = deleteAllOtherIdentifiers;

      vm.leadOrg = {name: '', array: []};
      vm.principalInvestigator = {name: '', array: []};
      vm.sponsor = {name: '', array: []};
      vm.leadProtocolId = '';
      vm.leadProtocolIdEdit = false;
      vm.disableBtn = false;

      var otherIdsClone = [];
      var regex = new RegExp('-', 'g');

      // TODO: the categories and sources come from app settings
      vm.altTitleCategories = [{id: 1, title: 'Spelling/Format'}, {id: 2, title: 'Other'}];
      vm.altTitleSources = [{id: 1, title: 'Protocol'}, {id: 2, title: 'Complete Sheet'},
                            {id: 3, title: 'IRB'}, {id: 4, title: 'Other'}];

      vm.curAlternateTitleObj = {category: '', source: '', title: '', _destroy: false};
      vm.centralContactType = ''; // default to None
      vm.otherIdentifier = {protocol_id_origin_id: '', protocol_id: ''};
      vm.protocolIdOriginArr = protocolIdOriginObj;
      vm.centralContactTypes = centralContactTypes.types;

      activate();

      function activate() {
          getTrialDetailCopy();
          watchTrialDetailObj();
          watchLeadOrg();
          watchPISelection();
          watchCentralContactType();
          watchCentralContact();
          watchSponsor();
      }

      /**
       * Get trial detail object from parent scope
       */
      function watchTrialDetailObj() {
          $scope.$on(MESSAGES.TRIAL_DETAIL_SAVED, function() {
              getTrialDetailCopy();
          });
      } //watchTrialDetailObj

      /* implementations below */
      function saveGeneralTrialDetails() {
          var outerTrial = {};
          vm.disableBtn = true;

          if (JSON.stringify(vm.generalTrialDetailsObj.central_contacts[0]) !== '{}') {
              var typeObject = _.findWhere(vm.centralContactTypes, {name: vm.centralContactType});

              if (vm.generalTrialDetailsObj.central_contacts[0]) {
                  vm.generalTrialDetailsObj.central_contacts[0].central_contact_type_id = !!typeObject ? typeObject.id : '';
                  vm.generalTrialDetailsObj.central_contacts_attributes = vm.generalTrialDetailsObj.central_contacts; // new field
              }
          }
          // reset the central_contact_id if changed
          if (vm.generalTrialDetailsObj.central_contacts.length > 0 &&
                _curCentralContactId != vm.generalTrialDetailsObj.central_contacts[0].id) {
              vm.generalTrialDetailsObj.central_contacts[0].id = _curCentralContactId;
          }

          vm.generalTrialDetailsObj.other_ids_attributes = vm.generalTrialDetailsObj.other_ids; // for updating the attributes in Rails
          vm.generalTrialDetailsObj.alternate_titles_attributes = vm.generalTrialDetailsObj.alternate_titles;
         // vm.generalTrialDetailsObj.central_contacts_attributes = vm.generalTrialDetailsObj.central_contacts;

          outerTrial.new = false;
          outerTrial.id = vm.generalTrialDetailsObj.id;
          outerTrial.trial = vm.generalTrialDetailsObj;
          // get the most updated lock_version
          outerTrial.trial.lock_version = PATrialService.getCurrentTrialFromCache().lock_version;
          TrialService.upsertTrial(outerTrial).then(function(res) {
              var status = res.server_response.status;
              toastr.clear();

              if (status >= 200 && status <= 210) {
                  vm.generalTrialDetailsObj = res;
                  vm.generalTrialDetailsObj.lock_version = res.lock_version;
                  PATrialService.setCurrentTrial(vm.generalTrialDetailsObj); // update to cache
                  $scope.$emit('updatedInChildScope', {});
                  toastr.success('Trial general details has been updated', 'Successful!', {
                      extendedTimeOut: 1000,
                      timeOut: 0
                  });
                  getTrialDetailCopy();
              }
          }).finally(function() {
              vm.disableBtn = false;
          });
      }

      function resetGeneralTrialDetails() {
          vm.leadOrg = {name: '', array: []};
          vm.principalInvestigator = {name: '', array: []};
          vm.sponsor = {name: '', array: []};
          vm.otherIdDestroyAll = false;
         // vm.centralContact = [];
          $timeout(function() {
             getTrialDetailCopy();
             vm.centralContactType = _getCentralContactType(); // restore vm.centralContactType
          }, 0);
          // vm.generalTrialDetailsObj = angular.copy($scope.$parent.paTrialOverview.trialDetailObj);
      }

      /**
       * get a data clone of the trial detail object from Local Cache
       * @return {Void}
       */
      function getTrialDetailCopy() {
          $timeout(function() {
              vm.generalTrialDetailsObj = PATrialService.getCurrentTrialFromCache();
              // vm.leadOrg.name = vm.generalTrialDetailsObj.lead_org.name;
              vm.leadOrg.array = [].concat(angular.copy(vm.generalTrialDetailsObj.lead_org));
              isValidPhoneNumber();
              vm.sponsor.array = [].concat(angular.copy(vm.generalTrialDetailsObj.sponsor));
              vm.principalInvestigator.array = [].concat(angular.copy(vm.generalTrialDetailsObj.pi));
              vm.leadProtocolId = vm.generalTrialDetailsObj.lead_protocol_id;

              if (vm.generalTrialDetailsObj.central_contacts.length > 0) {
                  vm.centralContactType = _getCentralContactType();
                  // vm.generalTrialDetailsObj.central_contacts[0].fullname = PersonService.extractFullName(vm.generalTrialDetailsObj.central_contacts[0]);
              }

              // transform the other_ids array
              vm.generalTrialDetailsObj.other_ids = _.map(vm.generalTrialDetailsObj.other_ids, function(id, idx) {
                  var otherIdentifierNameObj = _.findWhere(vm.protocolIdOriginArr, {id: id.protocol_id_origin_id});
                  id.identifierName = otherIdentifierNameObj.name || '';
                  id._destroy = id._destroy || false; // default to false if not set
                  return id;
              });
              otherIdsClone = angular.copy(vm.generalTrialDetailsObj.other_ids); // back-up copy
          }, 0);
      } //getTrialDetailCopy


      /**
       * Add other identifier to the trial,
       * This function prevents adding duplicate other identifier
       *
       * @return {Void}
       */
      function addOtherIdentifier() {
          vm.otherIdErrorMsg = '';

          // parse to integer
          vm.otherIdentifier.protocol_id_origin_id = parseInt(vm.otherIdentifier.protocol_id_origin_id);
          // boolean
          var condition = {'protocol_id_origin_id': vm.otherIdentifier.protocol_id_origin_id};
          var otherIdExists = _.findIndex(vm.generalTrialDetailsObj.other_ids, condition) > -1;
          if (otherIdExists) {
              // if the identifier exists, return
              vm.otherIdErrorMsg = 'Identifier already exists';
              return;
          }

          var otherIdentifierNameObj = _.findWhere(vm.protocolIdOriginArr, {'id': vm.otherIdentifier.protocol_id_origin_id});
          // vm.otherIdentifier.id = vm.generalTrialDetailsObj.id; // trial Id
          vm.otherIdentifier.trial_id = vm.generalTrialDetailsObj.id;
          vm.otherIdentifier.identifierName = otherIdentifierNameObj.name;
          vm.otherIdentifier._destroy = false;
          if (otherIdentifierNameObj.code === 'NCT' ||
                otherIdentifierNameObj.code === 'ONCT') {
              // force to upper case
              vm.otherIdentifier.protocol_id = vm.otherIdentifier.protocol_id.toUpperCase();
          }
          // validation on other identifier
          var errorMsg = TrialService.checkOtherId(vm.otherIdentifier.protocol_id_origin_id,
                otherIdentifierNameObj.code, vm.otherIdentifier.protocol_id,
                vm.generalTrialDetailsObj.other_ids);

          if (!errorMsg) {
              vm.generalTrialDetailsObj.other_ids.unshift(angular.copy(vm.otherIdentifier));
              // clean up
              vm.otherIdentifier.protocol_id = ''; // empty it
              vm.otherIdentifier.identifierName = '';
              vm.otherIdErrorMsg = '';
              vm.otherIdDestroyAll = false;
          } else {
              vm.otherIdErrorMsg = errorMsg;
          }

      } // addOtherIdentifier


      /**
       * Toggle the identifier for destroy or restore for the
       * specified identifier with index 'idx'
       * @param  {Int} idx [Index for the other identifier in other_ids array]
       * @return {Void}
       */
      function deleteOtherIdentifier(idx) {
          escapeEditTrialIdentifier();
          if (idx < vm.generalTrialDetailsObj.other_ids.length) {
              vm.generalTrialDetailsObj.other_ids[idx]._destroy = !vm.generalTrialDetailsObj.other_ids[idx]._destroy;
          }
          vm.otherIdDestroyAll = false;
      }

      function deleteAllOtherIdentifiers() {
          if (vm.otherIdDestroyAll) {
              vm.otherIdDestroyAll = false;
          } else {
              vm.otherIdDestroyAll = true;
          }
          angular.forEach(vm.generalTrialDetailsObj.other_ids, function (item) {
              item._destroy = vm.otherIdDestroyAll;
          });
       };

      function updateOtherId(protocolIdVal, index) {

          if (!protocolIdVal || protocolIdVal.trim() === '') {
              vm.generalTrialDetailsObj.other_ids[index].protocol_id = otherIdsClone[index].protocol_id;
              return;
          }

          if (index < vm.generalTrialDetailsObj.other_ids.length) {
              vm.generalTrialDetailsObj.other_ids[index].protocol_id = protocolIdVal;
          }
      }
      function editTrialIdentifiers(index) {
          vm.otherIdentifierUpdate = angular.copy(vm.generalTrialDetailsObj.other_ids[index]);
          vm.otherIdentifierEditIndex = index;
          vm.otherIdentifier = vm.otherIdentifierUpdate;
      }

      function editLeadProtocolId() {
          vm.otherIdentifierUpdate = {
             lead: true,
             protocol_id_origin_id: -1,
             protocol_id: vm.generalTrialDetailsObj.lead_protocol_id
          };
          vm.otherIdentifier = vm.otherIdentifierUpdate;
          vm.leadProtocolIdEdit = true;
      }

      function updateTrialIdentifier() {
        if (vm.otherIdentifierUpdate) {
            if (!vm.otherIdentifierUpdate.lead) {
                vm.generalTrialDetailsObj.other_ids[vm.otherIdentifierEditIndex] = vm.otherIdentifierUpdate;
            } else {
                vm.leadProtocolId = vm.otherIdentifierUpdate.protocol_id;
                vm.generalTrialDetailsObj.lead_protocol_id = vm.leadProtocolId.trim();
            }
        }
        vm.escapeEditTrialIdentifier();
      }

      function escapeEditTrialIdentifier(){
         vm.otherIdentifier = {protocol_id_origin_id: '', protocol_id: ''};
         vm.otherIdentifierUpdate = null;
         vm.otherIdentifierEditIndex = null;

         if (vm.leadProtocolIdEdit) {
             vm.leadProtocolIdEdit = false;
         }
      }

      function watchLeadOrg() {
          $scope.$watchCollection(function() {return vm.leadOrg.array;}, function(newVal, oldVal) {
             if (angular.isArray(newVal) && newVal.length > 0 && !!newVal[0]) {
                 // console.log('new lead org: ', newVal[0]);
                 vm.leadOrg.name = newVal[0].name;
                 vm.generalTrialDetailsObj.lead_org = newVal[0];
                 vm.generalTrialDetailsObj.lead_org_id = newVal[0].id; // update lead organization
             }
          });
      }

      function watchPISelection() {
        $scope.$watchCollection(function() {return vm.principalInvestigator.array;}, function(newVal, oldVal) {
          if (angular.isArray(newVal) && newVal.length > 0) {
              vm.principalInvestigator.name = PersonService.extractFullName(newVal[0]); // firstName + ' ' + middleName + ' ' + lastName;
              vm.generalTrialDetailsObj.pi = vm.principalInvestigator.array[0];
              vm.generalTrialDetailsObj.pi_id = vm.principalInvestigator.array[0].id; // update PI

              if (vm.centralContactType === 'PI') {
                  _usePIAsCentralContact();
              }
          }
        });
      }

      function watchSponsor() {
          $scope.$watchCollection(function() {return vm.sponsor.array;}, function(newVal, oldVal) {
             if (angular.isArray(newVal) && newVal.length > 0 && !!newVal[0]) {
                 vm.sponsor.name = !!newVal[0].name ? newVal[0].name : '';
                 vm.generalTrialDetailsObj.sponsor = newVal[0];
                 vm.generalTrialDetailsObj.sponsor_id = !!newVal[0].id ? newVal[0].id : ''; // update sponsor
             }
          });
      }

      function watchCentralContact() {
        $scope.$watchCollection(function() {return vm.generalTrialDetailsObj.central_contacts;}, function(newVal, oldVal) {

          if (angular.isArray(newVal) && newVal.length > 0 && !newVal[0].fullname) {
              vm.generalTrialDetailsObj.central_contacts[0] = newVal[0];
              var firstName = newVal[0].fname || '';
              var middleName = newVal[0].mname || '';
              var lastName = newVal[0].lname || '';
              var fullName = firstName + ' ' + middleName + ' ' + lastName;
              vm.generalTrialDetailsObj.central_contacts[0].fullname = (fullName).trim();
              vm.generalTrialDetailsObj.central_contacts[0].person_id = newVal[0].id || '';
              vm.generalTrialDetailsObj.central_contacts[0].phone = newVal[0].phone.replace(regex, '');
              delete vm.generalTrialDetailsObj.central_contacts[0].id;
          }
        });
      }

      var nameRequiredByCentralContactTypes = ['General', 'Person']; // name required for General and Person
      function watchCentralContactType() {
        $scope.$watch(function() { return vm.centralContactType;}, function(newVal, oldVal) {
            vm.centralContactNameRequired = _.contains(nameRequiredByCentralContactTypes, newVal); //!!newVal && newVal !== 'None';
            if (newVal === 'None' && vm.generalTrialDetailsObj.central_contacts.length > 0) {
                // delete the contact
                vm.generalTrialDetailsObj.central_contacts[0]._destroy = true; //
            } else if (newVal !== _getCentralContactType()) {
                if (newVal === 'PI') {
                    console.log('using pI');
                    _usePIAsCentralContact();
                } else {
                    // erase the previous value ???
                    vm.generalTrialDetailsObj.central_contacts = [].concat({email: '', phone: ''});
                }
            }
        });
      }

      function isValidPhoneNumber() {
          var phoneNumber = '';
          if (angular.isArray(vm.generalTrialDetailsObj.central_contacts) &&
                !!vm.generalTrialDetailsObj.central_contacts[0] &&
                !!vm.generalTrialDetailsObj.central_contacts[0].phone) {
              phoneNumber = vm.generalTrialDetailsObj.central_contacts[0].phone;
          }
          vm.isPhoneValid = phoneNumber.length === 0 || isValidNumberPO(phoneNumber, _defaultCountry);
      }

      /**
      * Use the Trial's PI as the central contact      *
      */
      function _usePIAsCentralContact() {
          if (_getCentralContactType() === 'PI') {
              // if the central contact type is already 'PI', do nothing here
              return;
          }

          vm.generalTrialDetailsObj.central_contacts[0] = {};
          vm.generalTrialDetailsObj.central_contacts[0]._destroy = false;
          vm.generalTrialDetailsObj.central_contacts[0].fullname = vm.principalInvestigator.name;
          vm.generalTrialDetailsObj.central_contacts[0].email = vm.generalTrialDetailsObj.pi.email;
          vm.generalTrialDetailsObj.central_contacts[0].phone = !!vm.generalTrialDetailsObj.pi.phone ? vm.generalTrialDetailsObj.pi.phone.replace(regex, '') : '';
          vm.generalTrialDetailsObj.central_contacts[0].person_id = vm.generalTrialDetailsObj.pi.id; //
          delete vm.generalTrialDetailsObj.central_contacts[0].id;
          vm.isPhoneValid = true;
      }


      /**
       * Add alternative titles
       * Return {Void}
       */
      function addAltTitle() {
          var _clonedAltTitle = {
              title: vm.curAlternateTitleObj.title,
              source: vm.curAlternateTitleObj.source.title,
              category: vm.curAlternateTitleObj.category.title,
              _destroy: false
          };
          vm.curAlternateTitleObj.title = ''; // clear up
          vm.generalTrialDetailsObj.alternate_titles.unshift(_clonedAltTitle);
      }

      /**
       * Update alternative title in the array at the position idx
       * @param  {String} newTitle [new alternative title]
       * @param  {Int} idx      [index of the title in the array]
       * @return {Void}
       */
      function updateAlternateTitle(newTitle, idx) {
          if (idx < vm.generalTrialDetailsObj.alternate_titles.length) {
              vm.generalTrialDetailsObj.alternate_titles[idx].title = newTitle;
          }
      }

      /**
       * Delete alternative title at position idx in the array
       * @param  {Int} idx      [index of the title in the array]
       * @return {Void}
       */
      function deleteAltTitle(idx) {
          if (idx < vm.generalTrialDetailsObj.alternate_titles.length) {
              vm.generalTrialDetailsObj.alternate_titles[idx]._destroy = !vm.generalTrialDetailsObj.alternate_titles[idx]._destroy;
          }
      }

      /**
       * Get the central contact type name if the central_contacts[0] has a valid central_contact_type_id (not null)
       * @return {[type]} [description]
       */
      function _getCentralContactType() {
          var typeName = 'None';
          if (angular.isDefined(vm.generalTrialDetailsObj.central_contacts) &&
                vm.generalTrialDetailsObj.central_contacts.length > 0 &&
                !!vm.generalTrialDetailsObj.central_contacts[0]) {

              _curCentralContactId = vm.generalTrialDetailsObj.central_contacts[0].id;
              var _centralContactTypeId = vm.generalTrialDetailsObj.central_contacts[0].central_contact_type_id;
              var _centralContactType = _.findWhere(vm.centralContactTypes, {id: parseInt(_centralContactTypeId)});
              typeName = !!_centralContactType ? _centralContactType.name : typeName;
          }

          return typeName;
      }

    } //generalTrialDetailCtrl

})();
