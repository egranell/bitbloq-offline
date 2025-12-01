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
    name: 'makeblockIfNoise',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'if'
        }, {
            id: 'OPERATION',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-makeblock-ifnoise-alot',
                value: '+'
            }, {
                label: 'bloq-makeblock-ifnoise-low',
                value: '-'
            }, {
                label: 'bloq-makeblock-ifnoise-nodetect',
                value: '*'
            }]
        }, {
            alias: 'text',
            value: 'with-the'
        }, {
            id: 'SOUNDSENSOR',
            alias: 'dynamicDropdown',
            options: 'mkb_soundsensor'
        }]
    ],
    code: '',
    arduino: {
        conditional: {
            aliasId: 'OPERATION',
            code: {
                '+': 'if(¬{SOUNDSENSOR.readSensor} > 360){{STATEMENTS}}',
                '-': 'if((¬{SOUNDSENSOR.readSensor} > 115) && (¬{SOUNDSENSOR.readSensor} <= 360)){{STATEMENTS}}',
                '*': 'if(¬{SOUNDSENSOR.readSensor} <= 115){{STATEMENTS}}'
            }
        }
    }
});

utils.preprocessBloq(bloqIfNoise);
bloqIfNoise.connectors[1].acceptedAliases = ['all', 'ifDown'];


module.exports = bloqIfNoise;
