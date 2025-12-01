/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqManipulatorMoveOnSpace
 *
 * Bloq type: Statement
 *
 * Description: Move the joints
 *
 */

var botbloqManipulatorMoveOnSpace = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqManipulatorMoveOnSpace',
    bloqClass: 'bloq-botbloq-manipulator-moveonspace',
    content: [
        [{
            alias: 'text',
            value: 'move-to'
        }, {
            alias: 'text',
            value: 'x:'
        }, {
            id: 'X',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: 'y:'
        }, {
            id: 'Y',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: 'z:'
        }, {
            id: 'Z',
            alias: 'numberInput',
            value: 0
        }]
    ],
    code: '',
    python: {
        libraries: ['BotbloqManipulator'],
        needInstanceOf: [{
            name: 'manipulator',
            type: 'BotbloqManipulator'
        }],
        codeLines: [{
            code: 'manipulator.move({X}, {Y}, {Z})'
        }]
    }
});

utils.preprocessBloq(botbloqManipulatorMoveOnSpace);

module.exports = botbloqManipulatorMoveOnSpace;