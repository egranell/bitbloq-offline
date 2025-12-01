/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    OutputBloq = require('./../../../outputBloq');

/**
 * Bloq name: mBotGetButtonStatus
 *
 * Bloq type: Output
 *
 *
 *
 * Return type: float
 */

var mBotGetButtonStatus = _.merge(_.clone(OutputBloq, true), {

    name: 'mBotGetButtonStatus',
    bloqClass: 'bloq-mbot-getbuttonstatus',
    content: [
        [{
            alias: 'text',
            value: 'bloq-mbot-getbuttonstatus'
        }]
    ],
    code: '',
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        includes: ['BitbloqMBotDeprecated.h'],
        needInstanceOf: [{
            name: 'mBotv1',
            type: 'MBot'
        }],
        code: 'mBotv1.getButtonStatus()'
    }
});

utils.preprocessBloq(mBotGetButtonStatus);

module.exports = mBotGetButtonStatus;