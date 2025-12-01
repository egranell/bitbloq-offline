/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementInputBloq = require('./../statementInputBloq');

/**
 * Bloq name: class
 *
 * Bloq type: Statement-Input
 *
 * Description: It defines a class which could be later instanced into
 *              an object to use its public variables or functions.
 *
 * Return type: none
 */

var bloqClass = _.merge(_.clone(StatementInputBloq, true), {

    name: 'class',
    bloqClass: 'bloq-class',
    content: [
        [{
            alias: 'text',
            value: 'bloq-class'
        }, {
            id: 'NAME',
            alias: 'varInput',
            placeholder: 'bloq-name-default'
        }]
    ],
    createDynamicContent: 'classes',
    code: 'class {NAME}{{STATEMENTS}};',
    returnType: {
        type: 'simple',
        value: 'class'
    },
    arduino: {
        code: 'class {NAME}{{STATEMENTS}};'
    }
});

utils.preprocessBloq(bloqClass);

module.exports = bloqClass;