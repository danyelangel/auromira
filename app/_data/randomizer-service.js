(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name auromira.service:Randomizer
   *
   * @description
   *
   */
  angular
    .module('auromira')
    .service('Randomizer', Randomizer);

  function Randomizer(Data, $firebaseArray) {
    var self = this,
        ref = Data.get(),
        randomizerRef = ref.child('randomizers');

    self.get = get;
    self.add = add;
    self.remove = remove;
    self.randomizers = $firebaseArray(randomizerRef);

    function get(randomizerId) {
      var child;
      if (randomizerId) {
        child = randomizerRef.child(randomizerId);
        return $firebaseArray(child);
      }
    }

    function add(callback) {
      self.randomizers.$add().then(function (randRef) {
        var randomizerId = randRef.key();
        self.get(randomizerId).$add({
          quote: '<div><br></div>'
        }).then(function () {
          callback(randomizerId);
        });
      });
    }

    function remove(randomizerId) {
      self.get(randomizerId).$remove();
    }
  }
}());
