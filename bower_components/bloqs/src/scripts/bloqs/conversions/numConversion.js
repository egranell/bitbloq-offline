/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    OutputBloq = require('./../outputBloq');

/**
 * Bloq name: numConversion
 *
 * Bloq type: Output
 *
 * Description: It converts the given int type value to float type.
 *
 * Return type: float
 */

var numConversion = _.merge(_.clone(OutputBloq, true), {

    name: 'numConversion',
    bloqClass: 'bloq-num-conversion',
    content: [
        [{
            alias: 'text',
            value: 'bloq-num-conversion'
        }, {
            bloqInputId: 'NUMBER',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-num-conversion-to'
        }, {
            id: 'TYPE',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-num-conversion-int',
                value: 'int'
            }, {
                label: 'bloq-num-conversion-float',
                value: 'float'
            }]
        }, ]
    ],
    code: '({TYPE}) {NUMBER}',
    arduino: {
        code: '({TYPE}) {NUMBER}'
    },
    returnType: {
        type: 'fromDropdown',
        idDropdown: 'TYPE',
    }
});

utils.preprocessBloq(numConversion);

module.exports = numConversion;