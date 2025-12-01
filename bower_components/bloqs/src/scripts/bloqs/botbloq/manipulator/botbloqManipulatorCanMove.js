/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: botbloqManipulatorCanMove
 *
 * Bloq type: Output
 *
 * Description: It returns if the manipulator can move to the coordinates
 *
 * Return type: Boolean
 */

var botbloqManipulatorCanMove = _.merge(_.clone(OutputBloq, true), {

    name: 'botbloqManipulatorCanMove',
    bloqClass: 'bloq-botbloq-manipulator-canmove',
    content: [
        [{
            alias: 'text',
            value: 'can-move-to'
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
utils.preprocessBloq(botbloqManipulatorCanMove);

module.exports = botbloqManipulatorCanMove;