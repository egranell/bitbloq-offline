/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementInputBloq = require('./../../../statementInputBloq');

/**
 * Bloq name: mbot-remoteButtonPushedCaseDefault
 *
 * Bloq type: Statement-Input
 *
 * Description:
 *
 * Return type: none
 */

var remoteButtonPushedCaseDefault = _.merge(_.clone(StatementInputBloq, true), {

    name: 'remoteButtonPushedCaseDefault',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-makeblock-remote-switch-default'
        }]
    ],
    code: '',
    arduino: {
        code: 'default:{STATEMENTS}break;'
    }
});

utils.preprocessBloq(remoteButtonPushedCaseDefault);
remoteButtonPushedCaseDefault.connectors[0].acceptedAliases = ['switchChildren', 'case'];


module.exports = remoteButtonPushedCaseDefault;