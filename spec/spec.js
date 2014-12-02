(function() {
  describe('resizer', function() {
    var addEvent, beforeListener, main, removeEvent;
    addEvent = function(el, type, handler) {
      if (el.addEventListener) {
        return el.addEventListener(type, handler, false);
      } else if (el.attachEvent) {
        return el.attachEvent(type, handler, false);
      }
    };
    removeEvent = function(el, type, handler) {
      if (el.removeEventListener) {
        return el.removeEventListener(type, handler, false);
      } else if (el.detachEvent) {
        return el.detachEvent(type, handler, false);
      }
    };
    main = null;
    beforeListener = null;
    describe('enviroment', function() {
      it('should allow to write to Element prototype', function() {
        Element.prototype.testProperty = 'test';
        return expect(Element.prototype.testProperty).toBe('test');
      });
      it('should have a dispatch event functionality', function() {
        var isIE, isNormalBrowser;
        isIE = !!document.createEventObject && !!document.fireEvent;
        isNormalBrowser = !!document.createEvent && !!document.dispatchEvent;
        return expect(isIE || isNormalBrowser).toBe(true);
      });
      it('should have a addEventListener or attachEvent', function() {
        var div;
        div = document.createElement('div');
        return expect(div.addEventListener || div.attachEvent).toBeTruthy();
      });
      it('should have a removeEventListener or detachEvent', function() {
        var div;
        div = document.createElement('div');
        return expect(div.removeEventListener || div.detachEvent).toBeTruthy();
      });
      it('should have a computedStyle functionality', function() {
        var el;
        el = document.createElement('div');
        return expect(window.getComputedStyle || el.currentStyle).toBeDefined();
      });
      it('should have size detection functionality', function() {
        var el;
        el = document.createElement('div');
        document.body.appendChild(el);
        expect(el.offsetWidth).toBeDefined();
        return expect(el.offsetHeight).toBeDefined();
      });
      return it('should have size detection functionality', function() {
        var el;
        el = document.createElement('div');
        return expect(typeof el.appendChild === 'function').toBe(true);
      });
    });
    describe('DOM:', function() {
      it('should add iframe to the element', function() {
        var el;
        el = document.createElement('div');
        document.body.appendChild(el);
        addEvent(el, 'onresize', (function() {}));
        return expect(el.hasChildNodes()).toBe(true);
      });
      it('should have an access to iframe window', function() {
        var el, iframe;
        el = document.createElement('div');
        addEvent(el, 'onresize', (function() {}));
        iframe = el.children[0];
        document.body.appendChild(el);
        return expect(iframe.contentWindow).toBeDefined();
      });
      describe('iframe onresize method', function() {
        beforeEach(function(done) {
          return setTimeout((function() {
            return done();
          }), 2);
        });
        return it('iframe should have onresize method', function() {
          var el, iframe;
          el = document.createElement('div');
          document.body.appendChild(el);
          addEvent(el, 'onresize', (function() {}));
          iframe = el.children[0];
          return expect(iframe.contentWindow.onresize || main.interval).toBeDefined();
        });
      });
      it('should add position: relative style to static element', function() {
        var el;
        el = document.createElement('div');
        addEvent(el, 'onresize', (function() {}));
        return expect(el.style.position).toBe('relative');
      });
      it('should not alter absolute position style', function() {
        var el;
        el = document.createElement('div');
        el.style.position = 'absolute';
        addEvent(el, 'onresize', (function() {}));
        return expect(el.style.position).toBe('absolute');
      });
      it('should not alter fixed position style', function() {
        var el;
        el = document.createElement('div');
        el.style.position = 'fixed';
        addEvent(el, 'onresize', (function() {}));
        return expect(el.style.position).toBe('fixed');
      });
      return it('iframe should have right styles', function() {
        var el, iframe;
        el = document.createElement('div');
        addEvent(el, 'onresize', (function() {}));
        iframe = el.children[0];
        expect(iframe.style.position).toBe('absolute');
        expect(iframe.style.width).toBe('100%');
        expect(iframe.style.height).toBe('100%');
        expect(iframe.style.zIndex + '').toBe('-999');
        expect(parseInt(iframe.style.top, 10)).toBe(0);
        expect(parseInt(iframe.style.left, 10)).toBe(0);
        return expect(iframe.style.opacity).toBe('0');
      });
    });
    return describe('constrains:', function() {
      it('should work on resize event only ', function() {
        var el, iframe;
        el = document.createElement('div');
        addEvent(el, 'click', (function() {}));
        iframe = el.children[0];
        document.body.appendChild(el);
        return expect(el.children.length).toBe(0);
      });
      it('should be initialized only once', function() {
        var el, iframe;
        new window.AnyResizeEvent;
        el = document.createElement('div');
        addEvent(el, 'onresize', (function() {}));
        iframe = el.children[0];
        document.body.appendChild(el);
        return expect(el.children.length).toBe(1);
      });
      it('should add only one listener', function() {
        var el, iframe;
        el = document.createElement('div');
        addEvent(el, 'onresize', (function() {}));
        addEvent(el, 'onresize', (function() {}));
        iframe = el.children[0];
        document.body.appendChild(el);
        return expect(el.children.length).toBe(1);
      });
      it('should removeEventListener', function() {
        var el, fun;
        el = document.createElement('div');
        fun = function() {};
        addEvent(el, 'onresize', fun);
        removeEvent(el, 'onresize', fun);
        document.body.appendChild(el);
        return expect(el.isAnyResizeEventInited).toBe(false);
      });
      it('should remove iframe after removeEventListener', function() {
        var el, fun;
        el = document.createElement('div');
        fun = function() {};
        addEvent(el, 'onresize', fun);
        removeEvent(el, 'onresize', fun);
        document.body.appendChild(el);
        return expect(el.hasChildNodes()).toBe(false);
      });
      it('should fail when removeEvent was called before addEvent', function() {
        var e, el, fun, isError;
        el = document.createElement('div');
        isError = false;
        fun = function() {};
        try {
          removeEvent(el, 'onresize', fun);
        } catch (_error) {
          e = _error;
          isError = true;
        }
        return expect(isError).toBe(false);
      });
      describe('scope', function() {
        var el, scope;
        scope = null;
        el = document.createElement('div');
        beforeEach(function(done) {
          document.body.appendChild(el);
          addEvent(el, 'onresize', function() {
            return scope = this;
          });
          setTimeout((function() {
            return el.style.width = '201px';
          }), 100);
          return setTimeout(function() {
            return done();
          }, 250);
        });
        return it('should have node\'s scope', function() {
          return expect(scope).toEqual(el);
        });
      });
      return it('should reverse old listener on destroy', function() {
        var el;
        window.anyResizeEvent.destroy();
        main = new window.AnyResizeEvent;
        el = document.createElement('div');
        addEvent(el, 'onresize', (function() {}));
        main.destroy();
        return expect(HTMLDivElement.prototype.addEventListener).toBe(Element.prototype.addEventListener);
      });
    });
  });

}).call(this);
