/* global angular */
'use strict';

angular.module('bitbloqOffline')
    .factory('OpenWindow', function($location) {
        // Mock de BrowserWindow - remote está deprecado en Electron moderno
        var BrowserWindow = function(options) {
            console.warn('OpenWindow: BrowserWindow mockeado - funcionalidad de ventanas secundarias deshabilitada');
            return {
                on: function() {},
                loadURL: function() {},
                show: function() {},
                webContents: {
                    openDevTools: function() {}
                }
            };
        };
        
        return {
            open: function(windowArguments, onUnload) {
                console.warn('OpenWindow.open: Funcionalidad deshabilitada en Electron moderno');
                var win = new BrowserWindow(windowArguments);
                if (onUnload) {
                    win.on('closed', onUnload);
                }
                return win;
            }
        };
    });
