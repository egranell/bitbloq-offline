/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: zowiButtons
 *
 * Bloq type: Output
 *
 * Description: It returns the read of one of both buttons of
 *              the Zowi's back, selectable from a drop-down.
 *
 * Return type: float
 */

var zowiButtons = _.merge(_.clone(OutputBloq, true), {

    name: 'zowiButtons',
    bloqClass: 'bloq-zowi-buttons',
    content: [
        [{
            alias: 'text',
            value: 'bloq-zowi-buttons'
        }, {
            id: 'BUTTON',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-zowi-buttons-A',
                value: 'PIN_AButton'
            }, {
                label: 'bloq-zowi-buttons-B',
                value: 'PIN_BButton'
            }]
        }]
    ],
    code: 'digitalRead({BUTTON})',
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
        code: 'digitalRead({BUTTON})'
    }
});

utils.preprocessBloq(zowiButtons);

module.exports = zowiButtons;