/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementInputBloq = require('./../../statementInputBloq');

/**
 * Bloq name: ifnoise
 *
 * Bloq type: Statement-Input
 *
 * Description:
 *
 * Return type: none
 */

var bloqIfNoise = _.merge(_.clone(StatementInputBloq, true), {
    name: 'makeblockIfMotion',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'if'
        }, {
            id: 'MOTIONSENSOR',
            alias: 'dynamicDropdown',
            options: 'mkb_motionSensor'
        }, {
            id: 'OPERATION',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-makeblock-ifmotion-detect',
                value: '1'
            }, {
                label: 'bloq-makeblock-ifmotion-nodetect',
                value: '0'
            }]
        }]
    ],
    code: '',
    arduino: {
        conditional: {
            aliasId: 'OPERATION',
            code: {
                '1': 'if(¬{MOTIONSENSOR.readSensor}){{STATEMENTS}}',
                '0': 'if(!¬{MOTIONSENSOR.readSensor}){{STATEMENTS}}'
            }
        }
    }
});

utils.preprocessBloq(bloqIfNoise);
bloqIfNoise.connectors[1].acceptedAliases = ['all', 'ifDown'];


module.exports = bloqIfNoise;
