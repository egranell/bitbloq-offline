/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: oscillatorStop
 *
 * Bloq type: Statement
 *
 * Description: It stops a specific servo, selectable from a
 *              drop-down.
 *
 * Return type: none
 */

var oscillatorStop = _.merge(_.clone(StatementBloq, true), {

    name: 'oscillatorStop',
    bloqClass: 'bloq-oscillator-stop',
    content: [
        [{
            alias: 'text',
            value: 'bloq-oscillator-stop-stop'
        }, {
            id: 'OSCILLATOR',
            alias: 'dynamicDropdown',
            options: 'oscillators'
        }]
    ],
    code: '{OSCILLATOR}.Stop();',
    arduino: {
        includes: [
            'Servo.h',
            'Wire.h',
            'BitbloqOscillator.h'
        ],
        needInstanceOf: [{
            name: '{OSCILLATOR}',
            type: 'Oscillator'
        }],
        setupExtraCode: '{OSCILLATOR}.attach(º[{OSCILLATOR}.pin.s]);',
        code: '{OSCILLATOR}.Stop();'
    }

});
utils.preprocessBloq(oscillatorStop);

module.exports = oscillatorStop;