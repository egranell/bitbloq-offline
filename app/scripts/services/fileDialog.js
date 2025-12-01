'use strict';

/**
 * @ngdoc service
 * @name bitbloqOffline.fileDialog
 * @description
 * # fileDialog
 * Service para diálogos de archivo usando ngDialog
 */
angular.module('bitbloqOffline')
    .service('fileDialog', function($q, ngDialog) {
        var exports = {};
        
        exports.showSaveDialog = function(defaultName) {
            var deferred = $q.defer();
            
            var dialog = ngDialog.open({
                template: '<div class="modal-content">' +
                         '<h3>Guardar proyecto</h3>' +
                         '<input type="text" ng-model="fileName" placeholder="Nombre del proyecto" ' +
                         'style="width: 100%; padding: 10px; margin: 10px 0; font-size: 16px;">' +
                         '<div style="margin-top: 20px; text-align: right;">' +
                         '<button ng-click="closeThisDialog()" style="padding: 10px 20px; margin-right: 10px;">Cancelar</button>' +
                         '<button ng-click="confirm(fileName)" style="padding: 10px 20px; background: #0b8adb; color: white; border: none;">Guardar</button>' +
                         '</div>' +
                         '</div>',
                plain: true,
                className: 'ngdialog-theme-default',
                controller: ['$scope', function($scope) {
                    $scope.fileName = defaultName || 'proyecto';
                    $scope.confirm = function(name) {
                        deferred.resolve(name);
                        $scope.closeThisDialog();
                    };
                }]
            });
            
            dialog.closePromise.then(function(data) {
                if (data.value === '$document' || data.value === '$closeButton') {
                    deferred.reject();
                }
            });
            
            return deferred.promise;
        };
        
        exports.showOpenDialog = function(projectsList) {
            var deferred = $q.defer();
            
            var filesHtml = projectsList.map(function(file, index) {
                return '<div style="padding: 10px; border-bottom: 1px solid #eee; cursor: pointer;" ' +
                       'ng-click="selectFile(\'' + file + '\')">' + file + '</div>';
            }).join('');
            
            var dialog = ngDialog.open({
                template: '<div class="modal-content">' +
                         '<h3>Abrir proyecto</h3>' +
                         '<div style="max-height: 300px; overflow-y: auto; border: 1px solid #ddd; margin: 10px 0;">' +
                         (filesHtml || '<div style="padding: 20px; text-align: center;">No hay proyectos guardados</div>') +
                         '</div>' +
                         '<div style="margin-top: 20px; text-align: right;">' +
                         '<button ng-click="closeThisDialog()" style="padding: 10px 20px;">Cancelar</button>' +
                         '</div>' +
                         '</div>',
                plain: true,
                className: 'ngdialog-theme-default',
                controller: ['$scope', function($scope) {
                    $scope.selectFile = function(fileName) {
                        deferred.resolve(fileName);
                        $scope.closeThisDialog();
                    };
                }]
            });
            
            dialog.closePromise.then(function(data) {
                if (data.value === '$document' || data.value === '$closeButton') {
                    deferred.reject();
                }
            });
            
            return deferred.promise;
        };
        
        return exports;
    });
