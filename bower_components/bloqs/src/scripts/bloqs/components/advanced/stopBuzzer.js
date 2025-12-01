/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: stopBuzzer
 *
 * Bloq type: Statement
 *
 * Description: turn off buzzer
 *
 * Return type: none
 */

var stopBuzzer = _.merge(_.clone(StatementBloq, true), {

    name: 'stopBuzzer',
    bloqClass: 'bloq-buzzer',
    content: [
        [{
            alias: 'text',
            value: 'bloq-stop-buzzer'
        }, {
            id: 'BUZZER',
            alias: 'dynamicDropdown',
            options: 'buzzers'
        }]
    ],
    code: 'noTone({BUZZER});',
    arduino: {
        needInstanceOf: [{
            name: '{BUZZER}',
            type: 'const int',
            equals: 'º[{BUZZER}.pin.s]'
        }],
        code: 'noTone({BUZZER});'
    }
});
utils.preprocessBloq(stopBuzzer);

module.exports = stopBuzzer;