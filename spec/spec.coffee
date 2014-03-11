describe 'resizer', ->
  describe 'enviroment', ->
    it 'should have an Element and event listener functionality', ->
      expect(Element).toBeDefined()
      fun = Element.prototype.addEventListener or Element.prototype.attachEvent
      expect(fun).toBeDefined()

    it 'should allow to write to Element prototype', ->
      Element.prototype.testProperty = 'test'
      expect(Element.prototype.testProperty).toBe('test')

    it 'should have a dispatch event functionality', ->
      isIE = !!document.createEventObject and !!document.fireEvent
      isNormalBrowser = !!document.createEvent and !!document.dispatchEvent
      expect(isIE or isNormalBrowser).toBe(true)

    it 'should have size detection functionality', ->
      el = document.createElement 'div'
      document.body.appendChild el
      expect(el.offsetWidth).toBeDefined()
      expect(el.offsetHeight).toBeDefined()
    
  describe 'DOM', ->
    main = null
    it 'should rewrite addEventListener proto', ->
      before = Element.prototype.addEventListener
      main = new window.anyResizeEvent
      expect(Element.prototype.addEventListener).not.toBe(before)
    
    it 'should add iframe to the element', ->
      el = document.createElement 'div'
      document.body.appendChild el
      el.addEventListener 'resize', (->), false
      expect(el.children.length).toBe(1)

    it 'should have an access to iframe window', ->
      el = document.createElement 'div'
      el.addEventListener 'resize', (->), false
      iframe = el.children[0]
      document.body.appendChild el
      expect(iframe.contentWindow).toBeDefined()

    it 'iframe should have a onresize method', ->
      el = document.createElement 'div'
      el.addEventListener 'resize', (->), false
      iframe = el.children[0]
      document.body.appendChild el
      expect(iframe.contentWindow.onresize).toBeDefined()

    it 'should add position: relative style to static element', ->
      el = document.createElement 'div'
      el.addEventListener 'resize', (->), false
      expect(el.style.position).toBe('relative')

    it 'should not alter absolute position style', ->
      el = document.createElement 'div'
      el.style.position = 'absolute'
      el.addEventListener 'resize', (->), false
      expect(el.style.position).toBe('absolute')

    it 'should not alter fixed position style', ->
      el = document.createElement 'div'
      el.style.position = 'fixed'
      el.addEventListener 'resize', (->), false
      expect(el.style.position).toBe('fixed')

    it 'iframe should have right styles', ->
      el = document.createElement 'div'
      el.addEventListener 'resize', (->), false
      iframe = el.children[0]
      expect(iframe.style.position).toBe('absolute')
      expect(iframe.style.width).toBe('100%')
      expect(iframe.style.height).toBe('100%')
      expect(iframe.style.zIndex).toBe('-999')
      expect(iframe.style.visibility).toBe('hidden')

  describe 'constrains', ->
    it 'should work on resize event only ', ->
      el = document.createElement 'div'
      el.addEventListener 'click', (->), false
      iframe = el.children[0]
      document.body.appendChild el
      expect(el.children.length).toBe(0)

    it 'should be initialized only once', ->
      new window.anyResizeEvent
      el = document.createElement 'div'
      el.addEventListener 'resize', (->), false
      iframe = el.children[0]
      document.body.appendChild el
      expect(el.children.length).toBe(1)

    it 'should add only one listener', ->
      el = document.createElement 'div'
      el.addEventListener 'resize', (->), false
      el.addEventListener 'resize', (->), false
      iframe = el.children[0]
      document.body.appendChild el
      expect(el.children.length).toBe(1)








