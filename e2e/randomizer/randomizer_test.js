/* global describe, beforeEach, it, browser, expect */
'use strict';

var RandomizerPagePo = require('./randomizer.po');

describe('Randomizer page', function () {
  var randomizerPage;

  beforeEach(function () {
    randomizerPage = new RandomizerPagePo();
    browser.get('/#/randomizer');
  });

  it('should say RandomizerCtrl', function () {
    expect(randomizerPage.heading.getText()).toEqual('randomizer');
    expect(randomizerPage.text.getText()).toEqual('RandomizerCtrl');
  });
});
