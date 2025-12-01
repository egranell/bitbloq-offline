/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqSnakeMove
 *
 * Bloq type: Statement
 *
 * Description: Move the snake
 *
 */

var botbloqSnakeMove = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqSnakeMove',
    bloqClass: 'bloq-botbloq-snake-move',
    content: [
        [{
            id: 'MOVEMENT',
            alias: 'staticDropdown',
            options: [{
                label: 'forward.',
                value: 'FORWARD'
            }, {
                label: 'backward.',
                value: 'BACKWARD'
            }]
        }, {
            alias: 'text',
            value: 'move-for'
        }, {
            id: 'DELAY',
            alias: 'numberInput',
            value: 1000
        }, {
            alias: 'text',
            value: 'ms'
        }]
    ],
    code: '',
    python: {
        libraries: ['BotbloqSnake'],
        needInstanceOf: [{
            name: 'snake',
            type: 'BotbloqSnake'
        }],
        codeLines: [{
            code: 'snake.move("{MOVEMENT}", {DELAY})'
        }]
    }
});

utils.preprocessBloq(botbloqSnakeMove);

module.exports = botbloqSnakeMove;