/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: buzzer
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

var mBotBuzzerAdvancedV2 = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotBuzzerAdvanced-v2',
    bloqClass: 'bloq-mbot-buzzer-v2',
    content: [
        [{
            alias: 'text',
            value: 'bloq-buzzer-sound'
        }, {
            alias: 'text',
            value: 'bloq-buzzer-note'
        }, {
            bloqInputId: 'NOTE',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-buzzer-for'
        }, {
            bloqInputId: 'SECONDS',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-buzzer-ms'
        }]
    ],
    code: '',
    arduino: {
        code: 'robot.playTone({NOTE},{SECONDS});\ndelay({SECONDS});'
    }
});
utils.preprocessBloq(mBotBuzzerAdvancedV2);

module.exports = mBotBuzzerAdvancedV2;