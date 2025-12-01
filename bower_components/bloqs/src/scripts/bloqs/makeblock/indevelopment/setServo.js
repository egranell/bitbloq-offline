/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: mBotSetServo
 *
 * Bloq type: Statement
 *
 * Description: Move the vehicle forward
 *
 */

var mBotSetServo = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotSetServo',
    bloqClass: 'bloq-mbot-setservo',
    content: [
        [{
            alias: 'text',
            value: 'Fijar el servo en el'
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
            value: 'y el'
        }, {
            id: 'BANK',
            alias: 'staticDropdown',
            options: [{
                label: 'banco 1',
                value: '1'
            }, {
                label: 'banco 2',
                value: '2'
            }]
        }, {
            alias: 'text',
            value: 'con un ángulo de '
        }, {
            id: 'ANGLE',
            alias: 'staticDropdown',
            options: [{
                label: '0',
                value: '0'
            }, {
                label: '45',
                value: '45'
            }, {
                label: '90',
                value: '90'
            }, {
                label: '135',
                value: '135'
            }, {
                label: '180',
                value: '180'
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
        code: 'mBot.setServo({PORT}, {BANK}, {ANGLE});'
    }
});

utils.preprocessBloq(mBotSetServo);

module.exports = mBotSetServo;