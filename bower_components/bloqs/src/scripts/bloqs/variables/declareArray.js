/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: declareArray
 *
 * Bloq type: Statement
 *
 * Description: It declares a new variable called with the given
 *              name and initializes it with the given value.
 *
 * Return type: none
 */

var declareArray = _.merge(_.clone(StatementBloq, true), {
    name: 'declareArray',
    bloqClass: 'bloq-declare-array',
    content: [
        [{
            alias: 'text',
            value: 'bloq-declare-array-declare'
        }, {
            id: 'NAME',
            alias: 'varInput',
            placeholder: 'bloq-name-default'
        }, {
            alias: 'text',
            value: 'bloq-declare-array-declare-type'
        }, {
            id: 'TYPE',
            alias: 'staticDropdown',
            options: [{
                    label: 'bloq-declare-variable-declare-type-int',
                    value: 'int'
                }, {
                    label: 'bloq-declare-variable-declare-type-float',
                    value: 'float'
                }, {
                    label: 'bloq-declare-variable-declare-type-text',
                    value: 'String'
                }, {
                    label: 'bloq-declare-variable-declare-type-char',
                    value: 'char'
                }, {
                    label: 'bloq-declare-variable-declare-type-bool',
                    value: 'bool'
                }] //'+', '-', '×', '÷', '^']
        }, {
            alias: 'text',
            value: 'bloq-declare-array-declare-size'
        }, {
            id: 'VALUE',
            alias: 'numberInput',
            value: 3
        }]
    ],
    createDynamicContent: 'softwareVars',
    returnType: {
        type: 'fromDropdown',
        idDropdown: 'TYPE'
    },
    code: '{TYPE} {NAME} [{VALUE}];',
    arduino: {
        code: '{TYPE} {NAME} [{VALUE}];'
    }
});

utils.preprocessBloq(declareArray);

module.exports = declareArray;