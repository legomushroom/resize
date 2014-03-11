class Main
  constructor:(@o={})->
    return if window.anyResizeEventInited
    window.anyResizeEventInited = true
    @vars()
    @redefineProto()

  vars:->
    @timerTags = ['input', 'textarea', 'image']

  redefineProto:->
    it = @
    wrappedListener = ->
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
    iframe = document.createElement 'iframe'
    iframe.style.width      = '100%'
    iframe.style.height     = '100%'
    iframe.style.position   = 'absolute'
    iframe.style.zIndex     = -999
    iframe.style.visibility = 'hidden'
    iframe.style.top        = 0
    iframe.style.left       = 0

    parentEl = args.that
    thatPos = parentEl.style.position
    if thatPos is 'static' or thatPos is ''
      parentEl.style.
      position = 'relative'

    parentEl.appendChild iframe
    if iframe.parentNode isnt parentEl
      iframe.contentWindow?.onresize = (e)=> @dispatchEvent parentEl
    else
      @initTimer(parentEl)
    parentEl.anyResizeEventInited = true

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
    if document.createEventObject
      e = document.createEventObject()
      el.fireEvent 'resize', e
    else if document.createEvent
      e = document.createEvent 'HTMLEvents'
      e.initEvent 'resize', false, false
      el.dispatchEvent e
    else return false

  destroy:->
    clearInterval @interval
    if Element::addEventListener 
      Element::addEventListener = @listener
    else if Element::attachEvent
      Element::attachEvent = @listener

window.anyResizeEvent = Main
