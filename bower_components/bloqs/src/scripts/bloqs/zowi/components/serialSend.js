/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: zowiComponentSerialSend
 *
 * Bloq type: Statement
 *
 * Description: It turns on a specific zowiComponentSerialSend, selectable
 *              from a first drop-down, with a basic note,
 *              selectable from a second drop-down, during
 *              a given period of time.
 *
 * Return type: none
 */

var zowiComponentSerialSend = _.merge(_.clone(StatementBloq, true), {

    name: 'zowiComponentSerialSend',
    bloqClass: 'bloq-zowicomponent-serial-send',
    content: [
        [{
            alias: 'text',
            value: 'bloq-zowicomponent-serial-send'
        }, {
            bloqInputId: 'DATA',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['string', 'number', 'selectVariable']
        }, {
            id: 'LN',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-serial-send-println',
                value: 'true'
            }, {
                label: 'bloq-serial-send-print',
                value: 'false'
            }]
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
        code: 'zowi.serialSend({DATA}, {LN});'
    }
});
utils.preprocessBloq(zowiComponentSerialSend);

module.exports = zowiComponentSerialSend;