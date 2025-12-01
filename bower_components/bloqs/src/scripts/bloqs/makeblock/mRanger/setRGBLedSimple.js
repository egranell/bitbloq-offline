/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: mBotSetRGBLedSimple
 *
 * Bloq type: Statement
 *
 * Description: It switches on a specific rgb led, selectable
 *              from a first drop-down, with the selectable colour
 *              from a second drop-down.
 *
 * Return type: none
 */

var mBotSetRGBLedSimple = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotSetRGBLedSimple',
    bloqClass: 'bloq-mbot-setrgbLed-simple',
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
            value: 'bloq-rgbLed-simple-color'
        }, {
            id: 'COLOR',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-rgbLed-simple-white',
                value: '255,255,255'
            }, {
                label: 'bloq-rgbLed-simple-yellow',
                value: '255,255,0'
            }, {
                label: 'bloq-rgbLed-simple-orange',
                value: '200,50,0'
            }, {
                label: 'bloq-rgbLed-simple-red',
                value: '255,0,0'
            }, {
                label: 'bloq-rgbLed-simple-green',
                value: '0,255,0'
            }, {
                label: 'bloq-rgbLed-simple-dark-green',
                value: '0,61,4'
            }, {
                label: 'bloq-rgbLed-simple-blue',
                value: '40,40,255'
            }, {
                label: 'bloq-rgbLed-simple-dark-blue',
                value: '0,0,255'
            }, {
                label: 'bloq-rgbLed-simple-pink',
                value: '255,0,255'
            }]
        }]
    ],
    code: '',
    arduino: {
        code: 'robot.setLed(º[{LED}.pin.s],{COLOR});'
    }

});

utils.preprocessBloq(mBotSetRGBLedSimple);

module.exports = mBotSetRGBLedSimple;
