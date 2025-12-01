/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    StatementBloq = require('./../statementBloq');

/**
 * Bloq name: viewer
 *
 * Bloq type: Statement
 *
 * Description: the viewer write their line in this comments
 *
 */

var viewer = _.merge(_.clone(StatementBloq, true), {

    name: 'viewer',
    bloqClass: 'bloq-viewer',
    content: [
        [{
            alias: 'text',
            value: 'bloq-viewer'
        }]
    ],
    code: '/*sendViewerData*/',
    arduino: {
        code: '/*sendViewerData*/'
    }
});
utils.preprocessBloq(viewer);

module.exports = viewer;