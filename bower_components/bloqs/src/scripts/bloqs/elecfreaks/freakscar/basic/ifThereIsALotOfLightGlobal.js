/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementInputBloq = require('./../../../statementInputBloq');

/**
 * Bloq name: freakscarIfThereIsALotOfLightGlobal
 *
 * Bloq type: Statement-Input
 *
 * Description:
 *
 * Return type: none
 */

var freakscarIfThereIsALotOfLightGlobal = _.merge(_.clone(StatementInputBloq, true), {

    name: 'freakscarIfThereIsALotOfLightGlobal',
    bloqClass: 'bloq-freakscar-color',
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
        }]
    ],
    code: '',
    arduino: {
        conditional: {
            aliasId: 'OPERATION',
            code: {
                '+': 'if(((robot.readLDRRight() + robot.readLDRLeft())/2) > 250){{STATEMENTS}}',
                '-': 'if(((robot.readLDRRight() + robot.readLDRLeft())/2) > 10 && ((robot.readLDRRight() + robot.readLDRLeft())/2) <= 250){{STATEMENTS}}',
                '*': 'if(((robot.readLDRRight() + robot.readLDRLeft())/2) <= 10){{STATEMENTS}}'
            }
        }
    }
});

utils.preprocessBloq(freakscarIfThereIsALotOfLightGlobal);
freakscarIfThereIsALotOfLightGlobal.connectors[1].acceptedAliases = ['all', 'ifDown'];


module.exports = freakscarIfThereIsALotOfLightGlobal;