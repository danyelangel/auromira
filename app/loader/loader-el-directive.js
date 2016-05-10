(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name auromira.directive:loaderEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="auromira">
       <file name="index.html">
        <loader-el></loader-el>
       </file>
     </example>
   *
   */
  angular
    .module('auromira')
    .directive('loaderEl', loaderEl);

  function loaderEl() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: '/loader-el-directive.tpl.html',
      replace: false,
      controllerAs: 'loaderEl',
      controller: function () {
        var vm = this;
        vm.name = 'loaderEl';
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
