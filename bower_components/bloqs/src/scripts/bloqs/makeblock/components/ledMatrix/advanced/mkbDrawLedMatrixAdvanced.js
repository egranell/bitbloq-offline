/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../../build-utils'),
    StatementBloq = require('./../../../../statementBloq');

/**
 * Bloq name: show time on led matrix
 *
 * Bloq type: Statement
 *
 * Description:
 *
 */

var mkbDrawLedMatrixAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'mkbDrawLedMatrixAdvanced',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            id: 'STATE',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-led-turnon',
                value: true
            }, {
                label: 'bloq-led-turnoff',
                value: false
            }]
        }, {
            alias: 'text',
            value: 'el led en el punto x:'
        }, {
            bloqInputId: 'COLUMN',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'y:'
        }, {
            bloqInputId: 'ROW',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'in-the'
        }, {
            id: 'LEDMATRIX',
            alias: 'dynamicDropdown',
            options: 'ledMatrix'
        }]
    ],
    code: '',
    arduino: {
        code: '{LEDMATRIX}.drawLed({COLUMN},{ROW}, {STATE});'
    }
});
utils.preprocessBloq(mkbDrawLedMatrixAdvanced);

module.exports = mkbDrawLedMatrixAdvanced;
