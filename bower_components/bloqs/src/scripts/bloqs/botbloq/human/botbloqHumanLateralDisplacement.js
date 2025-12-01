/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqHumanLateralDisplacement
 *
 * Bloq type: Statement
 *
 * Description: Move the human
 *
 */

var botbloqHumanLateralDisplacement = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqHumanLateralDisplacement',
    bloqClass: 'bloq-botbloq-human-lateraldisplacement',
    content: [
        [{
            alias: 'text',
            value: 'lateraldisplacement-moveto'
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
            code: 'human.lateralDisplacement("{FOOT}", {STEPS})'
        }]
    }
});

utils.preprocessBloq(botbloqHumanLateralDisplacement);

module.exports = botbloqHumanLateralDisplacement;