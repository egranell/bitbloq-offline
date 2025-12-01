/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: buzzerAdvanced
 *
 * Bloq type: Statement
 *
 * Description: It turns on a specific buzzer with a given note
 *              during a determined period of time.
 *
 * Return type: none
 */

var buzzerAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'buzzerAdvanced-v2',
    bloqClass: 'bloq-buzzer-advance',
    content: [
        [{
            alias: 'text',
            value: 'bloq-buzzer-advance-sound'
        }, {
            id: 'BUZZER',
            alias: 'dynamicDropdown',
            options: 'buzzers'
        }, {
            alias: 'text',
            value: 'bloq-buzzer-advance-note'
        }, {
            bloqInputId: 'NOTE',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-buzzer-advance-for'
        }, {
            bloqInputId: 'SECONDS',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-buzzer-advance-ms'
        }]
    ],
    code: 'tone({BUZZER},{NOTE},{SECONDS});\ndelay({SECONDS});',
    arduino: {
        code: 'tone({BUZZER},{NOTE},{SECONDS});\ndelay({SECONDS});'
    }
});
utils.preprocessBloq(buzzerAdvanced);

module.exports = buzzerAdvanced;