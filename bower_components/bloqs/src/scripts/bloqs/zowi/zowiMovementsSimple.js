/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: zowiMovementsSimple
 *
 * Bloq type: statement
 *
 * Description: It makes Zowi execute a specific movement,
 *              selectable from a drop-down, the given number of times.
 *
 * Return type: none
 */

var zowiMovementsSimple = _.merge(_.clone(StatementBloq, true), {

    name: 'zowiMovementsSimple',
    bloqClass: 'bloq-zowi-movements-simple',
    content: [
        [{
            id: 'MOVEMENT',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-zowi-movements-simple-walk-v1',
                value: 'walk'
            }, {
                label: 'bloq-zowi-movements-simple-turn-v1',
                value: 'turn'
            }, {
                label: 'bloq-zowi-movements-simple-shakeLeg-v1',
                value: 'shakeLeg'
            }, {
                label: 'bloq-zowi-movements-simple-bend-v1',
                value: 'bend'
            }, {
                label: 'bloq-zowi-movements-simple-moonwalker-v1',
                value: 'moonwalker'
            }, {
                label: 'bloq-zowi-movements-simple-crusaito-v1',
                value: 'crusaito'
            }, {
                label: 'bloq-zowi-movements-simple-flapping-v1',
                value: 'flapping'
            }, {
                label: 'bloq-zowi-movements-simple-updown-v1',
                value: 'updown'
            }, {
                label: 'bloq-zowi-movements-simple-swing-v1',
                value: 'swing'
            }, {
                label: 'bloq-zowi-movements-simple-tiptoeSwing-v1',
                value: 'tiptoeSwing'
            }, {
                label: 'bloq-zowi-movements-simple-jitter-v1',
                value: 'jitter'
            }, {
                label: 'bloq-zowi-movements-simple-ascendingTurn-v1',
                value: 'ascendingTurn'
            }, {
                label: 'bloq-zowi-movements-simple-jump-v1',
                value: 'jump'
            }]
        }, {
            id: 'STEPS',
            alias: 'numberInput',
            value: 4
        }, {
            alias: 'text',
            value: 'bloq-zowi-movements-simple-steps'
        }]
    ],
    code: 'zowi.{MOVEMENT}({STEPS});',
    arduino: {
        includes: ['BitbloqZowi.h', 'BitbloqUS.h', 'BitbloqBatteryReader.h',
            'BitbloqLedMatrix.h', 'Servo.h', 'BitbloqOscillator.h', 'EEPROM.h'
        ],
        needInstanceOf: [{
            name: 'zowi',
            type: 'Zowi'
        }],
        setupExtraCode: 'zowi.init();',
        code: 'zowi.{MOVEMENT}({STEPS});'
    }
});
utils.preprocessBloq(zowiMovementsSimple);

module.exports = zowiMovementsSimple;