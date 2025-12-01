/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: evolutionHeadAdvance
 *
 * Bloq type: statement
 *
 * Description: It makes Evolution turn its head a given amount
 *              of degrees to a specific side, selectable from
 *              a drop-down.
 *
 * Return type: none
 */

var evolutionHeadAdvance = _.merge(_.clone(StatementBloq, true), {

    name: 'evolutionHeadAdvance',
    bloqClass: 'bloq-evolution-head',
    content: [
        [{
            alias: 'text',
            value: 'bloq-evolution-head-advance'
        }, {
            bloqInputId: 'DEGREES',
            alias: 'bloqInput',
            acceptType: ['float'],
            suggestedBloqs: ['number', 'selectVariable']
        }, {
            alias: 'text',
            value: 'bloq-evolution-head-advance-deg'
        }, {
            id: 'SIDE',
            alias: 'staticDropdown',
            options: [{
                label: 'bloq-evolution-head-advance-left',
                value: 'HEAD_LEFT'
            }, {
                label: 'bloq-evolution-head-advance-right',
                value: 'HEAD_RIGHT'
            }]
        }]
    ],
    code: '\'{SIDE}\' === \'HEAD_LEFT\'? \'evolution.turnHead({DEGREES});\' : \'evolution.turnHead(-{DEGREES});\'',
    arduino: {
        includes: ['BitbloqEvolution.h', 'BitbloqUS.h', 'Servo.h', 'BitbloqOscillator.h'],
        needInstanceOf: [{
            name: 'evolution',
            type: 'Evolution'
        }],
        setupExtraCode: 'evolution.init();',
        conditional: {
            aliasId: 'SIDE',
            code: {
                'HEAD_LEFT': 'evolution.turnHead({DEGREES});',
                'HEAD_RIGHT': 'evolution.turnHead(-{DEGREES});'
            }
        }
    }
});
utils.preprocessBloq(evolutionHeadAdvance);

module.exports = evolutionHeadAdvance;