/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: oscillatorStart
 *
 * Bloq type: Statement
 *
 * Description: It makes a specific servo, selectable from a
 *              drop-down, oscillate as it has been set.
 *
 * Return type: none
 */

var oscillatorStart = _.merge(_.clone(StatementBloq, true), {

    name: 'oscillatorStart',
    bloqClass: 'bloq-oscillator-start',
    content: [
        [{
            alias: 'text',
            value: 'bloq-oscillator-start-oscillator'
        }, {
            id: 'OSCILLATOR',
            alias: 'dynamicDropdown',
            options: 'oscillators'
        }]
    ],
    code: '{OSCILLATOR}.Play();{OSCILLATOR}.refresh();',
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
        code: '{OSCILLATOR}.Play();{OSCILLATOR}.refresh();'
    }
});

utils.preprocessBloq(oscillatorStart);

module.exports = oscillatorStart;