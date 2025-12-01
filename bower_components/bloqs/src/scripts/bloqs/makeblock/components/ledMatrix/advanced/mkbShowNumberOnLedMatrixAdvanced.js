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

var mBotShowNumberOnLedMatrixAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotShowNumberOnLedMatrixAdvanced',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-makeblock-ledmatrix-writeNumber'
        }, {
            bloqInputId: 'NUMBER',
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
        code: '{LEDMATRIX}.showNum({NUMBER});'
    }
});
utils.preprocessBloq(mBotShowNumberOnLedMatrixAdvanced);

module.exports = mBotShowNumberOnLedMatrixAdvanced;
