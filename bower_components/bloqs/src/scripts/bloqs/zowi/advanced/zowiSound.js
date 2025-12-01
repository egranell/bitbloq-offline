/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: zowiSound
 *
 * Bloq type: Output
 *
 * Description: It returns the noise that Zowi hears.
 *
 * Return type: float
 */

var zowiSound = _.merge(_.clone(OutputBloq, true), {

    name: 'zowiSound',
    bloqClass: 'bloq-zowi-sound',
    content: [
        [{
            alias: 'text',
            value: 'bloq-zowi-sound-v1'
        }]
    ],
    code: 'zowi.getNoise()',
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
        code: 'zowi.getNoise()'
    }
});
utils.preprocessBloq(zowiSound);

module.exports = zowiSound;