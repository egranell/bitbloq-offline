//---IN PROGGRESS---//

/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: PTSensorCalibration
 *
 * Bloq type: Statement
 *
 * Description: It stablish the sea level pressure to calibrate the sensor
 *
 * Return type: none
 */

var PTSensorCalibration = _.merge(_.clone(StatementBloq, true), {

    name: 'PTSensorCalibration',
    bloqClass: 'bloq-PTsensor-calibration',
    content: [
        [{
            alias: 'text',
            value: 'bloq-PTsensor-calibration'
        }, {
            id: 'VALUE',
            alias: 'numberInput',
            value: 101325
        }, {
            alias: 'text',
            value: 'bloq-PTsensor-calibration-sensor'
        }, {
            id: 'PTSENS',
            alias: 'dynamicDropdown',
            options: 'barometer'
        }]
    ],
    code: '{PTSENS}.setSealevelPressure({VALUE});',
    arduino: {
        code: '{PTSENS}.setSealevelPressure({VALUE});'
    }

});

utils.preprocessBloq(PTSensorCalibration);

module.exports = PTSensorCalibration;