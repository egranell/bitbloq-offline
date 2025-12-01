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

var motorSetSpeedAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'motorSetSpeedAdvanced',
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
            bloqInputId: 'SPEED',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
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

utils.preprocessBloq(motorSetSpeedAdvanced);


module.exports = motorSetSpeedAdvanced;