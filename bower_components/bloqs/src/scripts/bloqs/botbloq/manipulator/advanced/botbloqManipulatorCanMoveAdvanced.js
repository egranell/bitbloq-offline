/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    OutputBloq = require('./../../../outputBloq');

/**
 * Bloq name: botbloqManipulatorCanMoveAdvanced
 *
 * Bloq type: Output
 *
 * Description: It returns if the manipulator can move to the coordinates
 *
 * Return type: Boolean
 */

var botbloqManipulatorCanMoveAdvanced = _.merge(_.clone(OutputBloq, true), {

    name: 'botbloqManipulatorCanMoveAdvanced',
    bloqClass: 'bloq-botbloq-manipulator-canmove',
    content: [
        [{
            alias: 'text',
            value: 'can-move-to'
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
        }, {
            alias: 'text',
            value: '?'
        }]
    ],
    code: '',
    returnType: {
        type: 'simple',
        value: 'bool'
    },
    python: {
        libraries: ['BotbloqManipulator'],
        needInstanceOf: [{
            name: 'manipulator',
            type: 'BotbloqManipulator'
        }],
        codeLines: [{
            code: 'vehicle.canMove({X}, {Y}, {Z})'
        }]
    }
});
utils.preprocessBloq(botbloqManipulatorCanMoveAdvanced);

module.exports = botbloqManipulatorCanMoveAdvanced;