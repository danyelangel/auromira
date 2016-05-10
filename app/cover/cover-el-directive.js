(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name article.directive:coverEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="article">
       <file name="index.html">
        <cover-el></cover-el>
       </file>
     </example>
   *
   */
  angular
    .module('auromira')
    .directive('coverEl', coverEl);

  function coverEl() {
    return {
      restrict: 'EA',
      scope: {
        data: '='
      },
      bindToController: true,
      templateUrl: 'cover/cover-el-directive.tpl.html',
      replace: false,
      controllerAs: 'coverEl',
      controller: function (parallaxHelper, Auth, Image, $window, screenSize, $scope) {
        var vm = this;
        vm.name = 'coverEl';
        vm.changeImg = changeImg;
        Auth.onAuth(function (authData) {
          vm.authData = authData;
        });
        if (screenSize.is('lg')) {
          vm.background = parallaxHelper.createAnimator(-0.3);
        } else {
          vm.background = {};
          $scope.$apply();
        }
        screenSize.on('lg', function (isMatch) {
          if (isMatch) {
            vm.background = parallaxHelper.createAnimator(-0.3);
          } else {
            vm.background = {};
            $scope.$apply();
          }
        });

        function changeImg() {
          var imageUrl;
          if (vm.data && angular.isString(vm.data.data)) {
            imageUrl = vm.data.data;
          } else {
            imageUrl = '';
          }
          if (vm.authData) {
            imageUrl = $window.prompt('Inserte url de la imagen', imageUrl);
            if (imageUrl) {
              vm.data.data = imageUrl;
              vm.data.$save();
            }
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
