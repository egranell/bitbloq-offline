/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: mkGyroscope
 *
 * Bloq type: Output
 *
 *
 *
 * Return type: float
 */

var mkGyroscope = _.merge(_.clone(OutputBloq, true), {

    name: 'mkbGyroscope',
    bloqClass: 'bloq-components-color',
    content: [
        [{
            alias: 'text',
            value: 'Leer información del giroscopio en el eje'
        }, {
            id: 'AXIS',
            alias: 'staticDropdown',
            options: [{
                label: 'X',
                value: 'X'
            }, {
                label: 'Y',
                value: 'Y'
            }]
        }]
    ],
    code: '',
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        code: 'robot.getGyro{AXIS}()'
    }
});
utils.preprocessBloq(mkGyroscope);

module.exports = mkGyroscope;