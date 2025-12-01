/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    OutputBloq = require('./../../outputBloq');

/**
 * Bloq name: mkbIntegratedSoundSensor
 *
 * Bloq type: Output
 *
 *
 *
 * Return type: float
 */

var mkbIntegratedSoundSensor = _.merge(_.clone(OutputBloq, true), {

    name: 'mkbIntegratedSoundSensor',
    bloqClass: 'bloq-components-color',
    content: [
        [{
            alias: 'text',
            value: 'Leer sensor de sonido integrado'
        }]
    ],
    code: '',
    returnType: {
        type: 'simple',
        value: 'float'
    },
    arduino: {
        code: 'robot.readSoundLevel()'
    }
});
utils.preprocessBloq(mkbIntegratedSoundSensor);

module.exports = mkbIntegratedSoundSensor;