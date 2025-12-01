/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../../build-utils'),
    StatementBloq = require('./../../../../statementBloq');

/**
 * Bloq name: mBotSetLedAdvanced
 *
 * Bloq type: Statement
 *
 *
 *
 */

var mBotSetLedAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotSetLedAdvanced',
    bloqClass: 'bloq-mbot-setled',
    content: [
        [{
            alias: 'text',
            value: 'bloq-mbot-setled-advanced-set'
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
        }, {
            alias: 'text',
            value: 'bloq-mbot-setled-advanced-colormix'
        }, {
            alias: 'text',
            value: 'bloq-mbot-setled-advanced-red'
        }, {
            bloqInputId: 'RED',
            alias: 'bloqInput',
            acceptType: ['float'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-mbot-setled-advanced-green'
        }, {
            bloqInputId: 'GREEN',
            alias: 'bloqInput',
            acceptType: ['float'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-mbot-setled-advanced-blue'
        }, {
            bloqInputId: 'BLUE',
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
        code: 'mBotv1.setLed({LEDS}, {RED}, {GREEN}, {BLUE});'
    }
});

utils.preprocessBloq(mBotSetLedAdvanced);

module.exports = mBotSetLedAdvanced;