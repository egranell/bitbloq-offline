/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementInputBloq = require('./../../../statementInputBloq');

/**
 * Bloq name: freakscarIfLightGlobal
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

    name: 'freakscarIfLightGlobal',
    bloqClass: 'bloq-freakscar-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-freakscar-if-light'
        }, {
            id: 'OPERATOR',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-logic-operations-more',
                value: 'robot.readLDRRight() > robot.readLDRLeft()'
            }, {
                label: 'bloq-logic-operations-less',
                value: 'robot.readLDRRight() < robot.readLDRLeft()'
            }, {
                label: 'bloq-logic-operations-equals',
                value: 'robot.readLDRRight() == robot.readLDRLeft()'
            }]
        }, {
            alias: 'text',
            value: 'bloq-freakscar-if-light-secondly'
        }]
    ],
    code: '',
    arduino: {
        code: 'if({OPERATOR}){{STATEMENTS}}'
    }
});

freakscarIfLight.connectors[1].acceptedAliases = ['all', 'ifDown'];

utils.preprocessBloq(freakscarIfLight);

module.exports = freakscarIfLight;
