(function () {
    'use strict';

    angular.module('ctrpApp.widgets')
        .factory('CommentService', CommentService);

    CommentService.$inject = ['URL_CONFIGS', '$http', '$log', '_', 'Common',
      'UserService', 'PromiseTimeoutService', '$q'];

    function CommentService(URL_CONFIGS, $http, $log, _, Common,
      UserService, PromiseTimeoutService, $q) {
      //TODO: data services for comments

      return {
        getCommentCounts: getCommentCounts,
        createComment: createComment,
        getComments: getComments,
        updateComment: updateComment,
        deleteComment: deleteComment,
        annotateCommentIsEditable: annotateCommentIsEditable
      };

      ///// implementations

      function getCommentCounts(instanceUuid, optionalField) {
        if (instanceUuid) {
          var url = URL_CONFIGS.COMMENTS.COUNTS_FOR_INSTANCE.replace(/\s*\{.*?\}\s*/g, instanceUuid);
          if (optionalField) {
            url = url.replace('.json', '/' + optionalField + '.json');
          }
          return PromiseTimeoutService.getData(url);
        }
        var deferred = $q.defer();
        deferred.reject(null);
        return deferred.promise; //failed promise
      } //getCommentCounts

      /**
      * POST commentObj to API
      */
      function createComment(commentObj) {
        $log.info('posting comment: ' + JSON.stringify(commentObj));
        $log.info('url: ' + URL_CONFIGS.COMMENTS.CREATE);
        return PromiseTimeoutService.postDataExpectObj(URL_CONFIGS.COMMENTS.CREATE, commentObj);
      } //createComment


      function getComments(instanceUuid, optionalField) {
        if (instanceUuid) {
          var url = URL_CONFIGS.COMMENTS.FOR_INSTANCE.replace(/\s*\{.*?\}\s*/g, instanceUuid);
          if (optionalField) {
            url = url.replace('.json', '/' + optionalField + '.json');
          }
          return PromiseTimeoutService.getData(url);
        }
        var deferred = $q.defer();
        deferred.reject(null);
        return deferred.promise; //failed promise
      } //getComments

      //update
      function updateComment(editedCommentObj) {
        //check commentId
        console.log('editedCommentObj: ' + JSON.stringify(editedCommentObj));
        if (editedCommentObj.id) {
          // 'WITH_ID': '/ctrp/comments/{:id}.json'
          var url = URL_CONFIGS.COMMENTS.WITH_ID.replace(/\s*\{.*?\}\s*/g, editedCommentObj.id);
          return PromiseTimeoutService.updateObj(url, editedCommentObj, {});
        }
        var deferred = $q.defer();
        deferred.reject(null);
        return deferred.promise; //failed promise
      } //editComment


      function deleteComment(commentId) {
        //TODO: delete a comment
      } //deleteComment


      /**
      * Based on the user role or the username, annotate if the comment is editable
      * to the currently logged in user
      */
      function annotateCommentIsEditable(comments) {
        var annotatedComments = [];
        //TODO: this should be placed in a Service component
        var userRolesAllowedToEdit = ['ROLE_ADMIN', 'ROLE_SUPER', 'ROLE_CURATOR'];

        if (angular.isArray(comments)) {
            var totalComments = comments.length;
            var isEditable = userRolesAllowedToEdit.indexOf(UserService.getUserRole()) > -1;
            annotatedComments = comments.map(function(comment, index) {
              comment.index = totalComments - index;
              if (isEditable || comment.username === UserService.getLoggedInUsername()) {
                comment.isEditable = true;
              } else {
                comment.isEditable = false;
              }
              return comment;
            });
        }
      //  console.log('after annotation: ' + JSON.stringify(annotatedComments));
        return annotatedComments;
      } //annotateCommentIsEditable

    }

})();
