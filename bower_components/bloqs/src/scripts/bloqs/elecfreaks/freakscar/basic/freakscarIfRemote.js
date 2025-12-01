/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementInputBloq = require('./../../../statementInputBloq');

/**
 * Bloq name: freakscarIfRemote
 *
 * Bloq type: Statement-Input
 *
 * Description:
 *
 * Return type: none
 */

var freakscarIfRemote = _.merge(_.clone(StatementInputBloq, true), {

    name: 'freakscarIfRemote',
    bloqClass: 'bloq-freakscar-color',
    content: [
        [{
            alias: 'text',
            value: 'if-button-pressed'
        }, {
            id: 'BUTTON',
            alias: 'staticDropdown',
            options: [{
                    label: 'key-on-off',
                    value: "'P'"
                },
                {
                    label: 'menu',
                    value: "'M'"
                },
                {
                    label: 'OK',
                    value: "'S'"
                },
                {
                    label: '+',
                    value: "'+'"
                },
                {
                    label: '-',
                    value: "'-'"
                },
                {
                    label: 'key-return',
                    value: "'X'"
                }, {
                    label: 'key-arrow-up',
                    value: "'F'"
                }, {
                    label: 'key-arrow-down',
                    value: "'D'"
                }, {
                    label: 'key-arrow-right',
                    value: "'R'"
                }, {
                    label: 'key-arrow-left',
                    value: "'L'"
                },
                {
                    label: '0',
                    value: "'0'"
                }, {
                    label: '1',
                    value: "'1'"
                }, {
                    label: '2',
                    value: "'2'"
                },
                {
                    label: '3',
                    value: "'3'"
                },
                {
                    label: '4',
                    value: "'4'"
                }, {
                    label: '5',
                    value: "'5'"
                }, {
                    label: '6',
                    value: "'6'"
                },
                {
                    label: '7',
                    value: "'7'"
                },
                {
                    label: '8',
                    value: "'8'"
                },
                {
                    label: '9',
                    value: "'9'"
                }
            ]
        }, {
            alias: 'text',
            value: 'in-remote'
        }]
    ],
    code: '',
    arduino: {
        includes: ['BitbloqIRControl.h'],
        code: 'if(robot.getInfraredControlCommand() == {BUTTON}){{STATEMENTS}}'
    }
});

utils.preprocessBloq(freakscarIfRemote);
freakscarIfRemote.connectors[1].acceptedAliases = ['all', 'ifDown'];


module.exports = freakscarIfRemote;
