(function() {
  describe('enviroment', function() {
    it('should have an Element and it\'s prototype', function() {
      expect(Element).toBeDefined();
      return expect(Element.prototype.addEventListener || Element.prototype.attachEvent).toBeDefined();
    });
    it('should allow to write to Element prototype', function() {
      Element.prototype.testProperty = 'test';
      return expect(Element.prototype.testProperty).toBe('test');
    });
    return it('should have a dispatch event functionality', function() {
      var isIE, isNormalBrowser;
      isIE = !!document.createEventObject && !!document.fireEvent;
      isNormalBrowser = !!document.createEvent && !!document.dispatchEvent;
      return expect(isIE || isNormalBrowser).toBeTrue();
    });
  });

}).call(this);
