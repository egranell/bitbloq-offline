/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementInputBloq = require('./../../statementInputBloq');

/**
 * Bloq name: mbot-ifthereisalotoflight
 *
 * Bloq type: Statement-Input
 *
 * Description:
 *
 * Return type: none
 */

var ifButtonPushed = _.merge(_.clone(StatementInputBloq, true), {

    name: 'ifButtonPushed',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'if-button-pressed'
        }, {
            id: 'BUTTON',
            alias: 'staticDropdown',
            options: [{
                    label: '1',
                    value: 1
                }, {
                    label: '2',
                    value: 2
                }, {
                    label: '3',
                    value: 3
                },
                {
                    label: '4',
                    value: 4
                }
            ]
        }, {
            alias: 'text',
            value: 'in-the'
        }, {
            id: 'BUTTONPAD',
            alias: 'dynamicDropdown',
            options: 'mkb_4buttonKeyPad'
        }]
    ],
    code: '',
    arduino: {
        code: 'if(¬{BUTTONPAD.readSensor} == {BUTTON}){{STATEMENTS}}'
    }
});

utils.preprocessBloq(ifButtonPushed);
ifButtonPushed.connectors[1].acceptedAliases = ['all', 'ifDown'];


module.exports = ifButtonPushed;
