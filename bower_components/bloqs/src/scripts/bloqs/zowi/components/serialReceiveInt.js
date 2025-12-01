/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: zowiSerialReceiveInt
 *
 * Bloq type: Output
 *
 * Description: It returns what is received by the serial port.
 *
 * Return type: String
 */

var zowiSerialReceiveInt = _.merge(_.clone(OutputBloq, true), {

    name: 'zowiSerialReceiveInt',
    bloqClass: 'bloq-zowicomponent-serial-receiver-int',
    content: [
        [{
            alias: 'text',
            value: 'bloq-zowicomponent-serial-receive-int'
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
        code: 'zowi.readInt()'
    },
    returnType: {
        type: 'simple',
        value: 'String'
    }
});
utils.preprocessBloq(zowiSerialReceiveInt);

module.exports = zowiSerialReceiveInt;