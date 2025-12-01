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

var robotSetMotorSpeed = _.merge(_.clone(StatementBloq, true), {

    name: 'robotSetMotorSpeed',
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
            id: 'SPEED',
            alias: 'numberInput',
            value: 0
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

utils.preprocessBloq(robotSetMotorSpeed);


module.exports = robotSetMotorSpeed;