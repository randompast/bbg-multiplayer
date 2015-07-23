'use strict';

var fs = require('fs');
var path = require('path');
var browserify = require('browserify');


var srcFile = './public/js/main.js';
var destFile = './public/js/build.js';
var options = {
    debug: true
};


var b = browserify(srcFile, options);

var writer = fs.createWriteStream(path.normalize(destFile));

b.bundle().pipe(writer);