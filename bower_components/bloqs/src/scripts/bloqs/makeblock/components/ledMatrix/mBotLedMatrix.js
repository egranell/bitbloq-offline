/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: buzzer
 *
 * Bloq type: Statement
 *
 * Description: It turns on a specific buzzer, selectable
 *              from a first drop-down, with a basic note,
 *              selectable from a second drop-down, during
 *              a given period of time.
 *
 * Return type: none
 */

var mBotLedMatrix = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotLedMatrix',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-makeblock-ledmatrix-draw'
        }, {
            id: 'DRAW',
            alias: 'dotsMatrix',
            options: {
                rows: 8,
                columns: 16
            },
            value: '0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0'
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
        code: '{LEDMATRIX}.draw({DRAW});'
    }
});
utils.preprocessBloq(mBotLedMatrix);

module.exports = mBotLedMatrix;
