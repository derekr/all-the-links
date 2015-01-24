var tokenize = require('html-tokenize');
var select = require('html-select');
var through = require('through2');
var duplexer = require('duplexer2');
var str = require('string-to-stream');

module.exports = function (html, callback) {
    var first = false;
    var urls = [];

    var readable = through();
    var writable = through();

    var d = duplexer(writable, readable);

    var s = select('a', function (el) {
        var newline = '\n';
        if (!first) { newline = ''; first = true; }
        var url = el.getAttribute('href');
        if (callback) urls.push(url);
        readable.write(newline + url);
    });

    s.on('finish', function () {
        readable.end();
        if (typeof callback === 'function') callback(null, urls);
    });

    readable.on('error', function (err) {
        if (typeof callback === 'function') callback(err);
    });

    writable.pipe(tokenize()).pipe(s);
    s.resume();

    if (html) {
        str(html).pipe(d);
    }

    return d;
}
