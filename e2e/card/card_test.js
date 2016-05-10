/* global describe, beforeEach, it, browser, expect */
'use strict';

var CardPagePo = require('./card.po');

describe('Card page', function () {
  var cardPage;

  beforeEach(function () {
    cardPage = new CardPagePo();
    browser.get('/#/card');
  });

  it('should say CardCtrl', function () {
    expect(cardPage.heading.getText()).toEqual('card');
    expect(cardPage.text.getText()).toEqual('CardCtrl');
  });
});
