/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    OutputBloq = require('./../../../outputBloq');

/**
 * Bloq name: freakscarLight
 *
 * Bloq type: Output
 *
 * Description: It returns the light measurement that Evolution sees
 *              by a specific side, selectable from a drop-down.
 *
 * Return type: float
 */

var freakscarLight = _.merge(_.clone(OutputBloq, true), {

    name: 'freakscarLight',
    bloqClass: 'bloq-components-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-evolution-light'
        }, {
            id: 'SIDE',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-evolution-light-left',
                value: 'LEFT'
            }, {
                label: 'bloq-evolution-light-right',
                value: 'RIGHT'
            }]
        }, {
            alias: 'text',
            value: 'bloq-evolution-light-evolution'
        }]
    ],
    code: '',
    arduino: {
        includes: ['BitbloqFreaksCar.h'],
        needInstanceOf: [{
            name: 'robot',
            type: 'BitbloqFreaksCar'
        }],
        setupExtraCode: 'robot.setup();',
        conditional: {
            aliasId: 'SIDE',
            code: {
                'LEFT': 'robot.readLDRLeft()',
                'RIGHT': 'robot.readLDRRight()'
            }
        }
    },
    returnType: {
        type: 'simple',
        value: 'int'
    }
});
utils.preprocessBloq(freakscarLight);

module.exports = freakscarLight;