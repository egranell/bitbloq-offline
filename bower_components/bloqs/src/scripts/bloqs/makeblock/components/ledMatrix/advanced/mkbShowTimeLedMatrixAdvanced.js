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

var mBotShowTimeOnLedMatrixAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotShowTimeOnLedMatrixAdvanced',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-makeblock-ledmatrix-writeTime'
        }, {
            bloqInputId: 'HOUR',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: ':'
        }, {
            bloqInputId: 'MINUTES',
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
        code: '{LEDMATRIX}.showClock({HOUR},{MINUTES},1);'
    }
});
utils.preprocessBloq(mBotShowTimeOnLedMatrixAdvanced);

module.exports = mBotShowTimeOnLedMatrixAdvanced;
