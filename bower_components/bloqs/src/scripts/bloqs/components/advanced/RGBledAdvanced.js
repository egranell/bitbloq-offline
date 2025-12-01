/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: rgbLedAdvanced
 *
 * Bloq type: Statement
 *
 * Description: It switches on a specific rgb led, selectable
 *              from a drop-down, with the given combination
 *              of each basic colour.
 *
 * Return type: none
 */

var rgbLedAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'rgbLedAdvanced',
    bloqClass: 'bloq-rgbLed-advanced',
    content: [
        [{
            alias: 'text',
            value: 'bloq-rgbLed'
        }, {
            id: 'LED',
            alias: 'dynamicDropdown',
            options: 'rgbs'
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
    arduino: {
        conditional: {
            hardwareProperty: 'codeType',
            hardwareAliasId: 'LED',
            code: {
                'neopixel': '{LED}.setPixelColor(0, {LED}.Color({RED},{GREEN},{BLUE}));\n{LED}.show();',
                '': '{LED}.setRGBcolor({RED},{GREEN},{BLUE});'
            }
        }
    }
});

utils.preprocessBloq(rgbLedAdvanced);

module.exports = rgbLedAdvanced;