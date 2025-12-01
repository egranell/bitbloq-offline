/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqSnakeLateralDisplacement
 *
 * Bloq type: Statement
 *
 * Description: move the snake
 *
 */

var botbloqSnakeLateralDisplacement = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqSnakeLateralDisplacement',
    bloqClass: 'bloq-botbloq-snake-lateraldisplacement',
    content: [
        [{
            alias: 'text',
            value: 'lateraldisplacement-moveto'
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
            code: 'snake.lateralDisplacement("{SIDE}", {DELAY})'
        }]
    }
});

utils.preprocessBloq(botbloqSnakeLateralDisplacement);

module.exports = botbloqSnakeLateralDisplacement;