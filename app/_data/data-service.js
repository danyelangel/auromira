/* globals Firebase */
(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name auromira.service:Data
   *
   * @description
   *
   */
  angular
    .module('auromira')
    .service('Data', Data);

  function Data() {
    var self = this,
        ref = new Firebase('http://auromira.firebaseio.com/');
    self.get = function () {
      return ref;
    };
  }
}());
