(function() {
  var Main;

  Main = (function() {
    function Main(o) {
      this.o = o != null ? o : {};
      if (window.anyResizeEventInited) {
        return;
      }
      this.vars();
      this.redefineProto();
    }

    Main.prototype.vars = function() {
      window.anyResizeEventInited = true;
      this.allowedProtos = [HTMLDivElement, HTMLFormElement, HTMLLinkElement, HTMLBodyElement, HTMLParagraphElement, HTMLFieldSetElement, HTMLLegendElement, HTMLLabelElement, HTMLButtonElement, HTMLUListElement, HTMLOListElement, HTMLLIElement, HTMLParagraphElement, HTMLHeadingElement, HTMLQuoteElement, HTMLPreElement, HTMLBRElement, HTMLFontElement, HTMLHRElement, HTMLModElement, HTMLParamElement, HTMLMapElement, HTMLTableElement, HTMLTableCaptionElement, HTMLTableColElement, HTMLTableSectionElement, HTMLTableRowElement];
      return this.timerElements = {
        img: 1,
        textarea: 1,
        input: 1,
        embed: 1,
        object: 1,
        svg: 1,
        canvas: 1,
        table: 1,
        tr: 1,
        tbody: 1,
        thead: 1,
        tfoot: 1,
        caption: 1,
        a: 1,
        select: 1,
        option: 1,
        optgroup: 1,
        dl: 1,
        dt: 1,
        br: 1,
        basefont: 1,
        font: 1
      };
    };

    Main.prototype.redefineProto = function() {
      var it, proto, _i, _len, _ref, _results;
      it = this;
      _ref = this.allowedProtos;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        proto = _ref[_i];
        _results.push((function(proto) {
          var listener;
          listener = proto.prototype.addEventListener || proto.prototype.attachEvent;
          return (function(listener) {
            var wrappedListener;
            wrappedListener = function() {
              var option;
              if (this !== window || this !== document) {
                option = arguments[0] === 'onresize' && !this.anyResizeEventInited;
                option && it.handleResize({
                  args: arguments,
                  that: this
                });
              }
              return listener.apply(this, arguments);
            };
            if (proto.prototype.addEventListener) {
              return proto.prototype.addEventListener = wrappedListener;
            } else if (proto.prototype.attachEvent) {
              return proto.prototype.attachEvent = wrappedListener;
            }
          })(listener);
        })(proto));
      }
      return _results;
    };

    Main.prototype.handleResize = function(args) {
      var computedStyle, el, iframe, isEmpty, isStatic, _ref;
      el = args.that;
      console.log(el.tagName.toLowerCase());
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
      console.log('a');
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
        e.initEvent('onresize', false, false);
        return el.dispatchEvent(e);
      } else if (document.createEventObject) {
        e = document.createEventObject();
        return el.fireEvent('onresize', e);
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
