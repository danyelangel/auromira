(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name auromira.directive:sectionsEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="auromira">
       <file name="index.html">
        <sections-el></sections-el>
       </file>
     </example>
   *
   */
  angular
    .module('auromira')
    .directive('sectionsEl', sectionsEl);

  function sectionsEl() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: '/sections-wrapper/sections-el-directive.tpl.html',
      replace: false,
      controllerAs: 'sectionsEl',
      controller: function (Section) {
        var vm = this;
        vm.sections = Section.sections;
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
