/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementInputBloq = require('./../statementInputBloq');

/**
 * Bloq name: zowiIfSound
 *
 * Bloq type: Statement-Input
 *
 * Description: It executes the following code only if Zowi heards a sound.
 *
 * Return type: none
 */

var zowiIfSound = _.merge(_.clone(StatementInputBloq, true), {

    name: 'zowiIfSound',
    bloqClass: 'bloq-zowi-if-sound',
    content: [
        [{
            alias: 'text',
            value: 'bloq-zowi-if-sound-v1'
        }, ]
    ],
    code: ' if(zowi.getNoise() >= 650){{STATEMENTS}}',
    arduino: {
        includes: ['BitbloqZowi.h', 'BitbloqUS.h', 'BitbloqBatteryReader.h',
            'BitbloqLedMatrix.h', 'Servo.h', 'BitbloqOscillator.h', 'EEPROM.h'
        ],
        needInstanceOf: [{
            name: 'zowi',
            type: 'Zowi'
        }],
        setupExtraCode: 'zowi.init();',
        code: ' if(zowi.getNoise() >= 650){{STATEMENTS}}'
    }
});

zowiIfSound.connectors[1].acceptedAliases = ['all', 'ifDown'];

utils.preprocessBloq(zowiIfSound);

module.exports = zowiIfSound;