'use strict';
var PORT = process.argv[2] || 8080;

var Primus = require('primus');

// lib
var makePrimusMessageHandler = require('./lib/primus-message-handler.js');

// instances
var server = require('./server.js');
var gameState = require('./game-state.js');

server.on('request', function(request, response){
    if(request.url === '/api/game-state.js'){
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end('var MAP_DATA = ' + JSON.stringify(gameState.map.data));
        return;
    }
});

server.listen(PORT, function () {
    console.log('Open http://localhost:' + PORT + ' in your browser');
});

// Attach Primus to the HTTP server.
var primus = new Primus(server);

var messageHandler = makePrimusMessageHandler({
    primus: primus
});

messageHandler.addHandler('chat', function(data, spark, primus){
    console.log(spark.id, '[chat] received message:', data);

    data.timestamp = new Date();
    data.userId = spark.id;


    primus.write(data);
});

messageHandler.addHandler('game_map', function(data, spark, primus){
    console.log(spark.id, '[gameMap] received message:', data);

    var x = data.x;
    var y = data.y;
    var value = data.value;
    gameState.map.set(x, y, value);

    primus.write(data);
});

messageHandler.addHandler('latency', function(data, spark, primus){
    // console.log(spark.id, '[latency] received message:', data);
    spark.write(data);
});