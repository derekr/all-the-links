var test = require('tape');
var fs = require('fs');
var concat = require('concat-stream');
var split = require('split');

var links = require('../');

var sample = fs.createReadStream(__dirname + '/fixture.html');

test('all the links', function (t) {
    var sample = fs.createReadStream(__dirname + '/fixture.html');

    sample.pipe(links()).pipe(concat(function (urls) {
        t.equal(urls.toString().split('\n').length, 9, 'correct link count');
        t.end();
    }));
});

test('callback the links', function (t) {
    fs.readFile(__dirname + '/fixture.html', function (err, buff) {
        links(buff.toString(), function (err, urls) {
            t.equal(urls.length, 9, 'correct link count');
            t.end();
        });
    });
});
