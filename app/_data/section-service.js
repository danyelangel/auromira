(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name section.service:Section
   *
   * @description
   *
   */
  angular
    .module('auromira')
    .service('Section', Section);

  function Section(Data, $firebaseArray) {
    var self = this,
        ref = Data.get(),
        child = ref.child('sections');

    self.sections = $firebaseArray(child);
    self.add = add;
    self.remove = remove;
    self.addArticle = addArticle;
    self.removeArticle = removeArticle;

    function add(url, title) {
      if (angular.isString(url) && url.length > 0) {
        self.sections.$add({
          url: url,
          title: title
        });
      }
    }

    function remove(section) {
      self.sections.$remove(section);
    }

    function addArticle(sectionId, articleId) {
      var section = self.sections.$getRecord(sectionId);
      console.log(section);
      // Add Article
      if (angular.isArray(section.articles)) {
        section.articles.push(articleId);
      } else {
        section.articles = [articleId];
      }
      self.sections.$save(section).then(function () {
      });
    }

    function removeArticle(sectionId, articleId) {
      var section = self.sections.$getRecord(sectionId),
          index = section.articles.indexOf(articleId);
      // Remove Article
      section.articles.splice(index, 1);
      self.sections.$save(section).then(function () {
      });
    }
  }
}());
