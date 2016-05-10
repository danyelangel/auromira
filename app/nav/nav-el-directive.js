(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name auromira.directive:navEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="auromira">
       <file name="index.html">
        <nav-el></nav-el>
       </file>
     </example>
   *
   */
  angular
    .module('auromira')
    .directive('navEl', navEl);

  function navEl() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: '/nav/nav-el-directive.tpl.html',
      replace: false,
      controllerAs: 'navEl',
      controller: function (Section, Metadata, $window, Auth, $scope, Router) {
        var vm = this;
        vm.nav = Metadata.nav;
        vm.footer = Metadata.footer;
        vm.sections = Section.sections;
        vm.add = add;
        vm.remove = remove;
        vm.auth = auth;
        vm.unauth = unauth;
        vm.router = Router;
        Auth.onAuth(function (authData) {
          vm.authData = authData;
        });
        Router.init($scope);
        Router.onSectionChange(function (routeObject) {
          vm.currentSection = routeObject.array[0];
        });

        function add() {
          var title = $window.prompt('Por favor ingrese título de la sección'),
              url = $window.prompt('Por favor ingrese un identificador único en minúscula sin espacios. Puede usar guiones.');
          Section.add(url, title);
        }

        function remove(section) {
          var confirm = $window.confirm('¿Está seguro que quiere eliminar esta sección?');
          if (confirm) {
            Section.remove(section);
          }
        }

        function auth() {
          Auth.auth();
        }

        function unauth() {
          Auth.unauth();
        }
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
