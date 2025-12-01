/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

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

    name: 'mBotRGBLedOff',
    bloqClass: 'bloq-mbot-rgbLedsimple-off',
    content: [
        [{
            alias: 'text',
            value: 'bloq-mbot-turnoffled-off'
        }, {
            id: 'LED',
            alias: 'dynamicDropdown',
            options: 'mkb_integrated_RGB'
        }]
    ],
    code: '',
    arduino: {
        code: 'robot.setLed(º[{LED}.pin.s],0,0,0);'
    }
});

utils.preprocessBloq(rgbLedOff);

module.exports = rgbLedOff;