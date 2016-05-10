(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name article.service:Article
   *
   * @description
   *
   */
  angular
    .module('auromira')
    .service('Article', Article);

  function Article(Data, Section, $firebaseObject, $firebaseArray, $window, Image) {
    var self = this,
        ref = Data.get(),
        articleRef = ref.child('articles');

    self.articles = $firebaseArray(articleRef);
    self.get = get;
    self.add = add;
    self.remove = remove;
    self.addCategory = addCategory;
    self.removeCategory = removeCategory;
    self.addCard = addCard;
    self.removeCard = removeCard;

    function get(articleId) {
      var child;
      if (articleId) {
        child = articleRef.child(articleId);
        return $firebaseObject(child);
      }
    }

    function add(sectionId, url, title) {
      Image.add(function (imageId) {
        Image.add(function (coverId) {
          self.articles.$add({
            url: url,
            title: title,
            imageId: imageId,
            coverId: coverId
          }).then(function (artRef) {
            var articleId = artRef.key();
            Section.addArticle(sectionId, articleId);
          });
        });
      });
    }

    function remove(sectionId, articleId) {
      var record = self.articles.$getRecord(articleId);
      self.articles.$remove(record).then(function () {
        Section.removeArticle(sectionId, articleId);
      });
    }

    function addCategory(articleId, title, callback) {
      var contentChild = articleRef.child(articleId)
                                .child('content'),
          contentRef = $firebaseArray(contentChild);
      contentRef.$add({
        title: title
      }).then(callback);
    }

    function removeCategory(articleId, categoryId, callback) {
      var categoryChild = articleRef.child(articleId)
                                .child('content')
                                .child(categoryId),
          categoryRef = $firebaseObject(categoryChild);
      categoryRef.$remove().then(callback);
    }

    function addCard(articleId, categoryId, cardId, callback) {
      var article = self.articles.$getRecord(articleId),
          cardObj = {
            cardId: cardId
          };
      // Add Card
      if (angular.isArray(article.content[categoryId].cards)) {
        article.content[categoryId].cards.push(cardObj);
      } else {
        article.content[categoryId].cards = [cardObj];
      }
      self.articles.$save(article).then(callback);
    }

    function removeCard(articleId, categoryId, cardId, callback) {
      var article = self.articles.$getRecord(articleId),
          index = article.content[categoryId].cards.indexOf(cardId);
      // Remove Card
      article.content[categoryId].cards.splice(index, 1);
      self.articles.$save(article).then(callback);
    }
  }
}());
