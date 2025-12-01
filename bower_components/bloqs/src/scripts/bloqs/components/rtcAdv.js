/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    OutputBloq = require('./../outputBloq');

/**
 * Bloq name: clockRTCAdvanced
 *
 * Bloq type: Output
 *
 * Description: It returns a determined data of the date or the time,
 *              selectable from a first drop-down, of a specific RTC,
 *              selectable from a second drop-down.
 *
 * Return type: int
 */

var clockRTCAdvanced = _.merge(_.clone(OutputBloq, true), {
    name: 'clockRTCAdvanced',
    bloqClass: 'bloq-rtc-advanced',
    content: [
        [{
            alias: 'text',
            value: 'bloq-rtc-advanced'
        }, {
            id: 'FUNCTION',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-rtc-date-2',
                value: 'getDate',
                type: 'String'
            }, {
                label: 'bloq-rtc-time-2',
                value: 'getTime',
                type: 'String'
            }, {
                label: 'bloq-rtc-hour',
                value: 'getHour',
                type: 'float'
            }, {
                label: 'bloq-rtc-minute',
                value: 'getMinute',
                type: 'float'
            }, {
                label: 'bloq-rtc-second',
                value: 'getSecond',
                type: 'float'
            }, {
                label: 'bloq-rtc-day',
                value: 'getDay',
                type: 'float'
            }, {
                label: 'bloq-rtc-month',
                value: 'getMonth',
                type: 'float'
            }, {
                label: 'bloq-rtc-year',
                value: 'getYear',
                type: 'float'
            }]
        }, {
            alias: 'text',
            value: 'bloq-rtc-using-advanced'
        }, {
            id: 'RTC',
            alias: 'dynamicDropdown',
            options: 'clocks'
        }]
    ],
    code: '{RTC}.{FUNCTION}()',
    returnType: {
        type: 'fromStaticDropdownProperty',
        idDropdown: 'FUNCTION',
        dropdownProperty: 'type'
    },
    arduino: {
        code: '{RTC}.{FUNCTION}()'
    }
});

utils.preprocessBloq(clockRTCAdvanced);

module.exports = clockRTCAdvanced;