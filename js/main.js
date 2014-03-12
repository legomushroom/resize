(function() {
  var node;

  node = document.getElementById('js-test');

  node.addEventListener('resize', (function(e) {
    return console.log('resize');
  }), false);

  setTimeout(function() {
    return node.style.width = '201px';
  }, 50);

}).call(this);
