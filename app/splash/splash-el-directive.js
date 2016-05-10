(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name auromira.directive:splashEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="auromira">
       <file name="index.html">
        <splash-el></splash-el>
       </file>
     </example>
   *
   */
  angular
    .module('auromira')
    .directive('splashEl', splashEl);

  function splashEl() {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: '/splash/splash-el-directive.tpl.html',
      replace: false,
      controllerAs: 'splashEl',
      controller: function (Metadata, Randomizer, Image, Router, parallaxHelper) {
        var vm = this;
        vm.splash = Metadata.splash;
        vm.scrollFire = scrollFire;
        vm.background = parallaxHelper.createAnimator(-0.3);
        vm.splash.$loaded().then(function () {
          vm.randomizer = Randomizer.get(vm.splash.randomizerId);
          vm.image = Image.get(vm.splash.imageId);
        });

        function scrollFire() {
          console.log('home');
          Router.setRouteUrl('');
        }
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
