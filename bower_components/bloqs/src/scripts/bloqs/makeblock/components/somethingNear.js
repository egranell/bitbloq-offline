/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementInputBloq = require('./../../statementInputBloq');

/**
 * Bloq name: mbot-SomethingNear
 *
 * Bloq type: Statement-Input
 *
 * Description:
 *
 * Return type: none
 */

var bloqMBotSomethingNear = _.merge(_.clone(StatementInputBloq, true), {

    name: 'mBotSomethingNear',
    bloqClass: 'bloq-mbot-somethingnear',
    content: [
        [{
            alias: 'text',
            value: 'if'
        }, {
            id: 'OPERATION',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-mbot-somethingnear-operation-near',
                value: '{ULTRASOUND}.readDistanceInCM() < 8'
            }, {
                label: 'bloq-mbot-somethingnear-operation-faraway',
                value: '({ULTRASOUND}.readDistanceInCM() >= 8) && ({ULTRASOUND}.readDistanceInCM() < 513)'
            }, {
                label: 'bloq-mbot-somethingnear-operation-nodetect',
                value: '{ULTRASOUND}.readDistanceInCM() >= 513'
            }]
        }, {
            alias: 'text',
            value: 'with-the'
        }, {
            id: 'ULTRASOUND',
            alias: 'dynamicDropdown',
            options: 'mkb_ultrasound'
        }]
    ],
    code: '',
    arduino: {
        code: 'if({OPERATION}){{STATEMENTS}}'
    }
});

utils.preprocessBloq(bloqMBotSomethingNear);
bloqMBotSomethingNear.connectors[1].acceptedAliases = ['all', 'ifDown'];


module.exports = bloqMBotSomethingNear;