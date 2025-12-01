/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: viewer
 *
 * Bloq type: Statement
 *
 * Description: the viewer write their line in this comments
 *
 */

var phoneConfigTwitter = _.merge(_.clone(StatementBloq, true), {

    name: 'phoneConfigTwitter',
    bloqClass: 'bloq-twitter-config',
    content: [
        [{
            alias: 'text',
            value: 'bloq-twitter-config'
        }]
    ],
    code: '/*sendTwitterAppConfig*/',
    arduino: {
        code: '/*sendTwitterAppConfig*/'
    }
});
utils.generateBloqInputConnectors(phoneConfigTwitter);

module.exports = phoneConfigTwitter;