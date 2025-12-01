/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqVehicleMove
 *
 * Bloq type: Statement
 *
 * Description: Move the vehicle forward
 *
 */

var botbloqVehicleMove = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqVehicleMove',
    bloqClass: 'bloq-botbloq-vehicle-move',
    content: [
        [{
            id: 'MOVEMENT',
            alias: 'staticDropdown',
            options: [{
                label: 'forward',
                value: 'FORWARD'
            }, {
                label: 'backward',
                value: 'BACKWARD'
            }, {
                label: 'turn-right',
                value: 'TURN_RIGHT'
            }, {
                label: 'turn-left',
                value: 'TURN_LEFT'
            }]
        }, {
            alias: 'text',
            value: 'move-for'
        }, {
            id: 'DELAY',
            alias: 'numberInput',
            value: 1000
        }, {
            alias: 'text',
            value: 'ms-at-speed-of'
        }, {
            id: 'SPEED',
            alias: 'numberInput',
            value: 5
        }]
    ],
    code: '',
    python: {
        libraries: ['BotbloqVehicle'],
        needInstanceOf: [{
            name: 'vehicle',
            type: 'BotbloqVehicle'
        }],
        codeLines: [{
            code: 'vehicle.move("{DELAY}","{SPEED}","{MOVEMENT}")'
        }]
    }
});

utils.preprocessBloq(botbloqVehicleMove);

module.exports = botbloqVehicleMove;