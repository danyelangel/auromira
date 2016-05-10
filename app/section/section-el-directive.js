(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name section.directive:sectionEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="section">
       <file name="index.html">
        <section-el></section-el>
       </file>
     </example>
   *
   */
  angular
    .module('auromira')
    .directive('sectionEl', sectionEl);

  function sectionEl() {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      bindToController: true,
      templateUrl: 'section/section-el-directive.tpl.html',
      replace: false,
      controllerAs: 'sectionEl',
      controller: function ($scope, Article, Section) {
        var vm = this;

        vm.articles = [];
        Section.sections.$watch(dataReady);
        $scope.$watch('sectionEl.data', dataReady);

        function dataReady() {
          if (angular.isObject(vm.data)) {
            vm.title = vm.data.title;
            vm.url = vm.data.url;
            angular.forEach(vm.data.articles, getArticle);
          }
        }

        function getArticle(articleId, key) {
          vm.articles[key] = Article.get(articleId);
        }
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
