Any Resize Event
================
Adds resize event to any html element. It is tiny (about 800 bytes min + gzip) and dependency free.

### Usage

Just link source file in your html. Add 'resize' event listener to any element as usual. Plays well with jquery too. [sandbox](http://codepen.io/sol0mka/pen/FnizC)

###Contibuting

Pull request is way to go. We are using coffeescript as js preprocessor so expecting changes in anyResizeEvent.coffee file.

### Evniroment
Using [gulp](http://gulpjs.com/) as task runner.
```sh
[sudo] npm istall
```
launch gulp:
```sh
gulp
```
### Tests
Please test your code. Using [testem](https://github.com/airportyh/testem) as tests runner and [jasmine](http://jasmine.github.io/) as test framework.
Launch testem:
```sh
testem
```
You are all set.

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