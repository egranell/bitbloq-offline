/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: freakscarBuzzer
 *
 * Bloq type: Statement
 *
 * Description: It turns on the buzzer of FreaksCar with a basic note,
 *              selectable from a drop-down, during a given period of time.
 *
 * Return type: none
 */

var freakscarBuzzer = _.merge(_.clone(StatementBloq, true), {

    name: 'freakscarBuzzer',
    bloqClass: 'bloq-components-color',
    content: [
        [{
                alias: 'text',
                value: 'bloq-evolution-buzzer'
            }, {
                id: 'NOTE',
                alias: 'staticDropdown',
                options: [{
                    label: 'bloq-buzzer-do',
                    value: '261'
                }, {
                    label: 'bloq-buzzer-re',
                    value: '293'
                }, {
                    label: 'bloq-buzzer-mi',
                    value: '329'
                }, {
                    label: 'bloq-buzzer-fa',
                    value: '349'
                }, {
                    label: 'bloq-buzzer-sol',
                    value: '392'
                }, {
                    label: 'bloq-buzzer-la',
                    value: '440'
                }, {
                    label: 'bloq-buzzer-si',
                    value: '494'
                }, {
                    label: 'bloq-buzzer-do-#',
                    value: '277'
                }, {
                    label: 'bloq-buzzer-re-#',
                    value: '311'
                }, {
                    label: 'bloq-buzzer-fa-#',
                    value: '370'
                }, {
                    label: 'bloq-buzzer-sol-#',
                    value: '415'
                }, {
                    label: 'bloq-buzzer-la-#',
                    value: '466'
                }]
            },
            {
                alias: 'text',
                value: 'bloq-evolution-buzzer-for'
            },
            {
                id: 'SECONDS',
                alias: 'numberInput',
                value: 1000
            },
            {
                alias: 'text',
                value: 'bloq-evolution-buzzer-ms'
            }
        ]
    ],
    code: 'robot.playTone({NOTE},{SECONDS});',
    arduino: {
        code: 'robot.playTone({NOTE},{SECONDS});'
    }
});
utils.preprocessBloq(freakscarBuzzer);

module.exports = freakscarBuzzer;
