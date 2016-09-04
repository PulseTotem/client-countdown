'use strict';

/**
 * @ngdoc function
 * @name pulsetotemCountdownClientApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the pulsetotemCountdownClientApp
 */
angular.module('PulseTotemCommon')
    .controller('PulseTotemCommon.MenuCtrl', ['$rootScope', '$scope', '$translate', function ($rootScope, $scope, $translate) {

        $scope.langKey = $translate.use();

        $scope.changeLanguage = function (langKey) {
          $scope.langKey = langKey;
          $translate.use(langKey);
        };

    }]);
