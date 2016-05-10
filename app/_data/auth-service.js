(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name auromira.service:Auth
   *
   * @description
   *
   */
  angular
    .module('auromira')
    .service('Auth', Auth);

  function Auth(Data, $firebaseAuth, $window) {
    var self = this,
        authObject = $firebaseAuth(Data.get());

    self.auth = auth;
    self.unauth = unauth;
    self.onAuth = onAuth;
    self.authData = null;

    authObject.$onAuth(function (authData) {
      self.authData = authData;
    });

    function auth() {
      var password = $window.prompt('Introduzca Contraseña');
      if (password) {
        authObject.$authWithPassword({
          email: 'danyelangel@hotmail.com',
          password: password
        }).then(function () {
        }).catch(function () {
          self.auth();
        });
      }
    }

    function unauth() {
      authObject.$unauth();
    }

    function onAuth(callback) {
      authObject.$onAuth(function (authData) {
        callback(authData);
      });
    }
  }
}());
