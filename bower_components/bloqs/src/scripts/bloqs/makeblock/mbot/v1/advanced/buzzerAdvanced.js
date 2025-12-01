/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../../build-utils'),
    StatementBloq = require('./../../../../statementBloq');

/**
 * Bloq name: mBotBuzzerAdvanced
 *
 * Bloq type: Statement
 *
 * Description: It turns on a specific buzzer, selectable
 *              from a first drop-down, with a basic note,
 *              selectable from a second drop-down, during
 *              a given period of time.
 *
 * Return type: none
 */

var mBotBuzzerAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotBuzzerAdvanced',
    bloqClass: 'bloq-mbot-buzzer',
    content: [
        [{
            alias: 'text',
            value: 'bloq-mbot-buzzer-advanced-play'
        }, {
            bloqInputId: 'NOTE',
            alias: 'bloqInput',
            acceptType: ['float'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-mbot-buzzer-advanced-for'
        }, {
            bloqInputId: 'SECONDS',
            alias: 'bloqInput',
            acceptType: ['float'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-mbot-buzzer-advanced-ms'
        }]
    ],
    code: '',
    arduino: {
        needInstanceOf: [{
            name: 'mBotBuzzerPin',
            type: 'const int',
            equals: '8'
        }],
        code: 'tone(mBotBuzzerPin,{NOTE},{SECONDS});\ndelay({SECONDS});'
    }
});
utils.preprocessBloq(mBotBuzzerAdvanced);

module.exports = mBotBuzzerAdvanced;