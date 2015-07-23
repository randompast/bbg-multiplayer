'use strict';

var moment = require('moment');
var _ = require('lodash');


var defaults = {
    // required
    game: null,
    form: null,
    log: null,
    inputMessage: null,
    inputUsername: null,


    init: function(settings) {
        _.extend(this, settings);

        this.form.on('submit', this.submit.bind(this));

    },
    submit: function(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        var username = this.inputUsername.val();
        var message = this.inputMessage.val();

        this.send(username, message);
        this.inputMessage.val('');
    },
    send: function(username, message) {

        this.game.primus.write({
            type: 'chat',
            username: username,
            message: message
        });
    },
    receive: function(data) {
        console.log('receive', data);

        var time = moment(data.timestamp)
            .format('h:mm');

        time = '<span class="time">[' + time + ']</span>';
        var user = ' <span class="username">' + data.username + '</span>';

        var msgHtml = '<p class="msg">' + time + user + ': ' + data.message + '</p>';
        this.log.append(msgHtml);
    },
};

var make = function(settings) {
    var instance = Object.create(defaults);
    instance.init(settings);
    return instance;
};

module.exports = make;