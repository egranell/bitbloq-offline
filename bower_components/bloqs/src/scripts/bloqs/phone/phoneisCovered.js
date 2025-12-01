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

var phoneisCovered = _.merge(_.clone(OutputBloq, true), {
    name: 'phoneisCovered',
    bloqClass: 'bloq-phone-isCovered',
    content: [
        [{
            alias: 'text',
            value: 'bloq-the'
        }, {
            id: 'PHONE',
            alias: 'dynamicDropdown',
            options: 'serialElements'
        }, {
            alias: 'text',
            value: 'bloq-phone-is'
        }, {
            id: 'COVERED',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-phone-covered',
                value: '"covered"'
            }, {
                label: 'bloq-phone-not-covered',
                value: '"ncovered"'
            }]
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
        extraFunctionCode: 'boolean getProx(String cv,bqSoftwareSerial & phone){phone.println(String("readProx-")+String(cv));String data="";boolean result=false;while(data==""){data=phone.readString();}if(data.indexOf("true")>=0){result=true;}else{result=false;}return result;}',
        code: 'getProx({COVERED}, {PHONE})'
    },
    returnType: {
        type: 'simple',
        value: 'boolean'
    },
    python: {
        codeLines: [{
            code: 'recibir_estacubierto(server_sock, {COVERED})'
        }]
    }
});

utils.preprocessBloq(phoneisCovered);

module.exports = phoneisCovered;