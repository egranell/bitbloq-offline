/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqHumanUpstairs
 *
 * Bloq type: Statement
 *
 * Description: Move the human
 *
 */

var botbloqHumanUpstairs = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqHumanUpstairs',
    bloqClass: 'bloq-botbloq-human-upstairs',
    content: [
        [{
            alias: 'text',
            value: 'upstairs'
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
            code: 'human.upstairs()'
        }]
    }
});

utils.preprocessBloq(botbloqHumanUpstairs);

module.exports = botbloqHumanUpstairs;