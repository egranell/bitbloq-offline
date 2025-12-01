/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: zowiMouthAdvanced
 *
 * Bloq type: statement
 *
 * Description: It makes Zowi draw a specific expression,
 *              selectable from a drop-down, on his mouth.
 *
 * Return type: none
 */

var zowiMouthAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'zowiMouthAdvanced',
    bloqClass: 'bloq-zowi-mouth',
    content: [
        [{
            alias: 'text',
            value: 'bloq-zowi-mouth-custom'
        }, {
            id: 'BINARY',
            alias: 'numberInput',
            value: '111111111111111111111111111111'
        }]
    ],
    code: '',
    arduino: {
        includes: ['BitbloqZowi.h', 'BitbloqUS.h', 'BitbloqBatteryReader.h',
            'BitbloqLedMatrix.h', 'Servo.h', 'BitbloqOscillator.h', 'EEPROM.h'
        ],
        needInstanceOf: [{
            name: 'zowi',
            type: 'Zowi'
        }],
        setupExtraCode: 'zowi.init();',
        code: 'zowi.putMouth(0b00{BINARY}, false);'
    }
});
utils.preprocessBloq(zowiMouthAdvanced);

module.exports = zowiMouthAdvanced;