/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    OutputBloq = require('./../outputBloq');

/**
 * Bloq name: echidnaReadAccelXY
 *
 * Bloq type: Statement-Input
 *
 * Description:
 *
 * Return type: none
 */

var echidnaReadAccelXY = _.merge(_.clone(OutputBloq, true), {

    name: 'echidnaReadAccelXY',
    bloqClass: 'bloq-components-color',
    content: [
        [{
            alias: 'text',
            value: 'read-accelerometer'
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
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        conditional: {
            aliasId: 'AXIS',
            code: {
                'X': 'echidna.readAccX()',
                'Y': 'echidna.readAccY()'
            }
        }
    }
});

utils.preprocessBloq(echidnaReadAccelXY);

module.exports = echidnaReadAccelXY;