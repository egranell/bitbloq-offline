/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    OutputBloq = require('./../outputBloq');

/**
 * Bloq name: parenthesis
 *
 * Bloq type: Output
 *
 * Description: It returns the result of the math operation between two given numbers.
 *
 * Return type: float
 */

var parenthesis = _.merge(_.clone(OutputBloq, true), {

    name: 'parenthesis',
    bloqClass: 'bloq-parenthesis',
    content: [
        [{
            alias: 'text',
            value: '('
        }, {
            bloqInputId: 'OPERATION',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['basicOperations']
        }, {
            alias: 'text',
            value: ')'
        }]
    ],
    code: '',
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        code: '({OPERATION})'
    }
});

utils.preprocessBloq(parenthesis);


module.exports = parenthesis;