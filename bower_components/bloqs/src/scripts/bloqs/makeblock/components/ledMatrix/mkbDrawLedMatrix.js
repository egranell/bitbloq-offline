/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: show time on led matrix
 *
 * Bloq type: Statement
 *
 * Description:
 *
 */

var mkbDrawLedMatrix = _.merge(_.clone(StatementBloq, true), {

    name: 'mkbDrawLedMatrix',
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
            id: 'COLUMN',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: 'y:'
        }, {
            id: 'ROW',
            alias: 'numberInput',
            value: 0
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
utils.preprocessBloq(mkbDrawLedMatrix);

module.exports = mkbDrawLedMatrix;
