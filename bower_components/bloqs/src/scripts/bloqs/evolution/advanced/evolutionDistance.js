/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: evolutionDistance
 *
 * Bloq type: Output
 *
 * Description: It returns the distance measurement that Evolution sees.
 *
 * Return type: float
 */

var evolutionDistance = _.merge(_.clone(OutputBloq, true), {

    name: 'evolutionDistance',
    bloqClass: 'bloq-evolution-distance',
    content: [
        [{
            alias: 'text',
            value: 'bloq-evolution-distance'
        }]
    ],
    code: 'evolution.getDistance()',
    arduino: {
        includes: ['BitbloqEvolution.h', 'BitbloqUS.h', 'Servo.h', 'BitbloqOscillator.h'],
        needInstanceOf: [{
            name: 'evolution',
            type: 'Evolution'
        }],
        setupExtraCode: 'evolution.init();',
        code: 'evolution.getDistance()'
    },
    returnType: {
        type: 'simple',
        value: 'float'
    }
});
utils.preprocessBloq(evolutionDistance);

module.exports = evolutionDistance;