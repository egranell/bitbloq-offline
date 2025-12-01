/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: zowiSerialReceive
 *
 * Bloq type: Output
 *
 * Description: It returns what is received by the serial port.
 *
 * Return type: String
 */

var zowiSerialReceive = _.merge(_.clone(OutputBloq, true), {

    name: 'zowiSerialReceive',
    bloqClass: 'bloq-zowicomponent-serial-receiver',
    content: [
        [{
            alias: 'text',
            value: 'bloq-zowicomponent-serial-receive'
        }]
    ],
    code: '{SERIAL}.readString()',
    arduino: {
        includes: ['BitbloqZowi.h', 'BitbloqUS.h', 'BitbloqBatteryReader.h',
            'BitbloqLedMatrix.h', 'Servo.h', 'BitbloqOscillator.h', 'EEPROM.h'
        ],
        needInstanceOf: [{
            name: 'zowi',
            type: 'Zowi'
        }],
        setupExtraCode: 'zowi.init();',
        code: 'zowi.readString()'
    },
    returnType: {
        type: 'simple',
        value: 'String'
    }
});
utils.preprocessBloq(zowiSerialReceive);

module.exports = zowiSerialReceive;