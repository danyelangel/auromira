(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name randomizer.directive:randomizerEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="randomizer">
       <file name="index.html">
        <randomizer-el></randomizer-el>
       </file>
     </example>
   *
   */
  angular
    .module('auromira')
    .directive('randomizerEl', randomizerEl);

  function randomizerEl() {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        quoteOptions: '=',
        shuffle: '='
      },
      bindToController: true,
      templateUrl: 'randomizer/randomizer-el-directive.tpl.html',
      replace: false,
      controllerAs: 'randomizerEl',
      controller: function ($scope, Auth) {
        var vm = this;

        vm.next = next;
        vm.previous = previous;
        vm.add = add;
        vm.remove = remove;
        vm.currentNumber = 0;
        vm.dataLength = 0;
        $scope.$watch('randomizerEl.data', dataReady);
        Auth.onAuth(function (authData) {
          vm.authData = authData;
          dataReady();
        });

        function add() {
          var quote = '<div><br></div>';
          vm.data.$add({
            quote: quote
          }).then(function (record) {
            vm.currentNumber = vm.data.$indexFor(record.key());
            dataReady();
          });
        }

        function remove() {
          var quote = vm.data[vm.currentNumber];
          vm.quotes.$remove(quote);
        }

        function next() {
          if (vm.currentNumber < vm.dataLength - 1) {
            vm.currentNumber++;
          } else {
            vm.currentNumber = 0;
          }
          vm.current = vm.quotes[vm.currentNumber];
        }

        function previous() {
          if (vm.currentNumber > 0) {
            vm.currentNumber--;
          } else {
            vm.currentNumber = vm.dataLength - 1;
          }
          vm.current = vm.quotes[vm.currentNumber];
        }

        function dataReady() {
          if (angular.isObject(vm.data)) {
            vm.data.$loaded().then(function () {
              vm.dataLength = vm.data.length;
              // Copy array to a local variable to keep fb intact
              if (!vm.authData) {
                vm.quotes = angular.copy(vm.data);
                if (vm.shuffle) {
                  shuffle(vm.quotes);
                }
                next();
              } else {
                vm.quotes = vm.data;
              }
              vm.current = vm.quotes[vm.currentNumber];
            });
          }
        }

        function shuffle(array) {
/* jshint ignore:start */
          var currentIndex = array.length, temporaryValue, randomIndex;

          // While there remain elements to shuffle...
          while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
/* jshint ignore:end */
          return array;
        }
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
