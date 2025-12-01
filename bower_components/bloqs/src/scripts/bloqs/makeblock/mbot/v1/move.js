/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: mBotMove
 *
 * Bloq type: Statement
 *
 * Description: Move the vehicle forward
 *
 */

var mBotMove = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotMove',
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
            value: 'bloq-mbot-move-speed'
        }, {
            id: 'SPEED',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-mbot-move-speed-fast',
                value: '255'
            }, {
                label: 'bloq-mbot-move-speed-normal',
                value: '100'
            }, {
                label: 'bloq-mbot-move-speed-slow',
                value: '50'
            }]
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

utils.preprocessBloq(mBotMove);

module.exports = mBotMove;