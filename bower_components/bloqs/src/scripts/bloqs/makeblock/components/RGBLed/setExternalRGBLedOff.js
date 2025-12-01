/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: setExternalrgbLedOff
 *
 * Bloq type: Statement
 *
 * Description: It switches on a specific rgb led, selectable
 *              from a drop-down, with the given combination
 *              of each basic colour.
 *
 * Return type: none
 */

var mkbSetExternalrgbLedOff = _.merge(_.clone(StatementBloq, true), {

    name: 'mkbSetExternalRGBLedOff',
    bloqClass: 'bloq-mbot-rgbLedsimple-off',
    content: [
        [{
            alias: 'text',
            value: 'bloq-mbot-turnoffled-off'
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
            value: 'in'
        }, {
            id: 'RGBLED',
            alias: 'dynamicDropdown',
            options: 'mkb_RGBLed'
        }]
    ],
    code: '',
    arduino: {
        code: '{RGBLED}.showColor({LED},0,0,0);'
    }
});

utils.preprocessBloq(mkbSetExternalrgbLedOff);

module.exports = mkbSetExternalrgbLedOff;