(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name article.directive:sliderEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="article">
       <file name="index.html">
        <slider-el></slider-el>
       </file>
     </example>
   *
   */
  angular
    .module('auromira')
    .directive('sliderEl', sliderEl);

  function sliderEl() {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        parentUrl: '='
      },
      bindToController: true,
      templateUrl: 'slider/slider-el-directive.tpl.html',
      replace: false,
      controllerAs: 'sliderEl',
      controller: function ($scope, Image, Card, Article, $window, Auth, Router, $document, $timeout) {
        var vm = this,
            currentCardKey;

        vm.cards = [];
        vm.images = [];
        vm.router = Router;
        vm.currentSlide = 0;
        vm.changeSlide = changeSlide;
        vm.updateImg = updateImg;
        vm.addCategory = addCategory;
        vm.removeCategory = removeCategory;
        vm.addCard = addCard;
        vm.removeCard = removeCard;
        vm.scrollFire = scrollFire;
        Auth.onAuth(function (authData) {
          vm.authData = authData;
        });
        Router.onCardChange(routeCard);
        Router.onArticleChange(scrollToSelf);
        $scope.$watch('sliderEl.data', dataReady);
        $scope.$watch('sliderEl.parentUrl', function () {
          $timeout(function () {
            Router.checkHash();
          });
          $timeout(function () {
            Router.checkHash();
          }, 1000);
          $timeout(function () {
            Router.checkHash();
          }, 2000);
        });

        function dataReady() {
          if (angular.isObject(vm.data)) {
            vm.data.$loaded().then(function () {
              vm.image = Image.get(vm.data.imageId);
              vm.content = angular.copy(vm.data.content);
              vm.showGridMenu = vm.data.showGridMenu;
              // Create stlye variable for slider transformation
              vm.changeSlide(0, true);
              currentCardKey = 1;
              // For each menu section, get card references and
              // add to vm.cards array with a numeric order.
              angular.forEach(vm.content, addContentSection);
              // Reset currentCardKey
              currentCardKey = 1;
              // Replace imagelinks with actual images if
              // vm.showGridMenu===true
              if (vm.data.showGridMenu) {
                getImages();
              }
            });
          }
        }

        function getImages() {
          angular.forEach(vm.cards, function (card, key) {
            card.$loaded().then(function () {
              vm.images[key] = Image.get(card.imageId);
            });
          });
        }

        function routeCard(routeObject) {
          if (routeObject.contains(vm.parentUrl)) {
            changeSlide(routeObject.array[2]);
          }
        }

        function scrollFire() {
          if (Router.route.indexOf(vm.parentUrl) < 0) {
            Router.setRouteUrl(vm.parentUrl);
            $scope.$apply();
          }
        }

        function scrollToSelf(routeObject, preventScroll) {
          if (routeObject.contains(vm.parentUrl) && !preventScroll) {
            if (!routeObject.isCard) {
              changeSlide(0);
            } else {
              $document.scrollTo(vm.el, 64, 500);
            }
          }
        }

        function changeSlide(number, preventScroll) {
          vm.previousSlide = vm.currentSlide;
          vm.currentSlide = number;
          vm.previousSlide = null;
          if (!preventScroll) {
            $document.scrollTo(vm.el, 64, 500);
          }
        }

        // Editing
        function addContentSection(section, sectionKey) {
          angular.forEach(section.cards, function (cardRef, cardKey) {
            vm.cards[currentCardKey] = Card.get(cardRef.cardId);
            vm.content[sectionKey]
              .cards[cardKey]
              .slideUrl = currentCardKey;
            currentCardKey++;
          });
        }

        function addCategory() {
          var title = 'Nueva Categoría 1',
              articleId = vm.data.$id;
          Article.addCategory(articleId, title, dataReady);
        }

        function removeCategory(categoryId) {
          var articleId = vm.data.$id;
          Article.removeCategory(articleId, categoryId, dataReady);
        }

        function addCard(categoryId) {
          var title = 'Nueva Tarjeta 1',
              articleId = vm.data.$id;
          Card.add(articleId, categoryId, title, dataReady);
        }

        function removeCard(categoryId, cardId) {
          var articleId = vm.data.$id;
          Card.remove(articleId, categoryId, cardId, dataReady);
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
        scope.sliderEl.element = element;
        scope.sliderEl.el = element[0];
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
