/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: zowiReadSensor
 *
 * Bloq type: Output
 *
 * Description: It returns the measurement of a specific
 *              sensor, selectable from a drop-down.
 *
 * Return type: sensor's return type
 */

var zowiReadSensor = _.merge(_.clone(OutputBloq, true), {

    name: 'zowiReadSensor',
    bloqClass: 'bloq-zowicomponent-read-sensor',
    content: [
        [{
            alias: 'text',
            value: 'bloq-read-read'
        }, {
            id: 'SENSOR',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-zowi-button-A',
                value: 'buttonA'
            }, {
                label: 'bloq-zowi-button-B',
                value: 'buttonB'
            }, {
                label: 'bloq-zowi-sound-sensor',
                value: 'sound'
            }, {
                label: 'bloq-zowi-us-sensor',
                value: 'us'
            }]
        }]
    ],
    code: '',
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        includes: ['BitbloqZowi.h', 'BitbloqUS.h', 'BitbloqBatteryReader.h',
            'BitbloqLedMatrix.h', 'Servo.h', 'BitbloqOscillator.h', 'EEPROM.h'
        ],
        needInstanceOf: [{
            name: 'zowi',
            type: 'Zowi'
        }],
        setupExtraCode: 'zowi.init();',
        code: 'zowi.readSensor("{SENSOR}")'
    }
});

utils.preprocessBloq(zowiReadSensor);

module.exports = zowiReadSensor;