/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: continuousServoStart
 *
 * Bloq type: Statement
 *
 * Description: It turns on a specific continuous servo, selectable
 *              from a first drop-down, in one of the two directions,
 *              selectable from a second drop-down.
 *
 * Return type: none
 */

var continuousServoStart = _.merge(_.clone(StatementBloq, true), {

    name: 'continuousServoStart',
    bloqClass: 'bloq-continuous-servo-start',
    content: [
        [{
            alias: 'text',
            value: 'bloq-continuous-servo-start-turn'
        }, {
            id: 'SERVO',
            alias: 'dynamicDropdown',
            options: 'continuousServos'
        }, {
            alias: 'text',
            value: 'bloq-continuous-servo-start-direction'
        }, {
            id: 'DIRECTION',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-continuous-servo-start-clockwise',
                value: '180'
            }, {
                label: 'bloq-continuous-servo-start-counterclockwise',
                value: '0'
            }]
        }]
    ],
    code: '{SERVO}.write({DIRECTION});',
    arduino: {
        includes: ['Servo.h'],
        needInstanceOf: [{
            name: '{SERVO}',
            type: 'Servo'
        }],
        setupExtraCode: '{SERVO}.attach(º[{SERVO}.pin.s]);',
        code: '{SERVO}.write({DIRECTION});'
    }
});

utils.preprocessBloq(continuousServoStart);


module.exports = continuousServoStart;