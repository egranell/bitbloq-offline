/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: rgbLedOff
 *
 * Bloq type: Statement
 *
 * Description: It switches on a specific rgb led, selectable
 *              from a drop-down, with the given combination
 *              of each basic colour.
 *
 * Return type: none
 */

var rgbLedOff = _.merge(_.clone(StatementBloq, true), {

    name: 'rgbLedOff',
    bloqClass: 'bloq-rgbLed-off',
    content: [
        [{
            alias: 'text',
            value: 'bloq-rgbLed-off'
        }, {
            id: 'LED',
            alias: 'dynamicDropdown',
            options: 'rgbs'
        }]
    ],
    arduino: {
        conditional: {
            hardwareProperty: 'codeType',
            hardwareAliasId: 'LED',
            code: {
                'neopixel': '{LED}.setPixelColor(0, {LED}.Color(0, 0, 0));\n{LED}.show();',
                '': '{LED}.setRGBcolor(0,0,0);'
            }
        }
    }
});

utils.preprocessBloq(rgbLedOff);

module.exports = rgbLedOff;