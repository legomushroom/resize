(function() {
  var Main;

  Main = (function() {
    function Main(o) {
      this.o = o != null ? o : {};
      this.vars();
      this.redefineProto();
    }

    Main.prototype.vars = function() {
      return this.timerTags = ['input', 'textarea', 'image'];
    };

    Main.prototype.redefineProto = function() {
      var eventListenerFunction;
      if (Element.prototype.addEventListener) {
        eventListenerFunction = Element.prototype.addEventListener;
        return Element.prototype.addEventListener = function() {
          console.log('custom listener');
          return eventListenerFunction.apply(this, arguments);
        };
      } else if (Element.prototype.attachEvent) {
        eventListenerFunction = Element.prototype.attachEvent;
        return Element.prototype.attachEvent = function() {
          console.log('custom listener IE');
          return eventListenerFunction.apply(this, arguments);
        };
      }
    };

    return Main;

  })();

  new Main;

}).call(this);
