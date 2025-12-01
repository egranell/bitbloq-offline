/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementInputBloq = require('./../../../statementInputBloq');

/**
 * Bloq name: evolutionIfDistance
 *
 * Bloq type: Statement-Input
 *
 * Description: It executes the following code only if Evolution detects
 *              a specific distance.
 *
 * Return type: none
 */

var freakscarIfDistance = _.merge(_.clone(StatementInputBloq, true), {

    name: 'freakscarIfDistance',
    bloqClass: 'bloq-freakscar-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-evolution-if-distance'
        }, {
            id: 'OPERATOR',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-evolution-if-distance-less',
                value: '<'
            }, {
                label: 'bloq-evolution-if-distance-more',
                value: '>'
            }]
        }, {
            alias: 'text',
            value: 'bloq-evolution-if-distance-than'
        }, {
            id: 'DISTANCE',
            alias: 'numberInput',
            value: 15
        }, {
            id: 'MAGNITUDE',
            alias: 'staticDropdown',
            options: [{
                label: 'cm',
                value: 'cm'
            }, {
                label: 'inches',
                value: 'inches'
            }]
        }]
    ],
    code: '',
    arduino: {
        conditional: {
            aliasId: 'MAGNITUDE',
            code: {
                'cm': 'if(robot.readUSMeasuredDistanceCM() {OPERATOR} {DISTANCE}){{STATEMENTS}}',
                'inches': 'if(robot.readUSMeasuredDistanceIN() {OPERATOR} {DISTANCE}){{STATEMENTS}}'
            }
        }
    }
});

freakscarIfDistance.connectors[1].acceptedAliases = ['all', 'ifDown'];

utils.preprocessBloq(freakscarIfDistance);

module.exports = freakscarIfDistance;
