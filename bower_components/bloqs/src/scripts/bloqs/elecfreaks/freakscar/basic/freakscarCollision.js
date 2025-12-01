/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementInputBloq = require('./../../../statementInputBloq');

/**
 * Bloq name: zowiIfSound
 *
 * Bloq type: Statement-Input
 *
 * Description: It executes the following code only if Zowi heards a sound.
 *
 * Return type: none
 */

var freakscarCollision = _.merge(_.clone(StatementInputBloq, true), {

    name: 'freakscarCollision',
    bloqClass: 'bloq-freakscar-color',
    content: [
        [{
            alias: 'text',
            value: 'bloq-freakscar-if-collision'
        } ]
    ],
    code: '',
    arduino: {
        code: 'if(robot.readEndStop() == LOW){{STATEMENTS}}'
    }
});

freakscarCollision.connectors[1].acceptedAliases = ['all', 'ifDown'];

utils.preprocessBloq(freakscarCollision);

module.exports = freakscarCollision;
