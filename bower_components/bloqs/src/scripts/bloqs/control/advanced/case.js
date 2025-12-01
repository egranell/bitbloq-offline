/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementInputBloq = require('./../../statementInputBloq');

/**
 * Bloq name: case
 *
 * Bloq type: Statement-Input
 *
 * Description: It executes the following code only if the variable
 *              compared in the switch bloq is equal to the given value.
 *
 * Return type: none
 */

var bloqCaseAdvanced = _.merge(_.clone(StatementInputBloq, true), {
    name: 'caseAdvanced-v1',
    bloqClass: 'bloq-case',
    content: [
        [{
            alias: 'text',
            value: 'bloq-case-ifSameTo'
        }, {
            bloqInputId: 'VALUE',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'string']
        }, {
            alias: 'text',
            value: 'bloq-case-exec'
        }]
    ],
    code: 'case {VALUE}:{STATEMENTS}break;',
    arduino: {
        code: 'case {VALUE}:{STATEMENTS}break;'
    }
});

bloqCaseAdvanced.connectors[0].acceptedAliases = ['switchChildren', 'case'];
bloqCaseAdvanced.connectors[1].acceptedAliases = ['case'];

utils.preprocessBloq(bloqCaseAdvanced);

module.exports = bloqCaseAdvanced;