/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: setArrayVariable
 *
 * Bloq type: Statement
 *
 * Description: It assigns the given value to the element in the given
 *              position of a specific array variable, selectable from
 *              a drop-down.
 *
 * Return type: none
 */

var setArrayVariable = _.merge(_.clone(StatementBloq, true), {

    name: 'setArrayVariable',
    bloqClass: 'bloq-set-variableArray',
    content: [
        [{
            alias: 'text',
            value: 'bloq-set-variableArray-variable'
        }, {
            id: 'NAME',
            alias: 'dynamicDropdown',
            options: 'softwareVars'
        }, {
            alias: 'text',
            value: '['
        }, {
            id: 'ITERATOR',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: ']'
        }, {
            alias: 'text',
            value: '='
        }, {
            bloqInputId: 'VALUE',
            alias: 'bloqInput',
            acceptType: {
                type: 'fromDynamicDropdown',
                idDropdown: 'NAME',
                pointer: 'true',
                options: 'softwareVars'
            },
            suggestedBloqs: ['number', 'string', 'selectVariable']
        }]
    ],
    code: '{NAME}[{ITERATOR}] = {VALUE};',
    arduino: {
        code: '{NAME}[{ITERATOR}] = {VALUE};'
    }
});

utils.preprocessBloq(setArrayVariable);

module.exports = setArrayVariable;