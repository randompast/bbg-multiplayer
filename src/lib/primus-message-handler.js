'use strict';

var _ = require('lodash');

var proto = {
    // required
    primus: null,

    handlers: null,

    init: function(settings){
        _.extend(this, settings);
        this.handlers = {};
        this.primus.on('connection', this.onConnection, this);
    },

    addHandler: function(type, func){
        this.handlers[type] = func;
    },

    onConnection: function(spark){
        var handlers = this.handlers;

        spark.on('data', function(data){
            var type = data.type;
            if(!type){
                return;
            }
            var handler = handlers[type];
            if(handler){
                handler(data, spark, this.primus);
            }
        });
    },

};

var make = function(settings) {
    var instance = Object.create(proto);
    instance.init(settings);
    return instance;
};

module.exports = make;
