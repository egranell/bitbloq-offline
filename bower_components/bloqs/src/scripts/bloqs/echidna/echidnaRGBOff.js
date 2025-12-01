/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: echidnaRGBOff
 *
 * Bloq type: Statement
 *
 * Description: It switches on a specific rgb led, selectable
 *              from a drop-down, with the given combination
 *              of each basic colour.
 *
 * Return type: none
 */

var echidnaRGBOff = _.merge(_.clone(StatementBloq, true), {

    name: 'echidnaRGBOff',
    bloqClass: 'bloq-rgbLed-off',
    content: [
        [{
            alias: 'text',
            value: 'bloq-rgbLed-off'
        }, {

            alias: 'text',
            value: 'from-echidna'

        }]
    ],
    code: 'echidna.setRGBcolor(0,0,0);',
    arduino: {
        code: 'echidna.setRGBcolor(0,0,0);'
    }
});

utils.preprocessBloq(echidnaRGBOff);

module.exports = echidnaRGBOff;