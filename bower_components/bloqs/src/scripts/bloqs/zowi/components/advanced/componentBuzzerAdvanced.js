/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: zowiComponentBuzzerAdvanced
 *
 * Bloq type: Statement
 *
 * Description: It turns on a specific buzzer with a given note
 *              during a determined period of time.
 *
 * Return type: none
 */

var zowiComponentBuzzerAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'zowiComponentBuzzerAdvanced',
    bloqClass: 'bloq-zowicomponent-buzzer-advance',
    content: [
        [{
            alias: 'text',
            value: 'bloq-buzzer-advance-sound'
        }, {
            alias: 'text',
            value: 'bloq-buzzer-advance-note'
        }, {
            bloqInputId: 'NOTE',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-buzzer-advance-for'
        }, {
            bloqInputId: 'SECONDS',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-buzzer-advance-ms'
        }]
    ],
    code: 'tone({BUZZER},{NOTE},{SECONDS});\ndelay({SECONDS});',
    arduino: {
        includes: ['BitbloqZowi.h', 'BitbloqUS.h', 'BitbloqBatteryReader.h',
            'BitbloqLedMatrix.h', 'Servo.h', 'BitbloqOscillator.h', 'EEPROM.h'
        ],
        needInstanceOf: [{
            name: 'zowi',
            type: 'Zowi'
        }],
        setupExtraCode: 'zowi.init();',
        code: 'zowi._tone({NOTE}, {SECONDS}, 0);'
    }
});
utils.preprocessBloq(zowiComponentBuzzerAdvanced);

module.exports = zowiComponentBuzzerAdvanced;