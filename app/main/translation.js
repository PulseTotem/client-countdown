'use strict';

/**
 * @ngdoc overview
 * @name pulsetotemCountdownClientApp
 * @description
 * # translation
 *
 * Define translation configuration for application.
 */
angular
    .module('pulsetotemCountdownClientApp')
    .config(['$translateProvider', function($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: '/locales/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage(['en', 'fr']);
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useMissingTranslationHandlerLog();
    }]);

