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

    name: 'cube',
    bloqClass: 'bloq-wait',
    content: [
        [{
            alias: 'text',
            value: 'Crear cubo con tamaño X:'
        }, {
            id: 'XINPUT',
            alias: 'numberInput',
            value: 10,
        }, {
            alias: 'text',
            value: 'Y:'
        }, {
            id: 'YINPUT',
            alias: 'numberInput',
            value: 10,
        }, {
            alias: 'text',
            value: 'Z:'
        }, {
            id: 'ZINPUT',
            alias: 'numberInput',
            value: 10,
        }]
    ],
    arduino: {
        code: 'cube([ {XINPUT}, {YINPUT}, {ZINPUT} ], center=false);'
    }
});

utils.preprocessBloq(wait);

module.exports = wait;