/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../../build-utils'),
    StatementBloq = require('./../../../../statementBloq');

/**
 * Bloq name: show time on led matrix
 *
 * Bloq type: Statement
 *
 * Description:
 *
 */

var setDisplayBrightnessAdvanced = _.merge(_.clone(StatementBloq, true), {

    name: 'setDisplayBrightnessAdvanced',
    bloqClass: 'bloq-components-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-makeblock-7segment-setLight'
        }, {
            id: 'DISPLAY',
            alias: 'dynamicDropdown',
            options: 'display7seg'
        }, {
            alias: 'text',
            value: 'to'
        }, {
            bloqInputId: 'BRIGHTNESSLEVEL',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }]
    ],
    code: '',
    arduino: {
        code: '{DISPLAY}.setBrightness({BRIGHTNESSLEVEL});'
    }
});
utils.preprocessBloq(setDisplayBrightnessAdvanced);

module.exports = setDisplayBrightnessAdvanced;
