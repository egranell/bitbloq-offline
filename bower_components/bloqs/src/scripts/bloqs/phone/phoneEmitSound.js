/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: phoneEmitSound
 *
 * Bloq type: statement
 *
 * Description: It makes mobile emit a sound.
 *
 * Return type: none
 */

var phoneEmitSound = _.merge(_.clone(StatementBloq, true), {

    name: 'phoneEmitSound',
    bloqClass: 'bloq-phone-sound',
    content: [
        [{
            alias: 'text',
            value: 'bloq-phone-sounds'
        }, {
            id: 'SOUND',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-phone-sounds-bass-v1',
                value: '"bass"'
            }, {
                label: 'bloq-phone-sounds-bongo-v1',
                value: '"bongo"'
            }, {
                label: 'bloq-phone-sounds-highhat-v1',
                value: '"highhat"'
            }, {
                label: 'bloq-phone-sounds-snare-v1',
                value: '"snare"'
            }, {
                label: 'bloq-phone-sounds-meow-v1',
                value: '"meow"'
            }, {
                label: 'bloq-phone-sounds-joke-v1',
                value: '"joke"'
            }]
        }, {
            alias: 'text',
            value: 'bloq-phone-sounds-device'
        }, {
            id: 'PHONE',
            alias: 'dynamicDropdown',
            options: 'serialElements'
        }]
    ],
    code: '{PHONE}.println("playSound-" + {SOUND});delay(1000);',

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
        code: '{PHONE}.println(String("playSound-")+String({SOUND}));delay(1000);'
    },
    python: {
        codeLines: [{
            code: 'emitir_sonido(server_sock, {SOUND})'
        }]
    }
});
utils.preprocessBloq(phoneEmitSound);

module.exports = phoneEmitSound;