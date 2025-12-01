/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: digitalReadAdvanced
 *
 * Bloq type: Output
 *
 * Description: It returns the read of a digital pin.
 *
 * Return type: float
 */

var digitalReadAdvanced = _.merge(_.clone(OutputBloq, true), {

    name: 'digitalReadAdvanced',
    bloqClass: 'bloq-digital-read-advanced',
    content: [
        [{
            alias: 'text',
            value: 'bloq-digital-read-advanced-readpin'
        }, {
            bloqInputId: 'PIN',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }]
    ],
    code: 'digitalRead({PIN})',
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        code: 'digitalRead({PIN})'
    }
});

utils.preprocessBloq(digitalReadAdvanced);

module.exports = digitalReadAdvanced;