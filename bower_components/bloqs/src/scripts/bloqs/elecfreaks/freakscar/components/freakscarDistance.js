/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    OutputBloq = require('./../../../outputBloq');

/**
 * Bloq name: freakscarDistance
 *
 * Bloq type: Output
 *
 * Description: It returns the distance measurement that Evolution sees.
 *
 * Return type: float
 */

var freakscarDistance = _.merge(_.clone(OutputBloq, true), {

    name: 'freakscarDistance',
    bloqClass: 'bloq-components-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-freakscar-distance'
        }, {
            id: 'MAGNITUDE',
            alias: 'staticDropdown',
            options: [{
                label: 'cm',
                value: 'cm'
            }, {
                label: 'inches',
                value: 'inches'
            }]
        }]
    ],
    code: '',

    arduino: {
        conditional: {
            aliasId: 'MAGNITUDE',
            code: {
                'cm': 'robot.readUSMeasuredDistanceCM()',
                'inches': 'robot.readUSMeasuredDistanceIN()'
            }
        }
    },
    returnType: {
        type: 'simple',
        value: 'int'
    }
});
utils.preprocessBloq(freakscarDistance);

module.exports = freakscarDistance;
