//---IN PROGGRESS---//

/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    OutputBloq = require('./../outputBloq');

/**
 * Bloq name: PTSensor
 *
 * Bloq type: Output
 *
 * Description: It returns an specific measurement,
 *              selectable from a first drop-down,
 *              of a specific preassure sensor,
 *              selectable from a second drop-down.
 *
 * Return type: float
 */


var PTSensor = _.merge(_.clone(OutputBloq, true), {
    name: 'PTSensor',
    bloqClass: 'bloq-PTsensor',
    content: [
        [{
            alias: 'text',
            value: 'bloq-PTsensor'
        }, {
            id: 'FUNCTION',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-PTsensor-pressure',
                value: 'getPressure()'
            }, {
                label: 'bloq-PTsensor-temperature',
                value: 'getTemperature()'
            }, {
                label: 'bloq-PTsensor-altitude',
                value: 'getAltitude()'
            }]
        }, {
            alias: 'text',
            value: 'bloq-PTsensor-sensor'
        }, {
            id: 'PTSENS',
            alias: 'dynamicDropdown',
            options: 'barometer'
        }]
    ],
    code: '{PTSENS}.{FUNCTION}',
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        code: '{PTSENS}.{FUNCTION}'
    }
});

utils.preprocessBloq(PTSensor);

module.exports = PTSensor;