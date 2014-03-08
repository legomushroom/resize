class Main
	constructor:(@o={})->
		@vars()
		@redefineProto()

	vars:->
		@timerTags = ['input', 'textarea', 'image']

	redefineProto:->
		eventListenerFunction = Element.prototype.addEventListener or Element.prototype.attachEvent

		if Element::addEventListener
			eventListenerFunction = Element::addEventListener
			Element::addEventListener = ->
				console.log 'custom listener'
				eventListenerFunction.apply(@,arguments)
		else if Element::attachEvent
			eventListenerFunction = Element::attachEvent
			Element::attachEvent = ->
				console.log 'custom listener IE'
				eventListenerFunction.apply(@,arguments)

new Main
