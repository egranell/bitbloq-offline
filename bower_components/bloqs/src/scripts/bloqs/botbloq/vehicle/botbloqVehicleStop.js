/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../build-utils'),
    StatementBloq = require('./../../statementBloq');

/**
 * Bloq name: botbloqVehicleStop
 *
 * Bloq type: Statement
 *
 * Description: Move the vehicle forward
 *
 */

var botbloqVehicleStop = _.merge(_.clone(StatementBloq, true), {

    name: 'botbloqVehicleStop',
    bloqClass: 'bloq-botbloq-vehicle-stop',
    content: [
        [{
            alias: 'text',
            value: 'stop'
        }]
    ],
    code: '',
    python: {
        libraries: ['BotbloqVehicle'],
        needInstanceOf: [{
            name: 'vehicle',
            type: 'BotbloqVehicle'
        }],
        codeLines: [{
            code: 'vehicle.stop()'
        }]
    }
});

utils.preprocessBloq(botbloqVehicleStop);

module.exports = botbloqVehicleStop;