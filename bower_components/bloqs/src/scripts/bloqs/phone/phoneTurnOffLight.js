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

var phoneTurnOffLight = _.merge(_.clone(StatementBloq, true), {

    name: 'phoneTurnOffLight',
    bloqClass: 'bloq-phone-turnoff-light',
    content: [
        [{
            alias: 'text',
            value: 'bloq-phone-turnoff-light'
        }, {
            id: 'PHONE',
            alias: 'dynamicDropdown',
            options: 'serialElements'
        }]
    ],
    code: '{PHONE}.println("turnoffFlashlight-"); delay(500);',

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
        code: '{PHONE}.println(String("turnoffFlashlight-")); delay(500);'
    },
    python: {
        codeLines: [{
            code: 'apaga_linterna(server_sock)'
        }]
    }

});
utils.preprocessBloq(phoneTurnOffLight);

module.exports = phoneTurnOffLight;