/* global describe, beforeEach, it, browser, expect */
'use strict';

var SectionPagePo = require('./section.po');

describe('Section page', function () {
  var sectionPage;

  beforeEach(function () {
    sectionPage = new SectionPagePo();
    browser.get('/#/section');
  });

  it('should say SectionCtrl', function () {
    expect(sectionPage.heading.getText()).toEqual('section');
    expect(sectionPage.text.getText()).toEqual('SectionCtrl');
  });
});
