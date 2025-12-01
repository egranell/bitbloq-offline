/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: analogWrite
 *
 * Bloq type: Statement
 *
 * Description: It sets a specific analog pin with a given value.
 *
 * Return type: none
 */

var analogWrite = _.merge(_.clone(StatementBloq, true), {

    name: 'analogWrite',
    bloqClass: 'bloq-pin-writte-advanced',
    content: [
        [{
            alias: 'text',
            value: 'bloq-pin-analog-write-V1'
        }, {
            bloqInputId: 'PIN',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-pin-analog-write-data-V1'
        }, {
            bloqInputId: 'DATA',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['pinLevels', 'number', 'selectVariable']
        }]
    ],
    code: '\'{PIN}\'.indexOf(\'A\') !== -1 ? \'analogWrite({PIN},{DATA});\'.replace(/"/g, \'\') : \'analogWrite({PIN},{DATA});\'',
    arduino: {
        code: 'analogWrite(¬{PIN.formatPin}, {DATA});'
    }
});

utils.preprocessBloq(analogWrite);


module.exports = analogWrite;