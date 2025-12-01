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

var mBotShowTimeOnLedMatrix = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotShowTimeOnLedMatrix',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-makeblock-ledmatrix-writeTime'
        }, {
            id: 'HOUR',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: ':'
        }, {
            id: 'MINUTES',
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
        code: '{LEDMATRIX}.showClock({HOUR},{MINUTES},1);'
    }
});
utils.preprocessBloq(mBotShowTimeOnLedMatrix);

module.exports = mBotShowTimeOnLedMatrix;
