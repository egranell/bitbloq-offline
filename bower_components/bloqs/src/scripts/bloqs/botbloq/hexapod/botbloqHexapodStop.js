/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqHexapodStop
 *
 * Bloq type: Statement
 *
 * Description: stop the hexapode
 *
 */

var botbloqHexapodStop = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqHexapodStop',
    bloqClass: 'bloq-botbloq-hexapod-stop',
    content: [
        [{
            alias: 'text',
            value: 'stop'
        }]
    ],
    code: '',
    python: {
        libraries: ['BotbloqHexapod'],
        needInstanceOf: [{
            name: 'hexapod',
            type: 'BotbloqHexapod'
        }],
        codeLines: [{
            code: 'hexapod.stop()'
        }]
    }
});

utils.preprocessBloq(botbloqHexapodStop);

module.exports = botbloqHexapodStop;