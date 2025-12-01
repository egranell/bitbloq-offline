/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: zowiHome
 *
 * Bloq type: statement
 *
 * Description: It makes Zowi rest in the defect position.
 *
 * Return type: none
 */

var zowiHome = _.merge(_.clone(StatementBloq, true), {

    name: 'zowiHome',
    bloqClass: 'bloq-zowi-rest',
    content: [
        [{
            alias: 'text',
            value: 'bloq-zowi-rest-v1'
        }]
    ],
    code: 'zowi.home();',
    arduino: {
        includes: ['BitbloqZowi.h', 'BitbloqUS.h', 'BitbloqBatteryReader.h',
            'BitbloqLedMatrix.h', 'Servo.h', 'BitbloqOscillator.h', 'EEPROM.h'
        ],
        needInstanceOf: [{
            name: 'zowi',
            type: 'Zowi'
        }],
        setupExtraCode: 'zowi.init();',
        code: 'zowi.home();'
    }
});
utils.preprocessBloq(zowiHome);

module.exports = zowiHome;