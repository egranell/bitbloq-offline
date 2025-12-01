/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: continuousServoStop
 *
 * Bloq type: Statement
 *
 * Description: It stops a specific continuous servo, selectable
 *              from a drop-down.
 *
 * Return type: none
 */

var continuousServoStop = _.merge(_.clone(StatementBloq, true), {

    name: 'continuousServoStop',
    bloqClass: 'bloq-continuous-servo-stop',
    content: [
        [{
            alias: 'text',
            value: 'bloq-continuous-servo-stop-stop'
        }, {
            id: 'SERVO',
            alias: 'dynamicDropdown',
            options: 'continuousServos'
        }]
    ],
    code: '{SERVO}.write(90);',
    arduino: {
        includes: ['Servo.h'],
        needInstanceOf: [{
            name: '{SERVO}',
            type: 'Servo'
        }],
        setupExtraCode: '{SERVO}.attach(º[{SERVO}.pin.s]);',
        code: '{SERVO}.write(90);'
    }

});

utils.preprocessBloq(continuousServoStop);


module.exports = continuousServoStop;