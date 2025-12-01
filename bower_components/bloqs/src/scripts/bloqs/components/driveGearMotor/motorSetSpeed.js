/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: 
 *
 * Bloq type: Statement
 *
 * Description:
 *
 * Return type: none
 */

var motorSetSpeed = _.merge(_.clone(StatementBloq, true), {

    name: 'motorSetSpeed',
    bloqClass: 'bloq-components-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-shield-DCmotor-spin'
        }, {
            id: 'MOTOR',
            alias: 'dynamicDropdown',
            options: 'drivegearmotor'
        }, {
            alias: 'text',
            value: 'bloq-mbot-move-speed'
        }, {
            id: 'SPEED',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: '(-255,255)'
        }]
    ],
    code: '',
    arduino: {
        code: '{MOTOR}.setSpeed({SPEED});'
    }
});

utils.preprocessBloq(motorSetSpeed);


module.exports = motorSetSpeed;