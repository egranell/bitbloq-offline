'use strict';

/**
 * @ngdoc service
 * @name bitbloqApp.utils
 * @description
 * # utils
 * Service in the bitbloqApp.
 */
angular.module('bitbloqOffline')
    .service('nodeUtils', function(nodeDialog, nodeFs) {
        var exports = {};

        exports.downloadFile = function(fileName, data, defaultExtension, callback) {
            var dialogPromise = nodeDialog.showSaveDialog({
                defaultPath: fileName
            });
            
            // Manejar promesa
            if (dialogPromise && dialogPromise.then) {
                dialogPromise.then(function(filePath) {
                    if (filePath) {
                        if (defaultExtension && filePath.indexOf('.') === -1) {
                            filePath += defaultExtension;
                        }
                        nodeFs.writeFileSync(filePath, data);
                        callback(filePath);
                    }
                });
            } else {
                // Compatibilidad con retorno directo (legacy)
                var filePath = dialogPromise;
                if (filePath) {
                    if (defaultExtension && filePath.indexOf('.') === -1) {
                        filePath += defaultExtension;
                    }
                    nodeFs.writeFileSync(filePath, data);
                    callback(filePath);
                }
            }
        };

        return exports;
    });
