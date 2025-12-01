/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: botbloqVehicleIRSensor
 *
 * Bloq type: Output
 *
 * Description: It returns the measurement of the line follower sensor
 *              of a specific side, selectable from a drop-down.
 *
 * Return type: float
 */

var botbloqVehicleIRSensor = _.merge(_.clone(OutputBloq, true), {

    name: 'botbloqVehicleIRSensor',
    bloqClass: 'bloq-botbloq-vehicle-ir',
    content: [
        [{
            alias: 'text',
            value: 'read-sensor'
        }, {
            id: 'SIDE',
            alias: 'staticDropdown',
            options: [{
                label: 'right',
                value: 'RIGHT'
            }, {
                label: 'left',
                value: 'LEFT'
            }]
        }]
    ],
    code: '',
    returnType: {
        type: 'simple',
        value: 'int'
    },
    python: {
        libraries: ['BotbloqVehicle'],
        needInstanceOf: [{
            name: 'vehicle',
            type: 'BotbloqVehicle'
        }],
        codeLines: [{
            code: 'vehicle.readIRSensor("{SIDE}")'
        }]
    }
});
utils.preprocessBloq(botbloqVehicleIRSensor);

module.exports = botbloqVehicleIRSensor;