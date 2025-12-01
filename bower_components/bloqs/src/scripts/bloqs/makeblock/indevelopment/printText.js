/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: mBotShowPrintText
 *
 * Bloq type: Statement
 *
 * Description:
 *
 */

var mBotShowPrintText = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotShowPrintText',
    bloqClass: 'bloq-mbot-printtext',
    content: [
        [{
            alias: 'text',
            value: 'Escribir'
        }, {
            id: 'TEXT',
            alias: 'stringInput',
            defaultValue: 'Hola'
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
        }, {
            alias: 'text',
            value: 'empezando en la posición (columna, fila)'
        }, {
            id: 'COLUMN',
            alias: 'numberInput',
            value: 0
        }, {
            id: 'ROW',
            alias: 'numberInput',
            value: 0
        }]
    ],
    code: '',
    arduino: {
        includes: ['mBot.h'],
        needInstanceOf: [{
            name: 'mBot',
            type: 'MBot'
        }],
        code: 'mBot.print({PORT}, {TEXT}, {COLUMN}, {ROW});'
    }
});

utils.preprocessBloq(mBotShowPrintText);

module.exports = mBotShowPrintText;