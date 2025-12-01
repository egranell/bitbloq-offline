/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: declareVariable
 *
 * Bloq type: Statement
 *
 * Description: It declares a new variable called with the given
 *              name and initializes it with the given value.
 *
 * Return type: none
 */

var declareVariable = _.merge(_.clone(StatementBloq, true), {
    name: 'declareVariable',
    bloqClass: 'bloq-declare-variable',
    content: [
        [{
            alias: 'text',
            value: 'bloq-declare-variable-declare'
        }, {
            id: 'NAME',
            alias: 'varInput',
            placeholder: 'bloq-name-default'
        }, {
            alias: 'text',
            value: '='
        }, {
            bloqInputId: 'VALUE',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'basicOperations', 'string', 'stringSum']
        }]
    ],
    returnType: {
        type: 'fromInput',
        bloqInputId: 'VALUE'
    },
    createDynamicContent: 'softwareVars',
    code: '{VALUE.connectionType} {NAME} = {VALUE};',
    arduino: {
        code: '@{VALUE.returnType} {NAME} = {VALUE};'
    },
    python: {
        codeLines: [{
            code: '{NAME} = {VALUE}'
        }]
    }
});

utils.preprocessBloq(declareVariable);


module.exports = declareVariable;