(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name article.directive:articleEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="article">
       <file name="index.html">
        <article-el></article-el>
       </file>
     </example>
   *
   */
  angular
    .module('auromira')
    .directive('articleEl', articleEl);

  function articleEl() {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        parentUrl: '='
      },
      bindToController: true,
      templateUrl: 'article/article-el-directive.tpl.html',
      replace: false,
      controllerAs: 'articleEl',
      controller: function ($scope, Image, Auth) {
        var vm = this;

        $scope.$watch('articleEl.data', dataReady);
        Auth.onAuth(function (authData) {
          vm.authData = authData;
        });

        function dataReady() {
          if (angular.isObject(vm.data)) {
            vm.data.$loaded().then(function () {
              vm.coverId = Image.get(vm.data.coverId);
              vm.url = vm.parentUrl + '/' + vm.data.url;
            });
          }
        }
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
