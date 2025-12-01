/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: phoneSendText
 *
 * Bloq type: Statement
 *
 * Description: It sends a message to mobile by bluetooth
 *
 * Return type: none
 */

var phoneSendText = _.merge(_.clone(StatementBloq, true), {

    name: 'phoneSendText',
    bloqClass: 'bloq-phone-write',
    content: [
        [{
            alias: 'text',
            value: 'bloq-phone-write-show'
        }, {
            bloqInputId: 'DATA',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['string', 'number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-phone-screen'
        }, {
            id: 'PHONE',
            alias: 'dynamicDropdown',
            options: 'serialElements'
        }]
    ],
    code: '{PHONE}.println("write-" + {DATA});',

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
        code: '{PHONE}.println(String("write-")+String({DATA}));'
    },
    python: {
        codeLines: [{
            code: 'escribe_texto(server_sock, {DATA})'
        }]
    }

});
utils.preprocessBloq(phoneSendText);

module.exports = phoneSendText;