/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: mBotSetLed
 *
 * Bloq type: Statement
 *
 *
 *
 */

var mBotSetLed = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotSetLed',
    bloqClass: 'bloq-mbot-setled',
    content: [
        [{
            alias: 'text',
            value: 'bloq-mbot-setled-set'
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
            value: 'bloq-mbot-setled-colormix'
        }, {
            alias: 'text',
            value: 'bloq-mbot-setled-red'
        }, {
            id: 'RED',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: 'bloq-mbot-setled-green'
        }, {
            id: 'GREEN',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: 'bloq-mbot-setled-blue'
        }, {
            id: 'BLUE',
            alias: 'numberInput',
            value: 0
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

utils.preprocessBloq(mBotSetLed);

module.exports = mBotSetLed;