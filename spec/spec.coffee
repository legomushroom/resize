describe 'resizer', ->
  # window.anyResizeEvent.destroy()
  addEvent = (el, type, handler)->
    if el.addEventListener
      el.addEventListener type, handler, false
    else if el.attachEvent
      el.attachEvent type, handler, false

  removeEvent = (el, type, handler)->
    if el.removeEventListener
      el.removeEventListener type, handler, false
    else if el.detachEvent
      el.detachEvent type, handler, false

  main = null
  beforeListener = null
  describe 'enviroment', ->
    it 'should allow to write to Element prototype', ->
      Element::testProperty = 'test'
      expect(Element::testProperty).toBe('test')

    it 'should have a dispatch event functionality', ->
      isIE = !!document.createEventObject and !!document.fireEvent
      isNormalBrowser = !!document.createEvent and !!document.dispatchEvent
      expect(isIE or isNormalBrowser).toBe(true)

    it 'should have a addEventListener or attachEvent', ->
      div = document.createElement 'div'
      expect(div.addEventListener or div.attachEvent).toBeTruthy()

    it 'should have a removeEventListener or detachEvent', ->
      div = document.createElement 'div'
      expect(div.removeEventListener or div.detachEvent).toBeTruthy()

    it 'should have a computedStyle functionality', ->
      el = document.createElement 'div'
      expect(window.getComputedStyle or el.currentStyle).toBeDefined()

    it 'should have size detection functionality', ->
      el = document.createElement 'div'
      document.body.appendChild el
      expect(el.offsetWidth).toBeDefined()
      expect(el.offsetHeight).toBeDefined()

    it 'should have size detection functionality', ->
      el = document.createElement 'div'
      expect(typeof el.appendChild is 'function').toBe(true)
    
  describe 'DOM:', ->
    it 'should add iframe to the element', ->
      el = document.createElement 'div'
      document.body.appendChild el
      addEvent el, 'onresize', (->)
      expect(el.hasChildNodes()).toBe(true)

    it 'should have an access to iframe window', ->
      el = document.createElement 'div'
      addEvent el, 'onresize', (->)
      iframe = el.children[0]
      document.body.appendChild el
      expect(iframe.contentWindow).toBeDefined()

    it 'iframe should have onresize method', ->
      el = document.createElement 'div'
      document.body.appendChild el
      addEvent el, 'onresize', (->)
      iframe = el.children[0]
      waits(2)
      runs ->
        expect(iframe.contentWindow.onresize or main.interval).toBeDefined()

    it 'should add position: relative style to static element', ->
      el = document.createElement 'div'
      addEvent el, 'onresize', (->)
      expect(el.style.position).toBe('relative')

    it 'should not alter absolute position style', ->
      el = document.createElement 'div'
      el.style.position = 'absolute'
      addEvent el, 'onresize', (->)
      expect(el.style.position).toBe('absolute')

    it 'should not alter fixed position style', ->
      el = document.createElement 'div'
      el.style.position = 'fixed'
      addEvent el, 'onresize', (->)
      expect(el.style.position).toBe('fixed')

    it 'iframe should have right styles', ->
      el = document.createElement 'div'
      addEvent el, 'onresize', (->)
      iframe = el.children[0]
      expect(iframe.style.position).toBe('absolute')
      expect(iframe.style.width).toBe('100%')
      expect(iframe.style.height).toBe('100%')
      expect(iframe.style.zIndex+'').toBe('-999')
      expect(parseInt(iframe.style.top,10)).toBe(0)
      expect(parseInt(iframe.style.left,10)).toBe(0)
      expect(iframe.style.opacity).toBe('0')

  describe 'constrains:', ->
    it 'should work on resize event only ', ->
      el = document.createElement 'div'
      addEvent el, 'click', (->)
      # el.addEventListener 'click', (->), false
      iframe = el.children[0]
      document.body.appendChild el
      expect(el.children.length).toBe(0)

    it 'should be initialized only once', ->
      new window.AnyResizeEvent
      el = document.createElement 'div'
      addEvent el, 'onresize', (->)
      iframe = el.children[0]
      document.body.appendChild el
      expect(el.children.length).toBe(1)

    it 'should add only one listener', ->
      el = document.createElement 'div'
      addEvent el, 'onresize', (->)
      addEvent el, 'onresize', (->)
      iframe = el.children[0]
      document.body.appendChild el
      expect(el.children.length).toBe(1)

    it 'should removeEventListener', ->
      el = document.createElement 'div'
      fun = ->
      addEvent el, 'onresize', fun
      removeEvent el, 'onresize', fun
      document.body.appendChild el
      expect(el.isAnyResizeEventInited).toBe(false)

    it 'should remove iframe after removeEventListener', ->
      el = document.createElement 'div'
      fun = ->
      addEvent el, 'onresize', fun
      removeEvent el, 'onresize', fun
      document.body.appendChild el
      expect(el.hasChildNodes()).toBe(false)

    it 'should fail when removeEvent was called before addEvent', ->
      el = document.createElement 'div'
      isError = false
      fun = ->
      try
        removeEvent el, 'onresize', fun    
      catch e
        isError = true

      expect(isError).toBe(false)

    it 'should have node\'s scope' , ->
      el = document.createElement 'div'
      document.body.appendChild el
      scope = null
      addEvent el, 'onresize', (-> scope = @ )
      el.style.width = '201px'
      waits(250); runs -> expect(scope).toEqual(el)

    it 'should reverse old listener on destroy', ->
      window.anyResizeEvent.destroy()
      main = new window.AnyResizeEvent
      el = document.createElement 'div'
      addEvent el, 'onresize', (->)
      main.destroy()
      expect(HTMLDivElement::addEventListener).toBe(Element::addEventListener)








