/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: zowiMovementsNoDirV1
 *
 * Bloq type: statement
 *
 * Description: It makes Zowi execute a specific movement, selectable
 *              from a first drop-down, the given number of times at
 *              a determined velocity, selectable from a second drop-down,
 *              until a limit height, selectable from a third drop-down.
 *
 * Return type: none
 */

var zowiMovementsNoDirV1 = _.merge(_.clone(StatementBloq, true), {

    name: 'zowiMovementsNoDir-v1',
    bloqClass: 'bloq-zowi-movements-no-dir-v1',
    content: [
        [{
            id: 'MOVEMENT',
            alias: 'staticDropdown',
            options: [{
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
            }]
        }, {
            id: 'STEPS',
            alias: 'numberInput',
            value: 4
        }, {
            alias: 'text',
            value: 'bloq-zowi-movements-no-dir-speed'
        }, {
            id: 'SPEED',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-zowi-movements-speed-small',
                value: 'LOW_SPEED'
            }, {
                label: 'bloq-zowi-movements-speed-medium',
                value: 'MEDIUM_SPEED'
            }, {
                label: 'bloq-zowi-movements-speed-high',
                value: 'HIGH_SPEED'
            }]
        }, {
            alias: 'text',
            value: 'bloq-zowi-movements-no-dir-height'
        }, {
            id: 'HEIGHT',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-zowi-movements-height-small',
                value: 'SMALL_HEIGHT'
            }, {
                label: 'bloq-zowi-movements-height-medium',
                value: 'MEDIUM_HEIGHT'
            }, {
                label: 'bloq-zowi-movements-height-big',
                value: 'BIG_HEIGHT'
            }]
        }, {
            alias: 'text',
            value: 'bloq-zowi-movements-no-dir-endtext'
        }]
    ],
    code: 'zowi.{MOVEMENT}({STEPS},{SPEED},{HEIGHT});',
    arduino: {
        includes: ['BitbloqZowi.h', 'BitbloqUS.h', 'BitbloqBatteryReader.h',
            'BitbloqLedMatrix.h', 'Servo.h', 'BitbloqOscillator.h', 'EEPROM.h'
        ],
        needInstanceOf: [{
            name: 'zowi',
            type: 'Zowi'
        }],
        setupExtraCode: 'zowi.init();',
        code: 'zowi.{MOVEMENT}({STEPS},{SPEED},{HEIGHT});'
    }
});
utils.preprocessBloq(zowiMovementsNoDirV1);

module.exports = zowiMovementsNoDirV1;