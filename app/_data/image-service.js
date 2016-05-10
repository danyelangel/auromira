(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name auromira.service:Image
   *
   * @description
   *
   */
  angular
    .module('auromira')
    .service('Image', Image);

  function Image(Data, $firebaseObject, $firebaseArray) {
    var self = this,
        ref = Data.get(),
        imagesRef = ref.child('images');

    self.get = get;
    self.add = add;
    self.remove = remove;
    self.images = $firebaseArray(imagesRef);

    function get(imageId) {
      var child;
      if (imageId) {
        child = imagesRef.child(imageId);
        return $firebaseObject(child);
      }
    }

    function add(callback) {
      self.images.$add({
        type: 'url'
      }).then(function (imgRef) {
        var imageId = imgRef.key();
        callback(imageId);
      });
    }

    function remove(imageId) {
      self.get(imageId).$remove();
    }
  }
}());
