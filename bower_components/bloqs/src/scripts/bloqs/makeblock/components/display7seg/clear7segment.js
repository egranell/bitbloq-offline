/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: clear led matrix
 *
 * Bloq type: Statement
 *
 * Description:
 *
 */

var clear7segment = _.merge(_.clone(StatementBloq, true), {

    name: 'clear7segment',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-makeblock-7segment-clear'
        }, {
            id: 'DISPLAY',
            alias: 'dynamicDropdown',
            options: 'display7seg'
        }]
    ],
    code: '',
    arduino: {
        code: '{DISPLAY}.clearDisplay();'
    }
});
utils.preprocessBloq(clear7segment);

module.exports = clear7segment;
