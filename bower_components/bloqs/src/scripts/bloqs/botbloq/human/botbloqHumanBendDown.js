/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqHumanBendDown
 *
 * Bloq type: Statement
 *
 * Description: Bend down
 *
 */

var botbloqHumanBendDown = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqHumanBendDown',
    bloqClass: 'bloq-botbloq-human-benddown',
    content: [
        [{
            alias: 'text',
            value: 'benddown'
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
            code: 'human.benddown()'
        }]
    }
});

utils.preprocessBloq(botbloqHumanBendDown);

module.exports = botbloqHumanBendDown;