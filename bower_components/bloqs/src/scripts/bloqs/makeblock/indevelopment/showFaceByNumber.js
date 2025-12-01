/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: mBotShowFaceByNumber
 *
 * Bloq type: Statement
 *
 * Description:
 *
 */

var mBotShowFaceByNumber = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotShowFaceByNumber',
    bloqClass: 'bloq-mbot-showfacebynumber',
    content: [
        [{
            alias: 'text',
            value: 'Mostrar la cara número '
        }, {
            id: 'FACE',
            alias: 'numberInput',
            value: 0
        }, {
            alias: 'text',
            value: 'en la pantalla conectada en el '
        }, {
            id: 'PORT',
            alias: 'staticDropdown',
            options: [{
                label: 'puerto 1',
                value: '1'
            }, {
                label: 'puerto 2',
                value: '2'
            }, {
                label: 'puerto 3',
                value: '3'
            }, {
                label: 'puerto 4',
                value: '4'
            }]
        }]
    ],
    code: '',
    arduino: {
        includes: ['mBot.h'],
        needInstanceOf: [{
            name: 'mBot',
            type: 'MBot'
        }],
        code: 'mBot.showFaceByNumber({PORT},{FACE});'
    }
});

utils.preprocessBloq(mBotShowFaceByNumber);

module.exports = mBotShowFaceByNumber;