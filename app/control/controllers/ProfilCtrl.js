'use strict';

/**
 * @ngdoc function
 * @name pulsetotemCountdownClientApp.controller:ProfilCtrl
 * @description
 * # ProfilCtrl
 * Controller of the pulsetotemCountdownClientApp
 */
angular.module('PulseTotemControl')
  .controller('PulseTotemControl.ProfilCtrl', ['$rootScope', '$scope', '$routeParams', 'CountdownSocket', 'callbackManager', function($rootScope, $scope, $routeParams, CountdownSocket, callbackManager) {
    $scope.connected = false;

    $scope.countdown = null;

    var initSession = function() {
      if($scope.countdown == null) {
        $scope.countdown = {
          timer: {
            hours: 0,
            minutes: 0,
            seconds: 0
          }
        };
      }

      $scope.wait = function() {
        CountdownSocket.emit("Wait", {'countdown': $scope.countdown});
      };

      $scope.ready = function() {
        CountdownSocket.emit("Ready", {'countdown': $scope.countdown});
      };

      $scope.run = function() {
        CountdownSocket.emit("Run", {'countdown': $scope.countdown});
      };

      $scope.pause = function() {
        CountdownSocket.emit("Pause", {'countdown': $scope.countdown});
      };

      CountdownSocket.emit("SetProfilId", {'profilId': $routeParams.profilid});
    };

    CountdownSocket.init($routeParams.socketid, function() {
      $scope.$apply(function () {
        $scope.connected = true;
        initSession();
      });
    }, function(err) {
      console.error(err);
    });
  }]);
