'use strict';

/**
 * @ngdoc function
 * @name pulsetotemCountdownClientApp.factory:CountdownSocket
 * @description
 * # CountdownSocket Factory
 * Factory of the pulsetotemCountdownClientApp
 */
angular.module('PulseTotemCommon')
  .factory('CountdownSocket', ['$rootScope', 'CONSTANTS', 'callbackManager', 'socketFactory', function ($rootScope, CONSTANTS, callbackManager, socketFactory) {
    var CountdownSocketFactory = {};
    CountdownSocketFactory.CountdownSocket = null;

    CountdownSocketFactory.init = function(callSocketId, successCB, failCB) {
      var CountdownIOSocket = io(CONSTANTS.CountdownServiceUrl + CONSTANTS.CountdownClientPath,
        {
          'reconnection': true,
          'reconnectionAttempts': 10,
          'reconnectionDelay': 1000,
          'reconnectionDelayMax': 5000,
          'timeout': 5000,
          'autoConnect': true,
          'multiplex': false
        });

      CountdownIOSocket.on("connect", function () {
        successCB();
      });

      CountdownIOSocket.on("error", function (errorData) {
        console.error("An error occurred during connection to CountdownService.");
        console.log(errorData);
        failCB("An error occurred during connection to CountdownService.");
      });

      CountdownIOSocket.on("disconnect", function () {
        console.info("Disconnected from CountdownService.");
      });

      CountdownIOSocket.on("reconnect", function (attemptNumber) {
        console.info("Connected to CountdownService after " + attemptNumber + " attempts.");
      });

      CountdownIOSocket.on("reconnect_attempt", function () {
        console.info("Trying to reconnect to CountdownService.");
      });

      CountdownIOSocket.on("reconnecting", function (attemptNumber) {
        console.info("Trying to connect to CountdownService - Attempt number " + attemptNumber + ".");
      });

      CountdownIOSocket.on("reconnect_error", function (errorData) {
        console.error("An error occurred during reconnection to CountdownService.");
        console.log(errorData);
      });

      CountdownIOSocket.on("reconnect_failed", function () {
        console.error("Failed to connect to CountdownService. New attempt will be done in 5 seconds. Administrators received an Alert !");
        //TODO: Send an email and Notification to Admins !

        setTimeout(function() {
          CountdownSocketFactory.CountdownSocket = null;
          CountdownSocketFactory.init(callSocketId, successCB, failCB);
        }, 5000);
      });

      var CountdownSocket = socketFactory({
        ioSocket: CountdownIOSocket
      });

      CountdownSocketFactory.CountdownSocket = CountdownSocket;
    };

    CountdownSocketFactory.exit = function() {
      CountdownSocketFactory.CountdownSocket = null;
    };

    CountdownSocketFactory.on = function() {
      if(CountdownSocketFactory.CountdownSocket != null) {
        CountdownSocketFactory.CountdownSocket.removeAllListeners(arguments[0]);
        CountdownSocketFactory.CountdownSocket.on.apply(this,arguments);
      } else {
        console.error("An error occurred : CountdownService isn't initialized.");
      }
    };

    CountdownSocketFactory.addListener = function() {
      if(CountdownSocketFactory.CountdownSocket != null) {
        CountdownSocketFactory.CountdownSocket.removeAllListeners(arguments[0]);
        CountdownSocketFactory.CountdownSocket.addListener.apply(this,arguments);
      } else {
        console.error("An error occurred : CountdownService isn't initialized.");
      }
    };

    CountdownSocketFactory.removeListener = function() {
      if(CountdownSocketFactory.CountdownSocket != null) {
        CountdownSocketFactory.CountdownSocket.removeListener.apply(this,arguments);
      } else {
        console.error("An error occurred : CountdownService isn't initialized.");
      }
    };

    CountdownSocketFactory.removeAllListeners = function() {
      if(CountdownSocketFactory.CountdownSocket != null) {
        CountdownSocketFactory.CountdownSocket.removeAllListeners.apply(this,arguments);
      } else {
        console.error("An error occurred : CountdownService isn't initialized.");
      }
    };

    CountdownSocketFactory.emit = function() {
      if(CountdownSocketFactory.CountdownSocket != null) {
        CountdownSocketFactory.CountdownSocket.emit.apply(this,arguments);
      } else {
        console.error("An error occurred : CountdownService isn't initialized.");
      }
    };

    CountdownSocketFactory.forward = function() {
      if(CountdownSocketFactory.CountdownSocket != null) {
        CountdownSocketFactory.CountdownSocket.forward.apply(this,arguments);
      } else {
        console.error("An error occurred : CountdownService isn't initialized.");
      }
    };

    return CountdownSocketFactory;
  }]);
