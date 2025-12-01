/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');


/**
 * Bloq name: mBotMoveAdvanced
 *
 * Bloq type: Statement
 *
 * Description: Move the vehicle forward
 *
 */

var freakscarMoveSpeed = _.merge(_.clone(StatementBloq, true), {

    name: 'freakscarMoveSpeed',
    bloqClass: 'bloq-freakscar-color',
    content: [
        [{
            id: 'MOVEMENT',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-mbot-move-forward',
                value: '1'
            }, {
                label: 'bloq-mbot-move-backward',
                value: '2'
            }, {
                label: 'bloq-mbot-move-turnright',
                value: '3'
            }, {
                label: 'bloq-mbot-move-turnleft',
                value: '4'
            }]
        }, {
            alias: 'text',
            value: 'bloq-mbot-move-speed'
        }, {
            bloqInputId: 'SPEED',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: '(0-255)'
        }]
    ],
    code: '',
    arduino: {
        code: 'robot.move({MOVEMENT},{SPEED});'
    }
});

utils.preprocessBloq(freakscarMoveSpeed);

module.exports = freakscarMoveSpeed;
