describe 'enviroment', ->
  it 'should have an Element', ->
    expect(Element).toBeDefined()

  it 'should allow to write to Element prototype', ->
    Element.prototype.testProperty = 'test'
    expect(Element.prototype.testProperty).toBe('test')