(function() {
  var Main;

  Main = (function() {
    function Main(o) {
      this.o = o != null ? o : {};
      if (window.anyResizeEventInited) {
        return;
      }
      window.anyResizeEventInited = true;
      this.redefineProto();
      this.timerElements = {
        img: 1,
        textarea: 1,
        input: 1,
        embed: 1,
        svg: 1,
        canvas: 1,
        table: 1,
        tr: 1,
        tbody: 1,
        thead: 1,
        tfoot: 1,
        caption: 1
      };
    }

    Main.prototype.redefineProto = function() {
      var it, wrappedListener;
      it = this;
      wrappedListener = function() {
        if (this !== window || this !== document) {
          arguments[0] === 'resize' && !this.anyResizeEventInited && it.handleResize({
            args: arguments,
            that: this
          });
        }
        return it.listener.apply(this, arguments);
      };
      this.listener = Element.prototype.addEventListener || Element.prototype.attachEvent;
      if (Element.prototype.addEventListener) {
        return Element.prototype.addEventListener = wrappedListener;
      } else if (Element.prototype.attachEvent) {
        return Element.prototype.attachEvent = wrappedListener;
      }
    };

    Main.prototype.handleResize = function(args) {
      var computedStyle, el, iframe, isEmpty, isStatic, _ref;
      el = args.that;
      if (!this.timerElements[el.tagName.toLowerCase()]) {
        iframe = document.createElement('iframe');
        el.appendChild(iframe);
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.position = 'absolute';
        iframe.style.zIndex = -999;
        iframe.style.opacity = 0;
        iframe.style.top = 0;
        iframe.style.left = 0;
        iframe.setAttribute('name', 'a');
        computedStyle = window.getComputedStyle ? getComputedStyle(el) : el.currentStyle;
        isStatic = computedStyle.position === 'static' && el.style.position === '';
        isEmpty = computedStyle.position === '' && el.style.position === '';
        if (isStatic || isEmpty) {
          el.style.position = 'relative';
        }
        if ((_ref = iframe.contentWindow) != null) {
          _ref.onresize = (function(_this) {
            return function(e) {
              return _this.dispatchEvent(el);
            };
          })(this);
        }
      } else {
        this.initTimer(el);
      }
      return el.anyResizeEventInited = true;
    };

    Main.prototype.initTimer = function(el) {
      var height, width;
      width = 0;
      height = 0;
      return this.interval = setInterval((function(_this) {
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
      if (document.createEvent) {
        e = document.createEvent('HTMLEvents');
        e.initEvent('resize', false, false);
        return el.dispatchEvent(e);
      } else if (document.createEventObject) {
        e = document.createEventObject();
        return el.fireEvent('resize', e);
      } else {
        return false;
      }
    };

    Main.prototype.destroy = function() {
      clearInterval(this.interval);
      this.interval = null;
      window.anyResizeEventInited = false;
      if (Node.prototype.addEventListener) {
        return Node.prototype.addEventListener = this.listener;
      } else if (Node.prototype.attachEvent) {
        return Node.prototype.attachEvent = this.listener;
      }
    };

    return Main;

  })();

  window.AnyResizeEvent = Main;

  window.anyResizeEvent = new Main;

}).call(this);
