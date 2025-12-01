/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: mbot-
 *
 * Bloq type: Statement-Input
 *
 * Description:
 *
 * Return type: none
 */

var robotSetMotorSpeedAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'robotSetMotorSpeedAdvanced',
    bloqClass: 'bloq-components-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-shield-DCmotor-spin'
        }, {
            id: 'DIRECTION',
            alias: 'staticDropdown',
            options: [{
                label: 'right-male',
                value: 'Right'
            }, {
                label: 'left-male',
                value: 'Left'
            }]
        }, {
            alias: 'text',
            value: 'bloq-mbot-move-speed'
        }, {
            bloqInputId: 'SPEED',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: '(-200,200)'
        }]
    ],
    code: '',
    arduino: {
        code: 'robot.set{DIRECTION}MotorSpeed({SPEED});'
    }
});

utils.preprocessBloq(robotSetMotorSpeedAdvanced);


module.exports = robotSetMotorSpeedAdvanced;