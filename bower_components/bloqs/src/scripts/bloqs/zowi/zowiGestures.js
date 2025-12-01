/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: zowiGestures
 *
 * Bloq type: statement
 *
 * Description: It makes Zowi express a specific emotion,
 *              selectable from a drop-down.
 *
 * Return type: none
 */

var zowiGestures = _.merge(_.clone(StatementBloq, true), {

    name: 'zowiGestures',
    bloqClass: 'bloq-zowi-gestures',
    content: [
        [{
            alias: 'text',
            value: 'bloq-zowi-gestures-v1'
        }, {
            id: 'GESTURE',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-zowi-gestures-ZowiHappy-v1',
                value: 'ZowiHappy'
            }, {
                label: 'bloq-zowi-gestures-ZowiSuperHappy-v1',
                value: 'ZowiSuperHappy'
            }, {
                label: 'bloq-zowi-gestures-ZowiSad-v1',
                value: 'ZowiSad'
            }, {
                label: 'bloq-zowi-gestures-ZowiSleeping-v1',
                value: 'ZowiSleeping'
            }, {
                label: 'bloq-zowi-gestures-ZowiFart-v1',
                value: 'ZowiFart'
            }, {
                label: 'bloq-zowi-gestures-ZowiConfused-v1',
                value: 'ZowiConfused'
            }, {
                label: 'bloq-zowi-gestures-ZowiLove-v1',
                value: 'ZowiLove'
            }, {
                label: 'bloq-zowi-gestures-ZowiAngry-v1',
                value: 'ZowiAngry'
            }, {
                label: 'bloq-zowi-gestures-ZowiFretful-v1',
                value: 'ZowiFretful'
            }, {
                label: 'bloq-zowi-gestures-ZowiVictory-v1',
                value: 'ZowiVictory'
            }, {
                label: 'bloq-zowi-gestures-ZowiFail-v1',
                value: 'ZowiFail'
            }]
        }]
    ],
    code: 'zowi.playGesture({GESTURE});',
    arduino: {
        includes: ['BitbloqZowi.h', 'BitbloqUS.h', 'BitbloqBatteryReader.h',
            'BitbloqLedMatrix.h', 'Servo.h', 'BitbloqOscillator.h', 'EEPROM.h'
        ],
        needInstanceOf: [{
            name: 'zowi',
            type: 'Zowi'
        }],
        setupExtraCode: 'zowi.init();',
        code: 'zowi.playGesture({GESTURE});'
    }
});
utils.preprocessBloq(zowiGestures);

module.exports = zowiGestures;