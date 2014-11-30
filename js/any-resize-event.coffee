#! Legomushroom 2014 MIT
# TODO
#   fix removeEventListener
#     set anyResizeEventInited to false and rename the variable
#   add license comments

class Main
  constructor:(@o={})->
    return if window.anyResizeEventInited
    @vars()
    @redefineProto()

  vars:->
    window.anyResizeEventInited = true
    @allowedProtos = [
      HTMLDivElement,
      HTMLFormElement,
      HTMLLinkElement,
      HTMLBodyElement,
      HTMLParagraphElement,
      HTMLFieldSetElement,
      HTMLLegendElement,
      HTMLLabelElement,
      HTMLButtonElement,
      HTMLUListElement,
      HTMLOListElement,
      HTMLLIElement,
      HTMLHeadingElement,
      HTMLQuoteElement,
      HTMLPreElement,
      HTMLBRElement,
      HTMLFontElement,
      HTMLHRElement,
      HTMLModElement,
      HTMLParamElement,
      HTMLMapElement,
      HTMLTableElement,
      HTMLTableCaptionElement,
      HTMLImageElement,
      HTMLTableCellElement,
      HTMLSelectElement,
      HTMLInputElement,
      HTMLTextAreaElement,
      HTMLAnchorElement,
      HTMLObjectElement,
      HTMLTableColElement,
      HTMLTableSectionElement,
      HTMLTableRowElement
    ]
    @timerElements =
      img:        1
      textarea:   1
      input:      1
      embed:      1
      object:     1
      svg:        1
      canvas:     1
      tr:         1
      tbody:      1
      thead:      1
      tfoot:      1
      a:          1
      select:     1
      option:     1
      optgroup:   1
      dl:         1
      dt:         1
      br:         1
      basefont:   1
      font:       1
      col:        1
      iframe:     1

  redefineProto:->
    it = @
    for proto, i in @allowedProtos
      if !proto::? then continue
      do (proto)->
        listener = proto::addEventListener or proto::attachEvent
        do (listener)->
          wrappedListener = ->
            if @ isnt window or @ isnt document
              option = arguments[0] is 'onresize' and !@anyResizeEventInited
              option and it.handleResize
                args:arguments
                that:@
            listener.apply(@,arguments)
          if proto::addEventListener
            proto::addEventListener = wrappedListener
          else if proto::attachEvent
            proto::attachEvent = wrappedListener

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
    , @o.interval or 200

  dispatchEvent:(el)->
    if document.createEvent
      e = document.createEvent 'HTMLEvents'
      e.initEvent 'onresize', false, false
      el.dispatchEvent e
    else if document.createEventObject
      e = document.createEventObject()
      el.fireEvent 'onresize', e
    else return false

  destroy:->
    clearInterval @interval
    @interval = null
    window.anyResizeEventInited = false
    if Node::addEventListener
      Node::addEventListener = @listener
    else if Node::attachEvent
      Node::attachEvent = @listener

if (typeof define is "function") and define.amd
  define "any-resize-event", [], -> new Main
else if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = new Main
else
  window?.AnyResizeEvent = Main
  window?.anyResizeEvent = new Main
