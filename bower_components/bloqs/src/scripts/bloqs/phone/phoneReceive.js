/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    OutputBloq = require('./../outputBloq');

/**
 * Bloq name: readSensor
 *
 * Bloq type: Output
 *
 * Description: It returns the measurement of a specific
 *              sensor, selectable from a drop-down.
 *
 * Return type: sensor's return type
 */

var phoneReceive = _.merge(_.clone(OutputBloq, true), {
    name: 'phoneReceive',
    bloqClass: 'bloq-phone-receive',
    content: [
        [{
            alias: 'text',
            value: 'bloq-phone-receive'
        }, {
            id: 'PHONE',
            alias: 'dynamicDropdown',
            options: 'serialElements'
        }]
    ],
    code: '{PHONE}.readString()',
    arduino: {
        includes: ['BitbloqSoftwareSerial.h'],
        setupExtraCode: '{PHONE}.begin(º[{PHONE}.baudRate]);',
        needInstanceOf: [{
            name: '{PHONE}',
            type: 'bqSoftwareSerial',
            arguments: [
                'º[{PHONE}.pin.rx]',
                'º[{PHONE}.pin.tx]',
                'º[{PHONE}.baudRate]'
            ]
        }],
        code: '{PHONE}.readString()'
    },
    returnType: {
        type: 'simple',
        value: 'String'
    },
    python: {
        codeLines: [{
            code: 'recibe_texto(server_sock)'
        }]
    }
});

utils.preprocessBloq(phoneReceive);

module.exports = phoneReceive;