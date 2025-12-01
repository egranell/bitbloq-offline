'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: pin level
 *
 * Bloq type: Output
 *
 * Description: It returns the selected pin level constant (HIGH or LOW).
 *
 * Return type: float
 */

var pinLevels = _.merge(_.clone(OutputBloq, true), {

    name: 'pinLevels',
    bloqClass: 'bloq-pinlevels',
    content: [
        [{
            id: 'STATE',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-pinlevel-high',
                value: 'HIGH'
            }, {
                label: 'bloq-pinlevel-low',
                value: 'LOW'
            }]
        }]
    ],
    code: '{STATE}',
    returnType: {
        type: 'simple',
        value: 'bool'
    },
    arduino: {
        code: '{STATE}'
    }
});

utils.preprocessBloq(pinLevels);

module.exports = pinLevels;