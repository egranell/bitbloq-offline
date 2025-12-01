/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqSnakeRotate
 *
 * Bloq type: Statement
 *
 * Description: roll the snake
 *
 */

var botbloqSnakeRotate = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqSnakeRotate',
    bloqClass: 'bloq-botbloq-snake-rotate',
    content: [
        [{
            alias: 'text',
            value: 'roll-to'
        }, {
            id: 'SIDE',
            alias: 'staticDropdown',
            options: [{
                label: 'right',
                value: 'RIGHT'
            }, {
                label: 'left',
                value: 'LEFT'
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
            code: 'snake.rotate("{SIDE}", {DELAY})'
        }]
    }
});

utils.preprocessBloq(botbloqSnakeRotate);

module.exports = botbloqSnakeRotate;