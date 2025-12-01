/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementInputBloq = require('./../../statementInputBloq');

/**
 * Bloq name: returnFunctionWithArguments
 *
 * Bloq type: Statement-Input
 *
 * Description: It defines a function with the given arguments that could be later
 *              used and which does return a value.
 *
 * Return type: none
 */

var returnFunctionWithArguments = _.merge(_.clone(StatementInputBloq, true), {

    name: 'returnFunctionWithArguments',
    bloqClass: 'bloq-return-function-with-arguments',
    content: [
        [{
            alias: 'text',
            value: 'bloq-return-function-with-arguments-declare'
        }, {
            id: 'FUNCNAME',
            alias: 'varInput',
            placeholder: 'bloq-functions-default'
        }, {
            alias: 'text',
            value: 'bloq-return-function-with-arguments-count'
        }, {
            bloqInputId: 'ARGS',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['argument', 'arguments', 'number', 'string', 'selectVariable']
        }, {
            position: 'DOWN',
            alias: 'text',
            value: 'bloq-return-function-with-arguments-return'
        }, {
            position: 'DOWN',
            bloqInputId: 'RETURN',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['selectVariable', 'logicOperations', 'equalityOperations']
        }]
    ],
    createDynamicContent: 'returnFunctions',
    returnType: {
        type: 'fromInput',
        bloqInputId: 'RETURN'
    },
    code: '{RETURN.connectionType} {FUNCNAME} ({ARGS}) {{STATEMENTS}return {RETURN};}',
    arduino: {
        code: '@{RETURN.returnType} {FUNCNAME} ({ARGS}) {{STATEMENTS}return {RETURN};}'
    }
});

utils.preprocessBloq(returnFunctionWithArguments);

module.exports = returnFunctionWithArguments;