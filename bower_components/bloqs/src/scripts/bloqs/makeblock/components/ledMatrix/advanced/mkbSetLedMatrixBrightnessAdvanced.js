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

var mBotSetLedMatrixBrightnessAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotSetLedMatrixBrightnessAdvanced',
    bloqClass: 'bloq-components-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-makeblock-ledmatrix-setLight'

        }, {
            id: 'LEDMATRIX',
            alias: 'dynamicDropdown',
            options: 'ledMatrix'
        }, {
            alias: 'text',
            value: 'to'
        }, {
            bloqInputId: 'BRIGHTNESSLEVEL',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }]
    ],
    code: '',
    arduino: {
        code: '{LEDMATRIX}.setBrightness({BRIGHTNESSLEVEL});'
    }
});
utils.preprocessBloq(mBotSetLedMatrixBrightnessAdvanced);

module.exports = mBotSetLedMatrixBrightnessAdvanced;
