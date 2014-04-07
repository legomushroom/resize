# new window.AnyResizeEvent

node = document.getElementById 'js-test'
node.addEventListener 'resize', (
  (e)->
    console.log('resize')
    console.log(@)
  ), false

setTimeout ->
  node.style.width = '201px'
, 50
