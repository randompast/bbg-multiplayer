'use strict';

//lib
var makeChat = require('./lib/chat.js');
var makeGame = require('./lib/game.js');

$(function(){

    var primus = new Primus();

    var game = makeGame({
        primus: primus
    });

    var $form = $('#chat-container');
    var $log = $form.find('.log');
    var $inputMessage = $form.find('.input-message');
    var $inputUsername = $('.input-username');

    game.chat = makeChat({
        game: game,
        form: $form,
        log: $log,
        inputMessage: $inputMessage,
        inputUsername: $inputUsername
    });

    var $canvas = $('#game-canvas');

    game.renderer.setCanvas($canvas[0]);

    if(MAP_DATA){
        game.map.data = MAP_DATA;
        game.renderer.draw();
    }

    global.game = game;
}());

