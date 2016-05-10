(function () {
  'use strict';

  /* @ngdoc object
   * @name auromira
   * @description
   *
   */
  angular
    .module('auromira', [
      'firebase',
      'duScroll',
      'duParallax',
      'angular-medium-editor',
      'ngSanitize',
      'ui.scrollpoint',
      'rt.debounce',
      'matchMedia'
    ]);
}());
