'use strict';

/**
 * @ngdoc service
 * @name pulsetotemCountdownClientApp.PulseTotemCommon.factory:callbackManager
 * @description
 * # factory : callbackManager
 * Factory in the pulsetotemCountdownClientApp.
 */
angular.module('PulseTotemCommon')
  .factory('callbackManager', function () {

    return function (backendMessage, successCallback, failCallback) {
      if (backendMessage.success == true) {
        successCallback(backendMessage.response);
      } else {
        failCallback(backendMessage.response);
      }
    }
  });
