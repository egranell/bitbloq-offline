/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: lcdWriteAdvanced
 *
 * Bloq type: Statement
 *
 * Description: It writes the given input on a specific LCD.
 *
 * Return type: none
 */

var lcdWriteAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'lcdWriteAdvanced',
    bloqClass: 'bloq-lcd-writte-advanced',
    content: [
        [{
            alias: 'text',
            value: 'bloq-lcd-writte-advanced-write'
        }, {
            bloqInputId: 'TEXT',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['string', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-lcd-writte-advanced-inLCD'
        }, {
            bloqInputId: 'LCD',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['hwVariable', 'selectVariable']
        }]
    ],
    code: '{LCD}.print({TEXT});',
    arduino: {
        code: '{LCD}.print({TEXT});'
    }

});

utils.preprocessBloq(lcdWriteAdvanced);

module.exports = lcdWriteAdvanced;