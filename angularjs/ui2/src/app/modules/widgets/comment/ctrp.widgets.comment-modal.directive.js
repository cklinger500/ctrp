/**
 * Created by wangg5 on 10/26/15.
 */

(function() {
  'use strict';

  angular.module('ctrpApp.widgets')
  .directive('ctrpCommentModal', ctrpCommentModal);

  ctrpCommentModal.$inject = ['$compile', '$log', 'CommentService', '$mdDialog',
  '$mdToast', '$document', 'UserService'];

  function ctrpCommentModal($compile, $log, CommentService, $mdDialog, $mdToast, $document, UserService) {

    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {

      attrs.$observe('uuid', function(newVal) {
        if (newVal) {
          scope.uuid = newVal;
          scope.field = attrs.field || '';
          scope.model = attrs.model || '';
          element.show();
          getCommentCounts();
        } else {
          element.hide();
        }
      }, true);

      element.bind('click', function(e) {
        $mdDialog.show({
          templateUrl: 'app/modules/widgets/comment/ctrp.widgets.comment-modal-template.html',
          targetEvent: e,
          locals: {
            instanceUuid: attrs.uuid,
            field: scope.field,
            model: scope.model
          },
          clickOutsideToClose: true,
          scope: scope.$new(), //create a child scope
          controller: commentPanelCtrl
        }).then(getCommentCounts);
      }); //bind click event


      function getCommentCounts() {
        CommentService.getCommentCounts(scope.uuid, scope.field)
          .then(function(data) {
              var status = data.server_response.status;

              if (status >= 200 && status <= 210) {
                  scope.numComments = data.count;
                  if (scope.numComments > 0) {
                    element.html('<span><strong>' + scope.numComments + '</strong></span> <i class="glyphicon glyphicon-comment" style="vertical-align: middle;"></i>');
                  }
              }
        });
      } //getCommentCounts

    } //link







    function commentPanelCtrl($scope, $mdDialog, instanceUuid,
      field, model, UserService, CommentService) {
      $scope.showCommentForm = false;
      $scope.postComment = postComment;
      $scope.commentList = []; //container of comments
      $scope.pagingOptions = {currentPage: 1, pageSize: 10};
      $scope.updateComment = updateComment;

      $scope.comment = {
      content: "",
      fullname: "", //TODO: get user full name from UserService
      model: model,
      username: UserService.getLoggedInUsername(),
      field: field || '',
      instance_uuid: instanceUuid,
      parent_id: ''
      };

      $scope.toggleCommentFormShown = function() {
        $scope.showCommentForm = !$scope.showCommentForm;
      };
      $scope.close = function() {
        $mdDialog.hide();
      };

      activate();


      function activate() {
        fetchComments();
      }

      function fetchComments() {
        CommentService.getComments(instanceUuid, field)
        .then(function(data) {
            var status = data.server_response.status;

            if (status >= 200 && status <= 210) {
                $scope.commentList = CommentService.annotateCommentIsEditable(data.comments);
            }
        }).catch(function(error) {
            $log.error('error in retrieving comments for instance uuid: ' + instanceUuid);
        });
      } //fetchComments

      function postComment() {
        CommentService.createComment($scope.comment).then(function(response) {
          $scope.comment.content = '';
          var status = response.server_response.status;

          if (status >= 200 && status <= 210) {
            fetchComments(); //fetch the latest comments
            $scope.toggleCommentFormShown();
            showToastr('Comment created', 'right');
          }
        }).catch(function(err) {
          $log.error('error in creating comments: ' + JSON.stringify($scope.comment));
        });
      } //postComment


      //update
      function updateComment(newContent, commentObjIndex) {
        if (commentObjIndex > -1) {
          var editedComment = angular.copy($scope.commentList[commentObjIndex]);
          editedComment.content = newContent;
          CommentService.updateComment(editedComment).then(function(response) {
              var status = response.server_response.status;

              if (status >= 200 && status <= 210) {
                  // fetchComments();
                  showToastr('Comment updated', 'right');
              }
          }).catch(function(err) {
            //TODO: throw a toastr
            $log.error('error in updating comment: ' + newContent);
          });
        }
      } //updateComment


      function showToastr(message, position) {
        $mdToast.show({
          template: '<md-toast style="background-color: #6200EA"><span flex>' + message + '</span></md-toast>',
          parent: $document[0].querySelector('#toastr_message'),
          hideDelay: 1000,
          position: 'right'
        });
      } //showToastr





    } //commentPanelCtrl



  }

})();
