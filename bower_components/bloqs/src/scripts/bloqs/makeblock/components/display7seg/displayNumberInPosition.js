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

var displayNumberInPosition = _.merge(_.clone(StatementBloq, true), {

    name: 'displayNumberInPosition',
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
                value: 'in-position'
            }, {
                id: 'POSITION',
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
                    },
                    {
                        label: '3',
                        value: 3
                    }
                ]
            },
            {
                alias: 'text',
                value: 'in'
            }, {
                id: 'DISPLAY',
                alias: 'dynamicDropdown',
                options: 'display7seg'
            }
        ]
    ],
    code: '',
    arduino: {
        code: '{DISPLAY}.display((uint8_t){POSITION},{VALUE});'
    }
});
utils.preprocessBloq(displayNumberInPosition);

module.exports = displayNumberInPosition;
