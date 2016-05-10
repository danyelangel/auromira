/* global describe, beforeEach, it, browser, expect */
'use strict';

var ArticlePagePo = require('./article.po');

describe('Article page', function () {
  var articlePage;

  beforeEach(function () {
    articlePage = new ArticlePagePo();
    browser.get('/#/article');
  });

  it('should say ArticleCtrl', function () {
    expect(articlePage.heading.getText()).toEqual('article');
    expect(articlePage.text.getText()).toEqual('ArticleCtrl');
  });
});
