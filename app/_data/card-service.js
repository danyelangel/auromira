(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name card.service:Card
   *
   * @description
   *
   */
  angular
    .module('auromira')
    .service('Card', Card);

  function Card(Data, $firebaseObject, $firebaseArray, Article, Image, Randomizer) {
    var self = this,
        ref = Data.get(),
        cards = ref.child('cards');

    self.cards = $firebaseArray(cards);
    self.get = get;
    self.add = add;
    self.remove = remove;

    function get(cardId) {
      var child;
      if (cardId) {
        child = cards.child(cardId);
        return $firebaseObject(child);
      }
    }

    function add(articleId, categoryId, title, callback) {
      Image.add(function (imageId) {
        Randomizer.add(function (randomizerId) {
          self.cards.$add({
            title: title,
            imageId: imageId,
            randomizerId: randomizerId
          }).then(function (cardRef) {
            var cardId = cardRef.key();
            Article.addCard(articleId, categoryId, cardId, callback);
          });
        });
      });
    }

    function remove(articleId, categoryId, cardId, callback) {
      var record = self.cards.$getRecord(cardId);
      self.cards.$remove(record).then(function () {
        Article.removeCard(articleId, categoryId, cardId, callback);
      });
    }
  }
}());
