/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: zowiDistance
 *
 * Bloq type: Output
 *
 * Description: It returns the distance measurement that Zowi sees.
 *
 * Return type: float
 */

var zowiDistance = _.merge(_.clone(OutputBloq, true), {

    name: 'zowiDistance',
    bloqClass: 'bloq-zowi-distance',
    content: [
        [{
            alias: 'text',
            value: 'bloq-zowi-distance-v1'
        }]
    ],
    code: 'zowi.getDistance()',
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        includes: ['BitbloqZowi.h', 'BitbloqUS.h', 'BitbloqBatteryReader.h',
            'BitbloqLedMatrix.h', 'Servo.h', 'BitbloqOscillator.h', 'EEPROM.h'
        ],
        needInstanceOf: [{
            name: 'zowi',
            type: 'Zowi'
        }],
        setupExtraCode: 'zowi.init();',
        code: 'zowi.getDistance()'
    }
});
utils.preprocessBloq(zowiDistance);

module.exports = zowiDistance;