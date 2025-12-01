/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: freakscarMove
 *
 * Bloq type: Statement
 *
 * Description: Move the vehicle forward
 *
 */

var freakscarMove = _.merge(_.clone(StatementBloq, true), {

    name: 'freakscarMove',
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
            id: 'SPEED',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-mbot-move-speed-fast',
                value: '250'
            }, {
                label: 'bloq-mbot-move-speed-normal',
                value: '150'
            }, {
                label: 'bloq-mbot-move-speed-slow',
                value: '80'
            }]
        }]
    ],
    code: '',
    arduino: {
        includes: ['BitbloqDCMotor.h'],
        code: 'robot.move({MOVEMENT},{SPEED});'
    }
});

utils.preprocessBloq(freakscarMove);

module.exports = freakscarMove;
