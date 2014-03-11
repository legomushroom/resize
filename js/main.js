(function() {
  var Main, node;

  Main = (function() {
    function Main(o) {
      this.o = o != null ? o : {};
      if (window.anyResizeEventInited) {
        return;
      }
      window.anyResizeEventInited = true;
      this.vars();
      this.redefineProto();
    }

    Main.prototype.vars = function() {
      return this.timerTags = ['input', 'textarea', 'image'];
    };

    Main.prototype.redefineProto = function() {
      var eventListenerFunction, it;
      if (Element.prototype.addEventListener) {
        eventListenerFunction = Element.prototype.addEventListener;
        it = this;
        return Element.prototype.addEventListener = function() {
          arguments[0] === 'resize' && !this.anyResizeEventInited && it.handleResize({
            args: arguments,
            that: this
          });
          return eventListenerFunction.apply(this, arguments);
        };
      } else if (Element.prototype.attachEvent) {
        eventListenerFunction = Element.prototype.attachEvent;
        return Element.prototype.attachEvent = function() {
          arguments[0] === 'resize' && !this.anyResizeEventInited && it.handleResize({
            args: arguments,
            that: this
          });
          return eventListenerFunction.apply(this, arguments);
        };
      }
    };

    Main.prototype.handleResize = function(args) {
      var iframe, parentEl, thatPos, _ref;
      iframe = document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.position = 'absolute';
      iframe.style.zIndex = -999;
      iframe.style.visibility = 'hidden';
      parentEl = args.that;
      thatPos = parentEl.style.position;
      if (thatPos === 'static' || thatPos === '') {
        parentEl.style.position = 'relative';
      }
      parentEl.appendChild(iframe);
      if (iframe.parentNode !== parentEl) {
        if ((_ref = iframe.contentWindow) != null) {
          _ref.onresize = (function(_this) {
            return function(e) {
              return _this.dispatchEvent(parentEl);
            };
          })(this);
        }
      } else {
        this.initTimer(parentEl);
      }
      return parentEl.anyResizeEventInited = true;
    };

    Main.prototype.initTimer = function(el) {
      var height, width;
      width = 0;
      height = 0;
      return setInterval((function(_this) {
        return function() {
          var newHeight, newWidth;
          newWidth = el.offsetWidth;
          newHeight = el.offsetHeight;
          if (newWidth !== width || newHeight !== height) {
            _this.dispatchEvent(el);
            width = newWidth;
            return height = newHeight;
          }
        };
      })(this), this.o.interval || 500);
    };

    Main.prototype.dispatchEvent = function(el) {
      var e;
      if (document.createEventObject) {
        e = document.createEventObject();
        return el.fireEvent('resize', e);
      } else if (document.createEvent) {
        e = document.createEvent('HTMLEvents');
        e.initEvent('resize', false, false);
        return el.dispatchEvent(e);
      } else {
        return false;
      }
    };

    return Main;

  })();

  window.anyResizeEvent = Main;

  new Main;

  node = document.getElementById('js-test');

  node.addEventListener('resize', (function(e) {
    return console.log('resize');
  }), false);

  setTimeout(function() {
    return node.style.width = '201px';
  }, 50);

}).call(this);
