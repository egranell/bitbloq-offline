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

var mBotSetLedMatrixBrightness = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotSetLedMatrixBrightness',
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
            id: 'BRIGHTNESSLEVEL',
            alias: 'staticDropdown',
            options: [{
                label: '0',
                value: 0
            }, {
                label: '1',
                value: 1
            }, {
                label: '2',
                value: 2
            }, {
                label: '3',
                value: 3
            }, {
                label: '4',
                value: 4
            }, {
                label: '5',
                value: 5
            }, {
                label: '6',
                value: 6
            }, {
                label: '7',
                value: 7
            }, {
                label: '8',
                value: 8
            }]
        }]
    ],
    code: '',
    arduino: {
        code: '{LEDMATRIX}.setBrightness({BRIGHTNESSLEVEL});'
    }
});
utils.preprocessBloq(mBotSetLedMatrixBrightness);

module.exports = mBotSetLedMatrixBrightness;
