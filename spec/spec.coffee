describe 'enviroment', ->
  it 'should have an Element and it\'s prototype', ->
    expect(Element).toBeDefined()
    expect(Element.prototype.addEventListener or Element.prototype.attachEvent).toBeDefined()

  it 'should allow to write to Element prototype', ->
    Element.prototype.testProperty = 'test'
    expect(Element.prototype.testProperty).toBe('test')

  it 'should have a dispatch event functionality', ->
    isIE = !!document.createEventObject and !!document.fireEvent
    isNormalBrowser = !!document.createEvent and !!document.dispatchEvent
    expect(isIE or isNormalBrowser).toBeTrue()


