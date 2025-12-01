/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: mBotStop
 *
 * Bloq type: Statement
 *
 * Description: Move the vehicle forward
 *
 */

var mBotStop = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotStop',
    bloqClass: 'bloq-mbot-stop',
    content: [
        [{
            alias: 'text',
            value: 'bloq-mbot-stop'
        }]
    ],
    code: '',
    arduino: {
        includes: ['BitbloqMBotDeprecated.h'],
        needInstanceOf: [{
            name: 'mBotv1',
            type: 'MBot'
        }],
        code: 'mBotv1.move(1,0);'
    }
});

utils.preprocessBloq(mBotStop);

module.exports = mBotStop;