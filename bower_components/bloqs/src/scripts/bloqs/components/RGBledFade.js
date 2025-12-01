/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: rgbLedFade
 *
 * Bloq type: Statement
 *
 * Description: It fades a specific rgb led, selectable from
 *              a drop-down, from the previous state to a given
 *              combination of each basic colour.
 *
 * Return type: none
 */

var rgbLedFade = _.merge(_.clone(StatementBloq, true), {

    name: 'rgbLedFade',
    bloqClass: 'bloq-rgbLed-fade',
    content: [
        [{
            alias: 'text',
            value: 'bloq-rgbLed-fade'
        }, {
            id: 'LED',
            alias: 'dynamicDropdown',
            options: 'rgbs'
        }, {
            alias: 'text',
            value: 'bloq-rgbLed-fade-red'
        }, {
            id: 'RED',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: 'bloq-rgbLed-fade-green'
        }, {
            id: 'GREEN',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: 'bloq-rgbLed-fade-blue'
        }, {
            id: 'BLUE',
            alias: 'numberInput',
            value: 0
        }]
    ],
    arduino: {
        conditional: {
            hardwareProperty: 'codeType',
            hardwareAliasId: 'LED',
            code: {
                'neopixel': '{LED}.setPixelColor(0, {LED}.Color({RED},{GREEN},{BLUE}));\n{LED}.show();',
                '': '{LED}.crossFade({RED},{GREEN},{BLUE});'
            }
        }
    }
});

utils.preprocessBloq(rgbLedFade);

module.exports = rgbLedFade;