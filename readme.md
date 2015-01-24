# all-the-links

Parse all links from HTML input.

## example

```js
var links = require('all-the-links');
var fs = require('fs');

/**
 * <div>sup</div>
 * <a href="http://iojs.org">IOJS</a>
 * <a href="/about">About</a>
 */
var html = fs.createReadStream(__dirname + '/index.html');

html.pipe(links()).pipe(process.stdout);
```

Would print each `href` on a newline.

```
http://iojs.org
/about
```

## methods

### var l = links([html, callback])

Return a stream of urls parsed from html piped in to `l`.
You may optionally pass in `html` and a `callback` to use the callback
interface. Callback will contain `err` as the first argument if there
is an error and an array of urls as the second argument if any are found.

## usage

```
usage: all-the-links [FILE]

    Return newline delimited list of urls found in
    the provided HTML.
```

## install

With [npm](http://npmjs.org), to get the library do:

```
npm install all-the-links
```

and to get the command do:

```
npm install -g all-the-links
```

## license

MIT
