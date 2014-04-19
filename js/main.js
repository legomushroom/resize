(function() {
  var i, node, resizer;

  resizer = new window.AnyResizeEvent;

  node = document.getElementById('js-test');

  window.node = node;

  i = 0;

  node.addEventListener('onresize', (function(e) {
    var div;
    div = document.createElement('div');
    div.innerHTML = ++i;
    return document.body.appendChild(div);
  }), false);

}).call(this);
