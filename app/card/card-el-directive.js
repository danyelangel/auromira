(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name card.directive:cardEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="card">
       <file name="index.html">
        <card-el></card-el>
       </file>
     </example>
   *
   */
  angular
    .module('auromira')
    .directive('cardEl', cardEl);

  function cardEl() {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        parentUrl: '='
      },
      bindToController: true,
      templateUrl: 'card/card-el-directive.tpl.html',
      replace: false,
      controllerAs: 'cardEl',
      controller: function ($scope, Image, Auth, $window, Randomizer) {
        var vm = this;

        vm.updateImg = updateImg;
        Auth.onAuth(function (authData) {
          vm.authData = authData;
        });
        $scope.$watch('cardEl.data', dataReady);

        function dataReady() {
          if (angular.isObject(vm.data)) {
            vm.data.$loaded().then(function () {
              vm.image = Image.get(vm.data.imageId);
              vm.randomizer = Randomizer.get(vm.data.randomizerId);
            });
          }
        }

        function updateImg(imgObject) {
          var imageUrl = $window.prompt('Ingrese url de la imagen', imgObject.data);
          if (imageUrl) {
            imgObject.data = imageUrl;
            imgObject.$save();
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
