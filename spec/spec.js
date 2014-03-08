(function() {
  describe('enviroment', function() {
    it('should have an Element', function() {
      return expect(Element).toBeDefined();
    });
    return it('should allow to write to Element prototype', function() {
      Element.prototype.testProperty = 'test';
      return expect(Element.prototype.testProperty).toBe('test');
    });
  });

}).call(this);
