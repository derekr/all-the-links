#!/usr/bin/env node

var fs = require('fs');

var links = require('../');

function usage (code) {
    var r = fs.createReadStream(__dirname + '/usage.txt');
    r.pipe(process.stdout);
    r.on('end', function () { if (code) process.exit(code) });
}

var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), { alias: { h: 'help' } });
if (argv.help) return usage(0);

var input = argv._[0] && argv._[0] !== '-'
    ? fs.createReadStream(argv._[0])
    : process.stdin;

process.stdin.on('end', function () { console.dir('EOF'); });

process.stdin.pipe(links()).pipe(process.stdout);
