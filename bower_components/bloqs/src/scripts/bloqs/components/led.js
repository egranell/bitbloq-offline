/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: led
 *
 * Bloq type: Statement
 *
 * Description: It switches on or off aspecific led,
 *              selectable from a drop-down.
 *
 * Return type: none
 */

var led = _.merge(_.clone(StatementBloq, true), {

    name: 'led',
    bloqClass: 'bloq-led',
    content: [
        [{
            id: 'STATE',
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
            id: 'LED',
            alias: 'dynamicDropdown',
            options: 'leds'
        }]
    ],
    code: 'digitalWrite({LED},{STATE});',
    arduino: {
        needInstanceOf: [{
            name: '{LED}',
            type: 'const int',
            equals: 'º[{LED}.pin.s]'
        }],
        setupExtraCode: 'pinMode({LED}, OUTPUT);',
        code: 'digitalWrite({LED},{STATE});'
    }
});

utils.preprocessBloq(led);

module.exports = led;