/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    OutputBloq = require('./../outputBloq');

/**
 * Bloq name: stringSum
 *
 * Bloq type: Output
 *
 * Description: It returns a single string formed by two given inputs.
 *
 * Return type: string
 */

var stringSum = _.merge(_.clone(OutputBloq, true), {

    name: 'stringSum',
    bloqClass: 'bloq-string-sum',
    content: [
        [{
            bloqInputId: 'ARG1',
            alias: 'bloqInput',
            acceptType: ['String'],
            suggestedBloqs: ['string', 'selectVariable']
        }, {
            alias: 'text',
            value: '+'
        }, {
            bloqInputId: 'ARG2',
            alias: 'bloqInput',
            acceptType: ['String'],
            suggestedBloqs: ['string', 'selectVariable']
        }]
    ],
    code: 'String({ARG1})+String({ARG2})',
    returnType: {
        type: 'simple',
        value: 'String'
    },
    arduino: {
        code: 'String({ARG1})+String({ARG2})'
    }
});

utils.preprocessBloq(stringSum);


module.exports = stringSum;