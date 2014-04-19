resizer = new window.AnyResizeEvent

node = document.getElementById 'js-test'
window.node = node
i = 0
node.addEventListener 'onresize', ((e)->
  div = document.createElement 'div'
  div.innerHTML = ++i
  document.body.appendChild div
  #console.log(@)
  # alert 'a'
), false

# setTimeout ->
#   node.style.width = '201px'
# , 10
