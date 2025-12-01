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

var phoneReadLight = _.merge(_.clone(OutputBloq, true), {
    name: 'phoneReadLight',
    bloqClass: 'bloq-phone-read-light',
    content: [
        [{
            alias: 'text',
            value: 'bloq-phone-light'
        }, {
            id: 'PHONE',
            alias: 'dynamicDropdown',
            options: 'serialElements'
        }, {
            alias: 'text',
            value: '(lx)'
        }, ]
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
        extraFunctionCode: 'float getLight(bqSoftwareSerial & phone){phone.println(String("readLight-"));String data="";while(data==""){data=phone.readString();}return data.toFloat();}',
        code: 'getLight({PHONE})'
    },
    returnType: {
        type: 'simple',
        value: 'float'
    },
    python: {
        codeLines: [{
            code: 'leer_luz(server_sock)'
        }]
    }
});

utils.preprocessBloq(phoneReadLight);

module.exports = phoneReadLight;