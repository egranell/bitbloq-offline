/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    OutputBloq = require('./../outputBloq');

/**
 * Bloq name: echidnareadSensor
 *
 * Bloq type: Output
 *
 * Description: It returns the measurement of a specific
 *              sensor, selectable from a drop-down.
 *
 * Return type: sensor's return type
 */

var echidnareadSensor = _.merge(_.clone(OutputBloq, true), {

    name: 'echidnaReadSensor',
    bloqClass: 'bloq-read-sensor',
    content: [
        [{
            alias: 'text',
            value: 'bloq-read-read'
        }, {
            id: 'SENSOR',
            alias: 'staticDropdown',
            options: [{
                label: 'echidna-button-1',
                value: 'readButton1'
            }, {
                label: 'echidna-button-2',
                value: 'readButton2'
            }, {
                label: 'echidna-ldrs',
                value: 'readLightSensor'
            }, {
                label: 'echidna-joystick-button',
                value: 'readJoystickButton'
            }]
        }, {
            alias: 'text',
            value: 'from-echidna'
        }]
    ],
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        code: 'echidna.{SENSOR}()'
    }
});

utils.preprocessBloq(echidnareadSensor);

module.exports = echidnareadSensor;