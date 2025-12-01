/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: mBotSetMotor
 *
 * Bloq type: Statement
 *
 * Description:Set the motor speed
 *
 */

var mBotSetMotor = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotSetMotor',
    bloqClass: 'bloq-mbot-setmotor',
    content: [
        [{
            alias: 'text',
            value: 'Fijar el motor '
        }, {
            id: 'MOTOR',
            alias: 'staticDropdown',
            options: [{
                label: 'M1',
                value: 'M1'
            }, {
                label: 'M2',
                value: 'M2'
            }]
        }, {
            alias: 'text',
            value: 'a una velocidad'
        }, {
            id: 'SPEED',
            alias: 'staticDropdown',
            options: [{
                label: 'muy muy rápida',
                value: '255'
            }, {
                label: 'muy rápida',
                value: '100'
            }, {
                label: 'rápida',
                value: '50'
            }, {
                label: 'nula',
                value: '0'
            }, {
                label: 'despacio',
                value: '-50'
            }, {
                label: 'muy despacio',
                value: '-100'
            }, {
                label: 'muy muy despacio',
                value: '-255'
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
        code: 'mBot.setMotor({MOTOR},{SPEED});'
    }
});

utils.preprocessBloq(mBotSetMotor);

module.exports = mBotSetMotor;