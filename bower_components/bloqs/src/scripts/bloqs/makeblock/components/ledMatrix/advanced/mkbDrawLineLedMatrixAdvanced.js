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

var mkbDrawLineAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'mkbDrawLineAdvanced',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'Dibujar línea desde x1:'
        }, {
            bloqInputId: 'COLUMN',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'y1:'
        }, {
            bloqInputId: 'ROW',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'hasta x2:'
        }, {
            bloqInputId: 'COLUMNF',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'y2:'
        }, {
            bloqInputId: 'ROWF',
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
        code: '{LEDMATRIX}.drawLine({COLUMN},{ROW},{COLUMNF},{ROWF});'
    }
});
utils.preprocessBloq(mkbDrawLineAdvanced);

module.exports = mkbDrawLineAdvanced;
