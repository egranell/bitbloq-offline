/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqHumanRotateByFoot
 *
 * Bloq type: Statement
 *
 * Description: Move the human
 *
 */

var botbloqHumanRotateByFoot = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqHumanRotateByFoot',
    bloqClass: 'bloq-botbloq-human-rotatefoot',
    content: [
        [{
            alias: 'text',
            value: 'rotate'
        }, {
            id: 'DEGREES',
            alias: 'numberInput',
            value: 45
        }, {
            alias: 'text',
            value: 'rotate-grades-foot'
        }, {
            id: 'FOOT',
            alias: 'staticDropdown',
            options: [{
                label: 'right',
                value: 'RIGHT'
            }, {
                label: 'left',
                value: 'LEFT'
            }]
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
            code: 'human.rotateByFoot({DEGREES},"{FOOT}")'
        }]
    }
});

utils.preprocessBloq(botbloqHumanRotateByFoot);

module.exports = botbloqHumanRotateByFoot;