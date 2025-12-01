/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqHexapodLateralDisplacement
 *
 * Bloq type: Statement
 *
 * Description: Move the hexapode
 *
 */

var botbloqHexapodLateralDisplacement = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqHexapodLateralDisplacement',
    bloqClass: 'bloq-botbloq-hexapod-lateraldisplacement',
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
        libraries: ['BotbloqHexapod'],
        needInstanceOf: [{
            name: 'hexapod',
            type: 'BotbloqHexapod'
        }],
        codeLines: [{
            code: 'hexapod.lateralDisplacement("{SIDE}", {STEPS})'
        }]
    }
});

utils.preprocessBloq(botbloqHexapodLateralDisplacement);

module.exports = botbloqHexapodLateralDisplacement;