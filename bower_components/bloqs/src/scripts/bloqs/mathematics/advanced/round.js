/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: round
 *
 * Bloq type: Output
 *
 * Description: It returns the given value rounded to floor,
 *              or closest value.
 *
 * Return type: float
 */

var map = _.merge(_.clone(OutputBloq, true), {

    name: 'round-v1',
    bloqClass: 'bloq-round',
    content: [
        [{
            alias: 'text',
            value: 'bloq-round-advanced-roundto'
        }, {
            id: 'OPERATOR',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-round-advanced-floor',
                value: 'floor'
            }, {
                label: 'bloq-round-advanced-ceil',
                value: 'ceil'
            }, {
                label: 'bloq-round-advanced-round',
                value: 'round'
            }]
        }, {
            alias: 'text',
            value: 'bloq-round-advanced-thenumber'
        }, {
            bloqInputId: 'VAR',
            alias: 'bloqInput',
            acceptType: ['float'],
            suggestedBloqs: ['number', 'selectVariable']
        }]
    ],
    code: '{OPERATOR}({VAR})',
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        code: '{OPERATOR}({VAR})'
    }
});

utils.preprocessBloq(map);

module.exports = map;