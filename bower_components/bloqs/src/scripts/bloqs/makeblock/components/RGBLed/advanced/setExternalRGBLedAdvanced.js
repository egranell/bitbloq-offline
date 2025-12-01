/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../../build-utils'),
    StatementBloq = require('./../../../../statementBloq');

/**
 * Bloq name: mkbSetExternalRGBLedAdvanced
 *
 * Bloq type: Statement
 *
 * Description: It switches on a specific rgb led, selectable
 *              from a first drop-down, with the selectable colour
 *              from a second drop-down.
 *
 * Return type: none
 */

var mkbSetExternalRGBLedAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'mkbSetExternalRGBLedAdvanced',
    bloqClass: 'bloq-mbot-setrgbLed',
    content: [
        [{
            alias: 'text',
            value: 'bloq-led-turnon'
        }, {
            id: 'LED',
            alias: 'staticDropdown',
            options: [{
                label: 'todos los leds',
                value: '0'
            }, {
                label: 'el led 1',
                value: '1'
            }, {
                label: 'el led 2',
                value: '2'
            }, {
                label: 'el led 3',
                value: '3'
            }, {
                label: 'el led 4',
                value: '4'
            }]
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
        }, {
            alias: 'text',
            value: 'in'
        }, {
            id: 'RGBLED',
            alias: 'dynamicDropdown',
            options: 'mkb_RGBLed'
        }]
    ],
    code: '',
    arduino: {
        code: '{RGBLED}.showColor({LED},{RED}, {GREEN}, {BLUE});'
    }

});

utils.preprocessBloq(mkbSetExternalRGBLedAdvanced);

module.exports = mkbSetExternalRGBLedAdvanced;