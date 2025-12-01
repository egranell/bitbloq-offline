/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../../build-utils'),
    StatementBloq = require('./../../../../statementBloq');

/**
 * Bloq name: mBotMoveAdvanced
 *
 * Bloq type: Statement
 *
 * Description: Move the vehicle forward
 *
 */

var mBotMoveAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotMoveAdvanced',
    bloqClass: 'bloq-mbot-move',
    content: [
        [{
            id: 'MOVEMENT',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-mbot-move-forward',
                value: '1'
            }, {
                label: 'bloq-mbot-move-backward',
                value: '2'
            }, {
                label: 'bloq-mbot-move-turnright',
                value: '3'
            }, {
                label: 'bloq-mbot-move-turnleft',
                value: '4'
            }]
        }, {
            alias: 'text',
            value: 'bloq-mbot-move-advanced-speed'
        }, {
            bloqInputId: 'SPEED',
            alias: 'bloqInput',
            acceptType: ['float'],
            suggestedBloqs: ['number', 'selectVariable']
        }]
    ],
    code: '',
    arduino: {
        includes: ['BitbloqMBotDeprecated.h'],
        needInstanceOf: [{
            name: 'mBotv1',
            type: 'MBot'
        }],
        code: 'mBotv1.move({MOVEMENT},{SPEED});'
    }
});

utils.preprocessBloq(mBotMoveAdvanced);

module.exports = mBotMoveAdvanced;