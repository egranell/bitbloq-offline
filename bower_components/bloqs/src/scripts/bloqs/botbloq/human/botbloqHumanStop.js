/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqHumanStop
 *
 * Bloq type: Statement
 *
 * Description: Stop the human
 *
 */

var botbloqHumanStop = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqHumanStop',
    bloqClass: 'bloq-botbloq-human-stop',
    content: [
        [{
            alias: 'text',
            value: 'stop'
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
            code: 'human.stop()'
        }]
    }
});

utils.preprocessBloq(botbloqHumanStop);

module.exports = botbloqHumanStop;