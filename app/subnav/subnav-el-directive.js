(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name section.directive:subnavEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="section">
       <file name="index.html">
        <subnav-el></subnav-el>
       </file>
     </example>
   *
   */
  angular
    .module('auromira')
    .directive('subnavEl', subnavEl);

  function subnavEl() {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        sectionId: '=',
        parentUrl: '='
      },
      bindToController: true,
      templateUrl: 'subnav/subnav-el-directive.tpl.html',
      replace: false,
      controllerAs: 'subnavEl',
      controller: function ($scope, Article, $window, Auth, Router) {
        var vm = this;

        vm.add = add;
        vm.remove = remove;
        vm.router = Router;
        Router.onArticleChange(function (routeObject) {
          vm.currentArticle = routeObject.array[1];
        });
        Auth.onAuth(function (authData) {
          vm.authData = authData;
        });
        $scope.$watch('subnavEl.data', dataReady);
        $scope.$watch('subnavEl.parentUrl', function () {
          Router.onSectionChange(function (routeObject) {
            if (routeObject.array[0] === vm.parentUrl && !routeObject.isArticle) {
              Router.routeTo(vm.parentUrl, vm.data[0].url);
            }
          });
        });

        function dataReady() {
          if (angular.isObject(vm.data)) {
            // Check that at least one link has a title. If not
            // hide component.
            angular.forEach(vm.data, function (value) {
              value.$loaded().then(function () {
                if (angular.isDefined(value.title) && value.title.length > 0) {
                  vm.show = true;
                }
              });
            });
            // Check Scroll
          }
        }

        function add() {
          var title = $window.prompt('Por favor ingrese título del artículo'),
              url = $window.prompt('Por favor ingrese un identificador único en minúscula sin espacios. Puede usar guiones.');
          if (url) {
            Article.add(vm.sectionId, url, title);
          }
        }

        function remove(item) {
          Article.remove(vm.sectionId, item.$id);
        }
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
