(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name auromira.directive:footerEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="auromira">
       <file name="index.html">
        <footer-el></footer-el>
       </file>
     </example>
   *
   */
  angular
    .module('auromira')
    .directive('footerEl', footerEl);

  function footerEl() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: '/footer/footer-el-directive.tpl.html',
      replace: false,
      controllerAs: 'footerEl',
      controller: function (Metadata, Auth) {
        var vm = this;
        Auth.onAuth(function (authData) {
          vm.authData = authData;
        });
        vm.footer = Metadata.footer;
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
