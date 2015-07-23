'use strict';

var http = require('http');
var nstatic = require('node-static');

// Create a node-static server instance to serve the './public' folder
var file = new nstatic.Server('./public');

var server = http.createServer(function (request, response) {

    request.addListener('end', function () {
        // Serve files!
        file.serve(request, response);
    })
    .resume();
});

module.exports = server;
