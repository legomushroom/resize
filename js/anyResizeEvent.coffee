class Main
  constructor:(@o={})->
    return if window.anyResizeEventInited
    window.anyResizeEventInited = true
    @redefineProto()
    @timerElements =
      img:      1
      textarea: 1
      input:    1
      embed:    1
      svg:      1
      canvas:   1
      table:    1
      tr:       1
      tbody:    1
      thead:    1
      tfoot:    1
      caption:  1


  redefineProto:->
    it = @
    wrappedListener = ->
      if @ isnt window or @ isnt document
        arguments[0] is 'resize' and !@anyResizeEventInited and it.handleResize
          args:arguments
          that:@
      it.listener.apply(@,arguments)
    @listener = Element::addEventListener or Element::attachEvent
    if Element::addEventListener
      Element::addEventListener = wrappedListener
    else if Element::attachEvent
      Element::attachEvent = wrappedListener

  handleResize:(args)->
    el = args.that
    if !@timerElements[el.tagName.toLowerCase()]
      iframe = document.createElement 'iframe'
      el.appendChild iframe
      iframe.style.width      = '100%'
      iframe.style.height     = '100%'
      iframe.style.position   = 'absolute'
      iframe.style.zIndex     = -999
      iframe.style.opacity    = 0
      iframe.style.top        = 0
      iframe.style.left       = 0
      iframe.setAttribute 'name', 'a'

      computedStyle = if window.getComputedStyle
        getComputedStyle(el)
      else el.currentStyle

      isStatic = computedStyle.position is 'static' and el.style.position is ''
      isEmpty  = computedStyle.position is '' and el.style.position is ''
      if isStatic or isEmpty
        el.style.position = 'relative'
      iframe.contentWindow?.onresize = (e)=> @dispatchEvent el

    else @initTimer(el)
    el.anyResizeEventInited = true

  initTimer:(el)->
    width   = 0
    height  = 0
    @interval = setInterval =>
      newWidth  = el.offsetWidth
      newHeight = el.offsetHeight
      if newWidth isnt width or newHeight isnt height
        @dispatchEvent el
        width  = newWidth
        height = newHeight
    , @o.interval or 500

  dispatchEvent:(el)->
    if document.createEvent
      e = document.createEvent 'HTMLEvents'
      e.initEvent 'resize', false, false
      el.dispatchEvent e
    else if document.createEventObject
      e = document.createEventObject()
      el.fireEvent 'resize', e
    else return false

  destroy:->
    clearInterval @interval
    @interval = null
    window.anyResizeEventInited = false
    if Element::addEventListener
      Element::addEventListener = @listener
    else if Element::attachEvent
      Element::attachEvent = @listener

window.AnyResizeEvent = Main
window.anyResizeEvent = new Main
