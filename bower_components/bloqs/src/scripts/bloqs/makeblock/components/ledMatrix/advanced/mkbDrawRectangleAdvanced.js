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

var mkbDrawRectangleAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'mkbDrawRectangleAdvanced',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'Dibujar rectángulo con origen x:'
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
            value: 'ancho:'
        }, {
            bloqInputId: 'WIDTH',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'alto:'
        }, {
            bloqInputId: 'HEIGHT',
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
        code: '{LEDMATRIX}.drawRectangle({COLUMN},{ROW},{WIDTH},{HEIGHT});'
    }
});
utils.preprocessBloq(mkbDrawRectangleAdvanced);

module.exports = mkbDrawRectangleAdvanced;
