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

var mBotShowStringOnLedMatrixAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotShowStringOnLedMatrixAdvanced',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-makeblock-ledmatrix-write'
        }, {
            bloqInputId: 'TEXT',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['string', 'selectVariable']
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
        code: '{LEDMATRIX}.drawStr(0,7,{TEXT});'
    }
});
utils.preprocessBloq(mBotShowStringOnLedMatrixAdvanced);

module.exports = mBotShowStringOnLedMatrixAdvanced;
