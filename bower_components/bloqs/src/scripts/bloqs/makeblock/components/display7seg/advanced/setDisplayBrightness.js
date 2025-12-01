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

var setDisplayBrightness = _.merge(_.clone(StatementBloq, true), {

    name: 'setDisplayBrightness',
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
            id: 'BRIGHTNESSLEVEL',
            alias: 'staticDropdown',
            options: [{
                label: '0',
                value: 0
            }, {
                label: '1',
                value: 1
            }, {
                label: '2',
                value: 2
            }, {
                label: '3',
                value: 3
            }, {
                label: '4',
                value: 4
            }, {
                label: '5',
                value: 5
            }, {
                label: '6',
                value: 6
            }, {
                label: '7',
                value: 7
            }]
        }]
    ],
    code: '',
    arduino: {
        code: '{DISPLAY}.setBrightness({BRIGHTNESSLEVEL});'
    }
});
utils.preprocessBloq(setDisplayBrightness);

module.exports = setDisplayBrightness;
