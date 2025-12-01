/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementInputBloq = require('./../../../statementInputBloq');

/**
 * Bloq name: mbot-
 *
 * Bloq type: Statement-Input
 *
 * Description:
 *
 * Return type: none
 */

var remoteButtonPushedSwitch = _.merge(_.clone(StatementInputBloq, true), {

    name: 'remoteButtonPushedSwitch',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-makeblock-remote-switch'
        }, {
            id: 'REMOTE',
            alias: 'dynamicDropdown',
            options: 'remoteControl'
        }]
    ],
    code: '',
    arduino: {
        code: 'switch(¬{REMOTE.readSensor}){{STATEMENTS}}'
    }
});

utils.preprocessBloq(remoteButtonPushedSwitch);
remoteButtonPushedSwitch.connectors[2].acceptedAliases = ['switchChildren'];


module.exports = remoteButtonPushedSwitch;