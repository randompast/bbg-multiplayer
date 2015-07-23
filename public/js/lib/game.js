'use strict';

var _ = require('lodash');

// shared
var config = require('../../../shared/config.js');
var makeArray2d = require('../../../shared/array-2d.js');

// lib
var makeInput = require('./input.js');
var makeRenderer = require('./renderer.js');

// internal game state
var defaults = {
    config: config,
    map: null,
    player: null,

    streams: null,

    tileSize: null,

    primus: null,

    init: function(settings) {
        _.extend(this, settings);


        this.inputColor = $('.input-color');

        this.tileSize = config.tileSize;

        this.player = {
            x: 3,
            y: 3,
        };

        this.map = makeArray2d();
        this.map.setSize(config.mapWidth, config.mapHeight);

        this.input = makeInput();
        var keyBindings = {
            up: ['UP_ARROW'],
            down: ['DOWN_ARROW'],
            left: ['LEFT_ARROW'],
            right: ['RIGHT_ARROW'],
        };
        this.input.addBindings(keyBindings);
        this.input.onKeyAction = this.onKeyAction.bind(this);

        this.primus.on('data', function(data){
            if(data.type === 'chat'){
                this.chat.receive(data);
            }
            else if(data.type === 'game_map'){
                this.onGameMapReceive(data);
            }

        }, this);

        this.renderer = makeRenderer({
            game: this
        });
    },

    onGameMapReceive: function(d) {
        console.log('onGameMapReceive', d);
        this.map.set(d.x, d.y, d.color);
        this.renderer.draw();
    },

    onKeyAction: function(action) {
        var player = this.player;
        var map = this.map;
        var x = player.x;
        var y = player.y;
        if (action === 'up') {
            y--;
        } else if (action === 'down') {
            y++;
        } else if (action === 'left') {
            x--;
        } else if (action === 'right') {
            x++;
        }

        if (
            x < 0 ||
            x >= map.width ||
            y < 0 ||
            y >= map.height
        ) {
            return;
        }
        player.x = x;
        player.y = y;

        var color = this.inputColor.val();
        var data = {
            type: 'game_map',
            x: x,
            y: y,
            color: color
        };
        console.log('data', data);

        this.primus.write(data);
    }
};

var make = function(settings) {
    var instance = Object.create(defaults);
    instance.init(settings);
    return instance;
};

module.exports = make;