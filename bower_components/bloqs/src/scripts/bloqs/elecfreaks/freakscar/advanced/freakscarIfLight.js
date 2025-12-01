/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementInputBloq = require('./../../../statementInputBloq');

/**
 * Bloq name: freakscarIfLight
 *
 * Bloq type: Statement-Input
 *
 * Description: It executes the following code only if Evolution detects
 *              black or white, selectable from two drop-downs, in both
 *              light follower sensors.
 *
 * Return type: none
 */

var freakscarIfLight = _.merge(_.clone(StatementInputBloq, true), {

    name: 'freakscarIfLight',
    bloqClass: 'bloq-freakscar-color',
    content: [
        [{
            alias: 'text',
            value: 'if'
        }, {
            id: 'CONDITION1',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-mbot-ifthereisalotoflight-alot',
                value: 'robot.readLDRRight() > 250'
            }, {
                label: 'bloq-mbot-ifthereisalotoflight-low',
                value: 'robot.readLDRRight() <= 250  &&  robot.readLDRRight() > 10'
            }, {
                label: 'bloq-mbot-ifthereisalotoflight-operation-nodetect',
                value: 'robot.readLDRRight() < 10'
            }]
        }, {
            alias: 'text',
            value: 'bloq-freakscar-light-right'
        },{
            id: 'OPERATOR',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-logic-operations-and',
                value: '&&'
            }, {
                label: 'bloq-logic-operations-or',
                value: '||'
            }]
        }, {
            id: 'CONDITION2',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-mbot-ifthereisalotoflight-alot',
                value: 'robot.readLDRLeft() > 250'
            }, {
                label: 'bloq-mbot-ifthereisalotoflight-low',
                value: 'robot.readLDRLeft() <= 250  &&  robot.readLDRLeft() > 10'
            }, {
                label: 'bloq-mbot-ifthereisalotoflight-operation-nodetect',
                value: 'robot.readLDRLeft() < 10'
            }]
        }, {
            alias: 'text',
            value: 'bloq-freakscar-light-left'
        }]
    ],
    code: '',
    arduino: {
        code: 'if({CONDITION1} {OPERATOR} {CONDITION2}){{STATEMENTS}}'
    }
});

freakscarIfLight.connectors[1].acceptedAliases = ['all', 'ifDown'];

utils.preprocessBloq(freakscarIfLight);

module.exports = freakscarIfLight;
