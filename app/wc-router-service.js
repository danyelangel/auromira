(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name auromira.service:WcRouter
   *
   * @description
   *
   */
  angular
    .module('auromira')
    .service('Router', Router);

  function Router($document, $window, $timeout, Auth) {
    var self = this;

    self.init = init;
    self.routeTo = routeTo;
    self.routeToUrl = routeToUrl;
    self.setRouteUrl = setRouteUrl;
    self.goToFooter = goToFooter;
    self.checkHash = checkHash;
    self.callbacks = {
      section: [],
      article: [],
      card: []
    };
    self.onCardChange = onCard;
    self.onArticleChange = onArticle;
    self.onSectionChange = onSection;

    function init($scope) {
      $scope.$watch(function () {
        return $window.location.hash;
      }, checkHash);
    }

    function onCard(callback) {
      self.callbacks.card.push(callback);
    }
    function onArticle(callback) {
      self.callbacks.article.push(callback);
    }
    function onSection(callback) {
      self.callbacks.section.push(callback);
    }

    function checkHash() {
      var routeObject = decomposeRoute($window.location.hash);
      if ($window.location.hash.indexOf('edit') > -1) {
        Auth.auth();
      } else {
        notify(routeObject);
      }
    }

    function notify(routeObject, preventScroll) {
      var check = angular.isObject(routeObject);
      if (check) {
        if (routeObject.isSection) {
          fireCallbacks(self.callbacks.section, routeObject, preventScroll);
        }
        if (routeObject.isCard) {
          fireCallbacks(self.callbacks.card, routeObject, preventScroll);
        } else if (routeObject.isArticle) {
          fireCallbacks(self.callbacks.article, routeObject, preventScroll);
        }
        if (!routeObject.isSection) {
          $document.scrollTop(0, 500);
        }
        self.route = routeObject.route;
      }
    }

    function routeTo(sectionId, articleId, cardId) {
      var url = sectionId;
      if (articleId) {
        url = url + '/' + articleId;
      }
      if (cardId) {
        url = url + '/' + cardId;
      }
      routeToUrl(url);
    }

    function routeToUrl(hash) {
      var url = '';
      if (hash) {
        url = '#/' + hash;
      }
      notify(decomposeRoute(url));
      self.scrolling = true;
      $timeout(function () {
        self.scrolling = false;
      }, 500);
      $window.location.hash = url;
    }

    function goToFooter() {
      $document.scrollTop($document[0].body.offsetHeight, 500);
      self.scrolling = true;
      $timeout(function () {
        self.scrolling = false;
      }, 500);
      $window.location.hash = '#/contact';
      self.route = $window.location.hash;
    }

    function setRouteUrl(hash) {
      var url;
      if (angular.isString(hash) && !self.scrolling) {
        url = '#/' + hash;
        notify(decomposeRoute(url), true);
        $window.location.hash = url;
      }
    }

    function decomposeRoute(route) {
      var routeArray = route.substr(2).split('/'),
          elementId = '#' + replaceAll(route.substr(2), '/', '-');
      switch (routeArray.length) {
        case 0:
          return makeRouteObject('home');
        case 1:
          return makeRouteObject('section');
        case 2:
          return makeRouteObject('article');
        case 3:
          return makeRouteObject('card');
        default:
          return null;
      }

      function makeRouteObject(type) {
        var isSection = false,
            isArticle = false,
            isCard = false;
        switch (type) {
          case 'home':
            break;
          case 'section':
            isSection = true;
            break;
          case 'article':
            isSection = true;
            isArticle = true;
            break;
          case 'card':
            isSection = true;
            isArticle = true;
            isCard = true;
            break;
          default:
            break;
        }
        return {
          array: routeArray,
          route: route,
          elementId: elementId,
          isSection: isSection,
          isArticle: isArticle,
          isCard: isCard,
          contains: function (substring) {
            return route.indexOf(substring) > -1;
          }
        };
      }
    }

    function fireCallbacks(callback, object, preventScroll) {
      angular.forEach(callback, function (value) {
        value(object, preventScroll);
      });
    }

    function replaceAll(target, search, replacement) {
      return target.replace(new RegExp(search, 'g'), replacement);
    }
  }
}());
