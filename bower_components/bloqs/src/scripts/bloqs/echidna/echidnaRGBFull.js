/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: echidnaRGBFull
 *
 * Bloq type: Statement
 *
 * Description: It switches on a specific rgb led, selectable
 *              from a first drop-down, with the selectable colour
 *              from a second drop-down.
 *
 * Return type: none
 */

var echidnaRGBFull = _.merge(_.clone(StatementBloq, true), {

    name: 'echidnaRGBFull',
    bloqClass: 'bloq-components-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-rgbLed'
        }, {
            alias: 'text',
            value: 'with-the-color'
        }, {
            alias: 'text',
            value: 'bloq-mbot-setled-red'
        }, {
            id: 'RED',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: 'bloq-mbot-setled-green'
        }, {
            id: 'GREEN',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: 'bloq-mbot-setled-blue'
        }, {
            id: 'BLUE',
            alias: 'numberInput',
            value: 0
        }]
    ],
    arduino: {
        code: 'echidna.setRGBcolor({RED}, {GREEN}, {BLUE});'
    }

});

utils.preprocessBloq(echidnaRGBFull);

module.exports = echidnaRGBFull;