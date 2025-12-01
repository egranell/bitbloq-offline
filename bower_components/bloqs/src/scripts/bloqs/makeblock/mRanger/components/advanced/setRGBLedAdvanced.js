/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../../build-utils'),
    StatementBloq = require('./../../../../statementBloq');

/**
 * Bloq name: mBotSetRGBLedAdvanced
 *
 * Bloq type: Statement
 *
 * Description: It switches on a specific rgb led, selectable
 *              from a first drop-down, with the selectable colour
 *              from a second drop-down.
 *
 * Return type: none
 */

var mBotSetRGBLedAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotSetRGBLedAdvanced',
    bloqClass: 'bloq-mbot-setrgbLed',
    content: [
        [{
            alias: 'text',
            value: 'bloq-led-turnon'
        }, {
            id: 'LED',
            alias: 'dynamicDropdown',
            options: 'mkb_integrated_RGB'
        }, {
            alias: 'text',
            value: 'bloq-rgbLed-red'
        }, {
            bloqInputId: 'RED',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-rgbLed-green'
        }, {
            bloqInputId: 'GREEN',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-rgbLed-blue'
        }, {
            bloqInputId: 'BLUE',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }]
    ],
    code: '',
    arduino: {
        code: 'robot.setLed(º[{LED}.pin.s],{RED}, {GREEN}, {BLUE});'
    }

});

utils.preprocessBloq(mBotSetRGBLedAdvanced);

module.exports = mBotSetRGBLedAdvanced;