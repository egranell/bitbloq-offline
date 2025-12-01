/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: mBotSetRGBLed
 *
 * Bloq type: Statement
 *
 * Description: It switches on a specific rgb led, selectable
 *              from a first drop-down, with the selectable colour
 *              from a second drop-down.
 *
 * Return type: none
 */

var mBotSetRGBLed = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotSetRGBLed',
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
            id: 'RED',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: 'bloq-rgbLed-green'
        }, {
            id: 'GREEN',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: 'bloq-rgbLed-blue'
        }, {
            id: 'BLUE',
            alias: 'numberInput',
            value: 0
        }]
    ],
    code: '',
    arduino: {
        code: 'robot.setLed(º[{LED}.pin.s],{RED}, {GREEN}, {BLUE});'
    }

});

utils.preprocessBloq(mBotSetRGBLed);

module.exports = mBotSetRGBLed;