/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqHumanMove
 *
 * Bloq type: Statement
 *
 * Description: Move the human
 *
 */

var botbloqHumanMove = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqHumanMove',
    bloqClass: 'bloq-botbloq-human-move',
    content: [
        [{
            id: 'MOVEMENT',
            alias: 'staticDropdown',
            options: [{
                label: 'forward',
                value: 'FORWARD'
            }, {
                label: 'backward',
                value: 'BACKWARD'
            }, {
                label: 'turn-right',
                value: 'TURN_RIGHT'
            }, {
                label: 'turn-left',
                value: 'TURN_LEFT'
            }]
        }, {
            id: 'STEPS',
            alias: 'numberInput',
            value: 3
        }, {
            alias: 'text',
            value: 'steps'
        }]
    ],
    code: '',
    python: {
        libraries: ['BotbloqHuman'],
        needInstanceOf: [{
            name: 'human',
            type: 'BotbloqHuman'
        }],
        codeLines: [{
            code: 'human.move("{MOVEMENT}", {STEPS})'
        }]
    }
});

utils.preprocessBloq(botbloqHumanMove);

module.exports = botbloqHumanMove;