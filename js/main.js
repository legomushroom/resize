(function() {
  var node;

  node = document.getElementById('js-test');

  node.addEventListener('resize', (function(e) {
    console.log('resize');
    return console.log(this);
  }), false);

  setTimeout(function() {
    return node.style.width = '201px';
  }, 50);

}).call(this);
