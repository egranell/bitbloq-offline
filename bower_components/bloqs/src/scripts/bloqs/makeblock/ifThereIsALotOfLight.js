/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementInputBloq = require('./../statementInputBloq');

/**
 * Bloq name: mbot-ifthereisalotoflight
 *
 * Bloq type: Statement-Input
 *
 * Description:
 *
 * Return type: none
 */

var bloqMBotIfThereIsALotOfLight = _.merge(_.clone(StatementInputBloq, true), {

    name: 'mBotIfThereIsALotOfLight',
    bloqClass: 'bloq-mbot-ifthereisalotoflight',
    content: [
        [{
            alias: 'text',
            value: 'if'
        }, {
            id: 'OPERATION',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-mbot-ifthereisalotoflight-alot',
                value: '+'
            }, {
                label: 'bloq-mbot-ifthereisalotoflight-low',
                value: '-'
            }, {
                label: 'bloq-mbot-ifthereisalotoflight-operation-nodetect',
                value: '*'
            }]
        }, {
            alias: 'text',
            value: 'with-the'
        }, {
            id: 'LIGHTSENSOR',
            alias: 'dynamicDropdown',
            options: 'mkb_lightsensor'
        }]
    ],
    code: '',
    arduino: {
        conditional: {
            aliasId: 'OPERATION',
            code: {
                '+': 'if(¬{LIGHTSENSOR.readSensor} > 200){{STATEMENTS}}',
                '-': 'if((¬{LIGHTSENSOR.readSensor} > 0) && (¬{LIGHTSENSOR.readSensor} <= 200)){{STATEMENTS}}',
                '*': 'if(¬{LIGHTSENSOR.readSensor} <= 0){{STATEMENTS}}'
            }
        }
    }
});

utils.preprocessBloq(bloqMBotIfThereIsALotOfLight);
bloqMBotIfThereIsALotOfLight.connectors[1].acceptedAliases = ['all', 'ifDown'];


module.exports = bloqMBotIfThereIsALotOfLight;