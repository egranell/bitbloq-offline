'use strict';

var generateUUID = function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

var generateBloqInputConnectors = function(bloq) {
    var uuid;
    for (var i = 0; i < bloq.content.length; i++) {
        for (var j = 0; j < bloq.content[i].length; j++) {
            if (bloq.content[i][j].alias === 'bloqInput') {
                uuid = generateUUID();
                bloq.content[i][j].name = uuid;
                bloq.connectors.push({
                    type: 'connector--input',
                    accept: 'connector--output',
                    acceptType: bloq.content[i][j].acceptType,
                    suggestedBloqs: bloq.content[i][j].suggestedBloqs,
                    name: uuid
                });
            }
        }
    }
};

var addPythonWarning = function(bloq) {
    if (!bloq.python) {
        bloq.python = {
            codeLines: [{
                code: 'Bloque "' + bloq.name + '" no preparado para generar código python'
            }]
        }
    }
};


var preprocessBloq = function(bloq) {
    generateBloqInputConnectors(bloq);
    addPythonWarning(bloq)

};

module.exports.generateBloqInputConnectors = generateBloqInputConnectors;
module.exports.generateUUID = generateUUID;
module.exports.addPythonWarning = addPythonWarning;
module.exports.preprocessBloq = preprocessBloq;