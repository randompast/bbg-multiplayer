'use strict';

var Array2d = require('../shared/array-2d.js');

var config = require('../shared/config.js');

var map = new Array2d();
map.setSize(config.mapWidth, config.mapHeight);

var gameState = {
    map: map
};

module.exports = gameState;