/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: lcdWritePositionAdvanced-v1
 *
 * Bloq type: Statement
 *
 * Description: It writes the given string on a specific LCD in a particular position.
 *
 * Return type: none
 */

var lcdWritePositionAdvancedV1 = _.merge(_.clone(StatementBloq, true), {

    name: 'lcdWritePositionAdvanced-v1',
    bloqClass: 'bloq-lcd-writte',
    content: [
        [{
            alias: 'text',
            value: 'bloq-lcd-writte-write'
        }, {
            bloqInputId: 'TEXT',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['string', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-lcd-writte-inLCD'
        }, {
            bloqInputId: 'LCD',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['hwVariable', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-lcd-writte-advanced-inPosition'
        }, {
            bloqInputId: 'COLUMN',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            bloqInputId: 'ROW',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }]
    ],
    code: '{LCD}.setCursor({COLUMN},{ROW});{LCD}.print({TEXT});',
    arduino: {
        code: '{LCD}.setCursor({COLUMN},{ROW});{LCD}.print({TEXT});'
    }

});

utils.preprocessBloq(lcdWritePositionAdvancedV1);

module.exports = lcdWritePositionAdvancedV1;