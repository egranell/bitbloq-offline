/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    OutputBloq = require('./../outputBloq');

/**
 * Bloq name: number
 *
 * Bloq type: Output
 *
 * Description: It returns the number given.
 *
 * Return type: float
 */

var number = _.merge(_.clone(OutputBloq, true), {

    name: 'number',
    bloqClass: 'bloq-number',
    content: [
        [{
            id: 'VALUE',
            alias: 'numberInput',
            value: 0
        }]
    ],
    code: '{VALUE}',
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        code: '{VALUE}'
    },
    python: {
        codeLines: [{
            code: '{VALUE}'
        }]
    }
});

utils.preprocessBloq(number);

module.exports = number;