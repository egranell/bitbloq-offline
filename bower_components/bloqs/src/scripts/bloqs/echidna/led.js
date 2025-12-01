/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: echidnaLeds
 *
 * Bloq type: Statement
 *
 * Description: It turns on the buzzer of equidna with a basic note,
 *              selectable from a drop-down, during a given period of time.
 *
 * Return type: none
 */

var echidnaLeds = _.merge(_.clone(StatementBloq, true), {

    name: 'echidnaLeds',
    bloqClass: 'bloq-components-color',
    content: [
        [{
            id: 'ACTION',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-led-turnon',
                value: 'HIGH'
            }, {
                label: 'bloq-led-turnoff',
                value: 'LOW'
            }]
        }, {
            alias: 'text',
            value: 'bloq-led-theLED'
        }, {
            id: 'COLOR',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-rgbLed-simple-red',
                value: '2'
            }, {
                label: 'amber',
                value: '1'
            }, {
                label: 'bloq-rgbLed-simple-green',
                value: '0'
            }]
        }]
    ],
    arduino: {
        code: 'echidna.setLed({COLOR},{ACTION});'
    }
});
utils.preprocessBloq(echidnaLeds);

module.exports = echidnaLeds;
