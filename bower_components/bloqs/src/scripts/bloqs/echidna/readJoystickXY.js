/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    OutputBloq = require('./../outputBloq');

/**
 * Bloq name: echidnaReadJoystickXY
 *
 * Bloq type: Statement-Input
 *
 * Description:
 *
 * Return type: none
 */

var echidnaReadJoystickXY = _.merge(_.clone(OutputBloq, true), {

    name: 'echidnaReadJoystickXY',
    bloqClass: 'bloq-components-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-read-mkb_joystick'
        }, {
            id: 'OPTION',
            alias: 'staticDropdown',
            options: [{
                label: 'X',
                value: 'X'
            }, {
                label: 'Y',
                value: 'Y'
            }]
        }, {
            alias: 'text',
            value: 'bloq-of-joystick'
        }]
    ],
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        conditional: {
            aliasId: 'OPTION',
            code: {
                'X': 'echidna.readJoystickX()',
                'Y': 'echidna.readJoystickY()'
            }
        }
    }
});

utils.preprocessBloq(echidnaReadJoystickXY);

module.exports = echidnaReadJoystickXY;