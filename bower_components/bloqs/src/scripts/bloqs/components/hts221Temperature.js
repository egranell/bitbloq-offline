/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    OutputBloq = require('./../outputBloq');

/**
 * Bloq name: hts221Temperature
 *
 * Bloq type: Output
 *
 * Description: It returns the temperature measurement from a
 *              specific humidity & temperature sensor, selectable
 *              from a drop-down.
 *
 * Return type: float
 */

var hts221Temperature = _.merge(_.clone(OutputBloq, true), {

    name: 'hts221Temperature',
    bloqClass: 'bloq-hts221-temperature',
    content: [
        [{
            alias: 'text',
            value: 'bloq-hts221-temperature'
        }, {
            id: 'SENSOR',
            alias: 'dynamicDropdown',
            options: 'hts221'
        }]
    ],
    code: '{SENSOR}.getTemperature()',
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        includes: [
            'Wire.h',
            'BitbloqHTS221.h',
            'HTS221_Registers.h'
        ],
        needInstanceOf: [{
            name: '{SENSOR}',
            type: 'HTS221'
        }],
        setupExtraCode: 'Wire.begin();\n{SENSOR}.begin();',
        code: '{SENSOR}.getTemperature()'
    }

});

utils.preprocessBloq(hts221Temperature);

module.exports = hts221Temperature;