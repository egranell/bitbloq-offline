/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    OutputBloq = require('./../outputBloq');

/**
 * Bloq name: serialReceive
 *
 * Bloq type: Output
 *
 * Description: It returns what is received by the serial port.
 *
 * Return type: String
 */

var serialReceiveInt = _.merge(_.clone(OutputBloq, true), {

    name: 'serialReceiveInt',
    bloqClass: 'bloq-serial-receive-number',
    content: [
        [{
            id: 'SERIAL',
            alias: 'dynamicDropdown',
            options: 'serialElements'
        }, {
            alias: 'text',
            value: 'bloq-serial-receiver-receive-number'
        }]
    ],
    code: '{SERIAL}.readInt()',
    arduino: {
        includes: ['BitbloqSoftwareSerial.h'],
        setupExtraCode: '{SERIAL}.begin(º[{SERIAL}.baudRate]);',
        needInstanceOf: [{
            name: '{SERIAL}',
            type: 'bqSoftwareSerial',
            arguments: [
                'º[{SERIAL}.pin.rx]',
                'º[{SERIAL}.pin.tx]',
                'º[{SERIAL}.baudRate]'
            ]
        }],
        code: '{SERIAL}.readInt()'
    },
    returnType: {
        type: 'simple',
        value: 'int'
    }
});
utils.preprocessBloq(serialReceiveInt);

module.exports = serialReceiveInt;