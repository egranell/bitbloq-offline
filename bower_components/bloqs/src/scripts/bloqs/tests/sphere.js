/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: wait
 *
 * Bloq type: Statement
 *
 * Description: It delays the progression of the program
 *              the given time.
 *
 * Return type: none
 */

var wait = _.merge(_.clone(StatementBloq, true), {

    name: 'sphere',
    bloqClass: 'bloq-wait',
    content: [
        [{
            alias: 'text',
            value: 'Crear esfera con radio'
        }, {
            id: 'RAD',
            alias: 'numberInput',
            value: 10,
        }]
    ],
    arduino: {
        code: 'sphere(r={RAD});'
    }
});

utils.preprocessBloq(wait);

module.exports = wait;