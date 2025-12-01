/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: continuousServoStopAdvanced
 *
 * Bloq type: Statement
 *
 * Description: It stops a specific continuous servo.
 *
 * Return type: none
 */

var continuousServoStopAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'continuousServoStopAdvanced',
    bloqClass: 'bloq-continuous-servo-stop-advanced',
    content: [
        [{
            alias: 'text',
            value: 'bloq-continuous-servo-stop-advanced-stop'
        }, {
            bloqInputId: 'SERVO',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['hwVariable', 'selectVariable']
        }]
    ],
    code: '{SERVO}.write(90);',
    arduino: {
        code: '{SERVO}.write(90);'
    }
});

utils.preprocessBloq(continuousServoStopAdvanced);


module.exports = continuousServoStopAdvanced;