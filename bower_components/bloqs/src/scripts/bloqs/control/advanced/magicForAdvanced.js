/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementInputBloq = require('./../../statementInputBloq');

/**
 * Bloq name: magic For
 *
 * Bloq type: Statement-Input
 *
 * Description: It repeats the following code, iterating a the specific value.
 *
 * Return type: none
 */

var magicForAdvanced = _.merge(_.clone(StatementInputBloq, true), {

    name: 'magicForAdvanced',
    bloqClass: 'bloq-magicfor',
    content: [
        [{
            alias: 'text',
            value: 'bloq-magicfor-repeat'
        }, {
            bloqInputId: 'TIMES',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['selectVariable', 'number']
        }, {
            alias: 'text',
            value: 'bloq-magicfor-times'
        }]
    ],
    code: '',
    arduino: {
        code: 'for(int bitbloqForCounter=0;bitbloqForCounter < {TIMES};bitbloqForCounter += 1){{STATEMENTS}}'
    }
});

utils.preprocessBloq(magicForAdvanced);

module.exports = magicForAdvanced;