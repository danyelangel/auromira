(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name auromira.service:Metadata
   *
   * @description
   *
   */
  angular
    .module('auromira')
    .service('Metadata', Metadata);

  function Metadata(Data, $firebaseObject) {
    var self = this,
        ref = Data.get(),
        metadata = ref.child('metadata'),
        navRef = metadata.child('nav'),
        splashRef = metadata.child('splash'),
        footerRef = metadata.child('footer');

    self.nav = $firebaseObject(navRef);
    self.splash = $firebaseObject(splashRef);
    self.footer = $firebaseObject(footerRef);
  }
}());
