# new window.AnyResizeEvent

node = document.getElementById 'js-test'
node.addEventListener 'resize', ((e)->console.log('resize')), false

setTimeout ->
  node.style.width = '201px'
, 50
