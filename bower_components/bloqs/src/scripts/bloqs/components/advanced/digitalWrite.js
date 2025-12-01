/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: digitalWrite
 *
 * Bloq type: Statement
 *
 * Description: It sets a specific digital pin with a given value.
 *
 * Return type: none
 */

var digitalWrite = _.merge(_.clone(StatementBloq, true), {

    name: 'digitalWrite',
    bloqClass: 'bloq-pin-writte-advanced',
    content: [
        [{
            alias: 'text',
            value: 'bloq-pin-digital-write'
        }, {
            bloqInputId: 'PIN',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-pin-digital-write-data-V1'
        }, {
            bloqInputId: 'DATA',
            alias: 'bloqInput',
            acceptType: ['all'],
            suggestedBloqs: ['pinLevels', 'number', 'selectVariable']
        }]
    ],
    code: 'digitalWrite({PIN},{DATA});',
    arduino: {
        code: 'digitalWrite({PIN},{DATA});',
        setupExtraCode: 'pinMode({PIN}, OUTPUT);'
    }

});

utils.preprocessBloq(digitalWrite);


module.exports = digitalWrite;