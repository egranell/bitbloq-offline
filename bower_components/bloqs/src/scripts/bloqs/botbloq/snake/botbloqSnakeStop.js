/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqSnakeStop
 *
 * Bloq type: Statement
 *
 * Description: stop the snake
 *
 */

var botbloqSnakeStop = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqSnakeStop',
    bloqClass: 'bloq-botbloq-snake-stop',
    content: [
        [{
            alias: 'text',
            value: 'stop'
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
            code: 'snake.stop()'
        }]
    }
});

utils.preprocessBloq(botbloqSnakeStop);

module.exports = botbloqSnakeStop;