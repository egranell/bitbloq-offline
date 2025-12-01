/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../../build-utils'),
    StatementBloq = require('./../../../../statementBloq');

/**
 * Bloq name: mkbSetExternalRGBLedAdvancedFull
 *
 * Bloq type: Statement
 *
 * Description: It switches on a specific rgb led, selectable
 *              from a first drop-down, with the selectable colour
 *              from a second drop-down.
 *
 * Return type: none
 */

var mkbSetExternalRGBLedAdvancedFull = _.merge(_.clone(StatementBloq, true), {

    name: 'mkbSetExternalRGBLedAdvancedFull',
    bloqClass: 'bloq-mbot-setrgbLed',
    content: [
        [{
            alias: 'text',
            value: 'bloq-rgbLed'
        }, {
            bloqInputId: 'LED',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
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

utils.preprocessBloq(mkbSetExternalRGBLedAdvancedFull);

module.exports = mkbSetExternalRGBLedAdvancedFull;