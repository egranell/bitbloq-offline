/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: mBotTurnOffLed
 *
 * Bloq type: Statement
 *
 *
 *
 */

var mBotTurnOffLed = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotTurnOffLed',
    bloqClass: 'bloq-mbot-turnoffled',
    content: [
        [{
            alias: 'text',
            value: 'bloq-mbot-turnoffled-off'
        }, {
            id: 'LEDS',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-mbot-led-all',
                value: '0'
            }, {
                label: 'bloq-mbot-led-right',
                value: '1'
            }, {
                label: 'bloq-mbot-led-left',
                value: '2'
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
        code: 'mBotv1.setLed({LEDS}, 0, 0, 0);'
    }
});

utils.preprocessBloq(mBotTurnOffLed);

module.exports = mBotTurnOffLed;