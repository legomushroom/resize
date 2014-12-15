Any HTML Element Resize Event
================
[![NPM version](https://www.npmjs.com/package/any-resize-event)](http://badge.fury.io/js/pm2) [![Build Status](https://travis-ci.org/legomushroom/resize.svg?branch=master)](https://travis-ci.org/legomushroom/resize)

Adds **onresize** event to any html element. It is tiny (about 800 bytes min + gzip) and dependency free.

_*timer is used as a fallback for elements that can not have child nodes(images, inputs etc)_

### Usage

Just link source file in your html. Add **onresize** event listener to any element as you usually do. Plays well with jquery too. [sandbox](http://codepen.io/sol0mka/pen/FnizC)

###Contibuting

Pull request is way to go. Uses coffeescript as js preprocessor so I'm expecting changes in **any-resize-event.coffee** file.

### Environment
Uses [gulp](http://gulpjs.com/) as task runner.
```sh
[sudo] npm istall
```
launch gulp:
```sh
gulp
```
### Tests
Please test your code. [KarmaJS](http://karma-runner.github.io/0.12/index.html) as tests enviroment and [jasmine](http://jasmine.github.io/) as testing framework.
Launch testem:
```sh
karma start
```
You are all set.

### Browsers' support
It works just everywhere:
<br/>
Chrome  1+
<br/>
Firefox 1+
<br/>
IE 			4+
<br/>
Safari 	1+
<br/>
Opera 	4+


### License
The MIT License (MIT)
Copyright (c) 2014 Oleg Solomka(Legomushroom) legomushroom@gmail.com http://legomushroom.com 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.