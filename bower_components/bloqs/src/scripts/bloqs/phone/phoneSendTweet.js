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

var phoneSendTweet = _.merge(_.clone(StatementBloq, true), {

    name: 'phoneSendTweet',
    bloqClass: 'bloq-send-tweet',
    content: [
        [{
                alias: 'text',
                value: 'bloq-send-tweet'
            }, {
                bloqInputId: 'TWEET',
                alias: 'bloqInput',
                acceptType: ['all'],
                suggestedBloqs: ['string', 'selectVariable']
            },
            {
                alias: 'text',
                value: 'bloq-from-device'
            }, {
                id: 'PHONE',
                alias: 'dynamicDropdown',
                options: 'serialElements'
            }
        ]
    ],
    code: '{PHONE}.println("twitterSend-" + {TWEET});',

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
        code: '{PHONE}.println(String("twitterSend-")+String({TWEET}));'
    }

});
utils.preprocessBloq(phoneSendTweet);

module.exports = phoneSendTweet;
