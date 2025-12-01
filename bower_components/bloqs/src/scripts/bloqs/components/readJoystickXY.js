/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    OutputBloq = require('./../outputBloq');

/**
 * Bloq name: mbot-SomethingNear
 *
 * Bloq type: Statement-Input
 *
 * Description:
 *
 * Return type: none
 */

var bloqMBotSomethingNear = _.merge(_.clone(OutputBloq, true), {

    name: 'readJoystickXY',
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
        }, {
            id: 'JOYSTICK',
            alias: 'dynamicDropdown',
            options: 'joystick' //category
        }]
    ],
    code: '',
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        conditional: {
            aliasId: 'OPTION',
            code: {
                'X': '{JOYSTICK}.readPinX()',
                'Y': '{JOYSTICK}.readPinY()'
            }
        }
    }
});

utils.preprocessBloq(bloqMBotSomethingNear);

module.exports = bloqMBotSomethingNear;