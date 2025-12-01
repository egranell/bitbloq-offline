/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: 
 *
 * Bloq type: Statement
 *
 * Description: 
 *
 * Return type: none
 */

var mkbfan = _.merge(_.clone(StatementBloq, true), {

    name: 'mkbfan',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            id: 'SPEED',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-led-turnon',
                value: '-150'
            }, {
                label: 'bloq-led-turnoff',
                value: '-1'
            }, {
                label: 'bloq-reverse',
                value: '1'
            }]
        }, {
            alias: 'text',
            value: 'bloq-the'
        }, {
            id: 'FAN',
            alias: 'dynamicDropdown',
            options: 'mkb_fan'
        }]
    ],
    code: '',
    arduino: {
        code: '{FAN}.setSpeed({SPEED});'
    }
});
utils.preprocessBloq(mkbfan);

module.exports = mkbfan;
