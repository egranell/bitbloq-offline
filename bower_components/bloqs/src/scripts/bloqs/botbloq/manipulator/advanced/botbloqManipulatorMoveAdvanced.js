/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: botbloqManipulatorMoveOnSpaceAdvanced
 *
 * Bloq type: Statement
 *
 * Description: Move the joints
 *
 */

var botbloqManipulatorMoveOnSpaceAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqManipulatorMoveOnSpaceAdvanced',
    bloqClass: 'bloq-botbloq-manipulator-moveonspace',
    content: [
        [{
            alias: 'text',
            value: 'move-to'
        }, {
            alias: 'text',
            value: 'x:'
        }, {
            bloqInputId: 'X',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'y:'
        }, {
            bloqInputId: 'Y',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'z:'
        }, {
            bloqInputId: 'Z',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
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

utils.preprocessBloq(botbloqManipulatorMoveOnSpaceAdvanced);

module.exports = botbloqManipulatorMoveOnSpaceAdvanced;