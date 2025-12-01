/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementInputBloq = require('./../statementInputBloq');

/**
 * Bloq name: returnFunction
 *
 * Bloq type: Statement-Input
 *
 * Description: It defines a function that could be later used and
 *              which does return a value.
 *
 * Return type: none
 */

var returnFunction = _.merge(_.clone(StatementInputBloq, true), {

    name: 'returnFunction',
    bloqClass: 'bloq-return-function',
    content: [
        [{
            alias: 'text',
            value: 'bloq-return-function-declare'
        }, {
            id: 'FUNCNAME',
            alias: 'varInput',
            placeholder: 'bloq-functions-default'
        }, {
            position: 'DOWN',
            alias: 'text',
            value: 'bloq-return-function-return'
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
    code: '{RETURN.connectionType} {FUNCNAME} () {{STATEMENTS}return {RETURN};}',
    python: {
        codeLines: [{
            code: 'def {FUNCNAME}():'
        }, {
            indentation: 1,
            code: '{STATEMENTS}'
        }, {
            indentation: 1,
            code: 'return {RETURN}'
        }]
    },
    arduino: {
        code: '@{RETURN.returnType} {FUNCNAME} () {{STATEMENTS}return {RETURN};}'
    }
});

utils.preprocessBloq(returnFunction);

module.exports = returnFunction;