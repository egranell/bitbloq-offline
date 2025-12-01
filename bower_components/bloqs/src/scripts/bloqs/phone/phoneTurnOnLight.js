/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: phoneToggleLight
 *
 * Bloq type: Statement
 *
 * Description: It sends a message to mobile by bluetooth
 *
 * Return type: none
 */

var phoneTurnOnLight = _.merge(_.clone(StatementBloq, true), {

    name: 'phoneTurnOnLight',
    bloqClass: 'bloq-phone-turnon-light',
    content: [
        [{
            alias: 'text',
            value: 'bloq-phone-turnon-light'
        }, {
            id: 'PHONE',
            alias: 'dynamicDropdown',
            options: 'serialElements'
        }]
    ],
    code: '{PHONE}.println("turnonFlashlight-");  delay(500);',

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
        code: '{PHONE}.println(String("turnonFlashlight-"));  delay(500);'
    },
    python: {
        codeLines: [{
            code: 'enciende_linterna(server_sock)'
        }]
    }

});
utils.preprocessBloq(phoneTurnOnLight);

module.exports = phoneTurnOnLight;