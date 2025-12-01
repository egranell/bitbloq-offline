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

var displayNumber = _.merge(_.clone(StatementBloq, true), {

    name: 'displayNumber',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-display-show'
        }, {
            bloqInputId: 'VALUE',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'in'
        }, {
            id: 'DISPLAY',
            alias: 'dynamicDropdown',
            options: 'display7seg'
        }]
    ],
    code: '',
    arduino: {
        code: '{DISPLAY}.display({VALUE});'
    }
});
utils.preprocessBloq(displayNumber);

module.exports = displayNumber;
