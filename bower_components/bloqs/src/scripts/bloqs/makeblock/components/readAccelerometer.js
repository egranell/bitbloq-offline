/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: mkbAccelerometer
 *
 * Bloq type: Output
 *
 *
 *
 * Return type: float
 */

var mkbAccelerometer = _.merge(_.clone(OutputBloq, true), {

    name: 'mkbAccelerometer',
    bloqClass: 'bloq-components-color',
    content: [
        [{
            alias: 'text',
            value: 'Obtener ángulo del acelerómetro en el eje'
        }, {
            id: 'AXIS',
            alias: 'staticDropdown',
            options: [{
                label: 'X',
                value: 'X'
            }, {
                label: 'Y',
                value: 'Y'
            }, {
                label: 'Z',
                value: 'Z'
            }]
        }]
    ],
    code: '',
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        code: 'robot.getAngle{AXIS}()'
    }
});
utils.preprocessBloq(mkbAccelerometer);

module.exports = mkbAccelerometer;