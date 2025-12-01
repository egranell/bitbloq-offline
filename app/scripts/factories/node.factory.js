'use strict';

angular.module('bitbloqOffline')
.factory('nodeRemote', function() {
    // NOTA: El módulo 'remote' está deprecado en Electron moderno
    // Para funcionalidad completa, instalar @electron/remote
    // Por ahora retornamos un objeto mock para permitir que la app cargue
    return {
        require: function() {
            console.warn('nodeRemote.require está deshabilitado - funcionalidad limitada');
            return null;
        }
    };
})
.factory('nodeDialog', function(nodeRemote, $injector, $q) {
    const path = require('path');
    const fs = require('fs');
    
    // Crear carpeta de proyectos si no existe
    const projectsDir = path.join(process.cwd(), 'bitbloq-projects');
    if (!fs.existsSync(projectsDir)) {
        fs.mkdirSync(projectsDir, { recursive: true });
    }
    
    return {
        showOpenDialog: function(options) {
            var deferred = $q.defer();
            
            // Obtener lista de archivos .bitbloq
            var files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.bitbloq'));
            
            if (files.length === 0) {
                console.log('No hay proyectos guardados');
                deferred.reject('No hay proyectos guardados');
                return deferred.promise.then(null, function() { return null; });
            }
            
            // Usar el servicio fileDialog para mostrar diálogo
            var fileDialog = $injector.get('fileDialog');
            fileDialog.showOpenDialog(files).then(function(selectedFile) {
                var filePath = path.join(projectsDir, selectedFile);
                deferred.resolve([filePath]);
            }, function() {
                deferred.resolve(null);
            });
            
            return deferred.promise;
        },
        showSaveDialog: function(options) {
            var deferred = $q.defer();
            var defaultName = options.defaultPath || 'proyecto';
            
            // Usar el servicio fileDialog para pedir nombre
            var fileDialog = $injector.get('fileDialog');
            fileDialog.showSaveDialog(defaultName).then(function(fileName) {
                // Asegurar extensión .bitbloq
                if (!fileName.endsWith('.bitbloq')) {
                    fileName += '.bitbloq';
                }
                
                var filePath = path.join(projectsDir, fileName);
                console.log('Guardando proyecto en:', filePath);
                deferred.resolve(filePath);
            }, function() {
                // Usuario canceló
                deferred.resolve(null);
            });
            
            return deferred.promise;
        }
    };
})
.factory('nodeFs', function() {
    return require('fs');
});
