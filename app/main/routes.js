'use strict';

/**
 * @ngdoc overview
 * @name pulsetotemCountdownClientApp
 * @description
 * # routes
 *
 * Define routes available in application.
 */
angular
  .module('pulsetotemCountdownClientApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider

      // Routes for home
      .when('/', {
        templateUrl: '../common/views/home.html',
        controller: 'PulseTotemCommon.HomeCtrl'
      })

      // Routes for screen control
      .when('/profil/:profilid', {
        templateUrl: '../control/views/profil.html',
        controller: 'PulseTotemControl.ProfilCtrl'
      })

      // All other stuff
      .otherwise({
        redirectTo: '/'
      });
  }]);
