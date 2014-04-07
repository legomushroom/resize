(function() {
  describe('resizer', function() {
    var beforeListener, main;
    window.anyResizeEvent.destroy();
    main = null;
    beforeListener = null;
    describe('enviroment', function() {
      it('should have an Element and event listener functionality', function() {
        var fun;
        expect(Element).toBeDefined();
        fun = Element.prototype.addEventListener || Element.prototype.attachEvent;
        return expect(fun).toBeDefined();
      });
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
      it('should have a computedStyle functionality', function() {
        var el;
        el = document.createElement('div');
        return expect(window.getComputedStyle || el.currentStyle).toBeDefined();
      });
      return it('should have size detection functionality', function() {
        var el;
        el = document.createElement('div');
        document.body.appendChild(el);
        expect(el.offsetWidth).toBeDefined();
        return expect(el.offsetHeight).toBeDefined();
      });
    });
    describe('DOM:', function() {
      it('should rewrite addEventListener proto', function() {
        beforeListener = Element.prototype.addEventListener;
        main = new window.AnyResizeEvent;
        return expect(Element.prototype.addEventListener).not.toBe(beforeListener);
      });
      it('should add iframe to the element', function() {
        var el;
        el = document.createElement('div');
        document.body.appendChild(el);
        el.addEventListener('resize', (function() {}), false);
        return expect(el.children.length).toBe(1);
      });
      it('should have an access to iframe window', function() {
        var el, iframe;
        el = document.createElement('div');
        el.addEventListener('resize', (function() {}), false);
        iframe = el.children[0];
        document.body.appendChild(el);
        return expect(iframe.contentWindow).toBeDefined();
      });
      it('iframe should have onresize method', function() {
        var el, iframe;
        el = document.createElement('div');
        document.body.appendChild(el);
        el.addEventListener('resize', (function() {}), false);
        iframe = el.children[0];
        waits(2);
        return runs(function() {
          return expect(iframe.contentWindow.onresize || main.interval).toBeDefined();
        });
      });
      it('should add position: relative style to static element', function() {
        var el;
        el = document.createElement('div');
        el.addEventListener('resize', (function() {}), false);
        return expect(el.style.position).toBe('relative');
      });
      it('should not alter absolute position style', function() {
        var el;
        el = document.createElement('div');
        el.style.position = 'absolute';
        el.addEventListener('resize', (function() {}), false);
        return expect(el.style.position).toBe('absolute');
      });
      it('should not alter fixed position style', function() {
        var el;
        el = document.createElement('div');
        el.style.position = 'fixed';
        el.addEventListener('resize', (function() {}), false);
        return expect(el.style.position).toBe('fixed');
      });
      return it('iframe should have right styles', function() {
        var el, iframe;
        el = document.createElement('div');
        el.addEventListener('resize', (function() {}), false);
        iframe = el.children[0];
        expect(iframe.style.position).toBe('absolute');
        expect(iframe.style.width).toBe('100%');
        expect(iframe.style.height).toBe('100%');
        expect(iframe.style.zIndex + '').toBe('-999');
        expect(parseInt(iframe.style.top, 10)).toBe(0);
        expect(parseInt(iframe.style.left, 10)).toBe(0);
        return expect(iframe.style.visibility).toBe('hidden');
      });
    });
    return describe('constrains:', function() {
      it('should work on resize event only ', function() {
        var el, iframe;
        el = document.createElement('div');
        el.addEventListener('click', (function() {}), false);
        iframe = el.children[0];
        document.body.appendChild(el);
        return expect(el.children.length).toBe(0);
      });
      it('should be initialized only once', function() {
        var el, iframe;
        new window.AnyResizeEvent;
        el = document.createElement('div');
        el.addEventListener('resize', (function() {}), false);
        iframe = el.children[0];
        document.body.appendChild(el);
        return expect(el.children.length).toBe(1);
      });
      it('should add only one listener', function() {
        var el, iframe;
        el = document.createElement('div');
        el.addEventListener('resize', (function() {}), false);
        el.addEventListener('resize', (function() {}), false);
        iframe = el.children[0];
        document.body.appendChild(el);
        return expect(el.children.length).toBe(1);
      });
      it('should have node\'s scope', function() {
        var el, scope;
        el = document.createElement('div');
        document.body.appendChild(el);
        scope = null;
        el.addEventListener('resize', (function() {
          return scope = this;
        }), false);
        waits(10);
        runs(function() {
          return el.style.width = '201px';
        });
        waits(10);
        return runs(function() {
          return expect(scope).toEqual(el);
        });
      });
      return it('should reverse old listener or inteval on destroy', function() {
        var el, isInterval, isListener;
        new window.AnyResizeEvent;
        el = document.createElement('div');
        el.addEventListener('resize', (function() {}), false);
        document.body.appendChild(el);
        main.destroy();
        isListener = Element.prototype.addEventListener === beforeListener;
        isInterval = main.interval;
        return expect(isListener || !isInterval).toBe(true);
      });
    });
  });

}).call(this);
