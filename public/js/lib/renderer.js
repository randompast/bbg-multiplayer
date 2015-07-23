'use strict';

var _ = require('lodash');

var defaults = {

    // required
    game: null,
    canvas: null,

    map: null,
    tileSize: null,

    init: function(settings){
        _.extend(this, settings);

        this.tileSize = this.game.tileSize;

        if(this.canvas){
            this.setCanvas(this.canvas);
        }
    },
    setCanvas: function(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    },
    draw: function(){

        var ctx = this.ctx;
        var tileSize = this.tileSize;

        this.game.map.each(function(val, x, y){
            var color = val || '#fff';

            var cx = x * tileSize;
            var cy = y * tileSize;

            ctx.fillStyle = color;
            ctx.fillRect(
                cx,
                cy,
                tileSize,
                tileSize
            );
        });
    },
};

var make = function(settings){
    var instance = Object.create(defaults);
    instance.init(settings);
    return instance;
};

module.exports = make;
