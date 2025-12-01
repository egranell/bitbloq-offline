/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: clear led matrix
 *
 * Bloq type: Statement
 *
 * Description:
 *
 */

var mBotClearLedMatrix = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotClearLedMatrix',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-makeblock-ledmatrix-clear'
        }, {
            id: 'LEDMATRIX',
            alias: 'dynamicDropdown',
            options: 'ledMatrix'
        }]
    ],
    code: '',
    arduino: {
        code: '{LEDMATRIX}.clearScreen();'
    }
});
utils.preprocessBloq(mBotClearLedMatrix);

module.exports = mBotClearLedMatrix;
