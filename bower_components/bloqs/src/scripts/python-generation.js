'use strict';
(function(pythonGeneration) {

    var INDENT_DEFAULT_CHARACTER = '    ';
    var PARAMS_REGEXP = /{(.*?)}/;
    var DEFAULT_IMPORTS_CODE = '#!/usr/bin/python\n\nfrom __future__ import absolute_import, print_function, unicode_literals\n\nfrom optparse import OptionParser, make_option\nimport os\nimport sys\nimport socket\nimport uuid\nimport dbus\nimport dbus.service\nimport dbus.mainloop.glib';
    var HEADERCODE = 'try:\n  from gi.repository import GObject\nexcept ImportError:\n  import gobject as GObject\n\nimport time\n\n###bloques bitbloq para bluetooth###\n\n#escribir un texto en la pantalla del dispositivo movil\ndef escribe_texto(server_sock,texto):\n    server_sock.send("%s\\n" % texto)\n\n#movil emite un sonido\ndef emitir_sonido(server_sock, sonido ):\n    server_sock.send("playSound-%s\\n" % sonido)\n    time.sleep(1)\n\n#recibe datos por voz o texto\ndef recibe_texto(server_sock):\n    data = server_sock.recv(1024)\n    return data\n\n#enciende/apaga linterna del dispositivo\n#enciende la linterna\ndef enciende_linterna(server_sock):\n    server_sock.send("turnonFlashlight-\\n")\n\n#apaga la linterna\ndef apaga_linterna(server_sock):\n    server_sock.send("turnoffFlashlight-\\n")\n\n#leer luz ambiente\ndef leer_luz(server_sock):\n    server_sock.send("readLight-\\n")\n    dato = recibe_texto(server_sock)\n    print("nivel luz: %s" %dato)\n    return dato\n#leer si está cubierto el dispositivo\ndef recibir_estacubierto(server_sock, cv):\n    server_sock.send("readProx-%s\\n" % cv) #Fallo\n    dato = recibe_texto(server_sock)\n    print("cubierto: %s" %dato)\n    return dato\n\n#leer aceleracion\ndef recibir_aceleracion(server_sock, message, axis):\n    server_sock.send("%s%s\\n" %(message, axis))\n    dato = recibe_texto(server_sock)\n    print("aceleration: %s" %dato)\n    return dato\n\n#leer giroscopio\ndef recibir_giroscopio(server_sock, axis):\n    server_sock.send("readGyros-%s\\n" % axis)\n    dato = recibe_texto(server_sock)\n    print("giroscopio: %s" %dato)\n    return dato\n\n\n#leer campo magnético\ndef recibir_campomagnetico(server_sock, axis):\n    server_sock.send("readMagnetic-%s\\n" % axis)\n    dato = recibe_texto(server_sock)\n    print("magnetic field: %s" %dato)\n    return dato\n\n#leer variables\ndef recibir_orientacion(server_sock, variable):\n    server_sock.send("readOrientation-%s\\n" % variable)\n    dato = recibe_texto(server_sock)\n    print("variable: %s" %dato)\n    return dato\n';
    var CLASSES_CODE = 'class Profile(dbus.service.Object):\n        fd = -1\n\n        @dbus.service.method("org.bluez.Profile1",\n                                        in_signature="", out_signature="")\n        def Release(self):\n                print("Release")\n                mainloop.quit()\n\n        @dbus.service.method("org.bluez.Profile1",\n                                        in_signature="", out_signature="")\n        def Cancel(self):\n                print("Cancel")\n\n        @dbus.service.method("org.bluez.Profile1",\n                                in_signature="oha{sv}", out_signature="")\n        def NewConnection(self, path, fd, properties):\n                self.fd = fd.take()\n                print("NewConnection(%s, %d)" % (path, self.fd))\n\n\n                server_sock = socket.fromfd(self.fd, socket.AF_UNIX, socket.SOCK_STREAM)\n                server_sock.setblocking(1)\n                #server_sock.send("This is Edison SPP loopback test\\nAll data will be loopback\\nPlease start:\\n")\n\n                try:\n                 #hasta aqui se copia y pega todo todo\n                 #aqui se mete el código generado en bitbloq\n';
    var FINAL_CODE = '#desde aqui se copia y pega todo\n                except IOError:\n                    pass\n\n                server_sock.close()\n                print("all done")\n\n#parte final\n\n        @dbus.service.method("org.bluez.Profile1",\n                                in_signature="o", out_signature="")\n        def RequestDisconnection(self, path):\n                print("RequestDisconnection(%s)" % (path))\n\n                if (self.fd > 0):\n                        os.close(self.fd)\n                        self.fd = -1\n\nif __name__ == \'__main__\':\n        dbus.mainloop.glib.DBusGMainLoop(set_as_default=True)\n\n        bus = dbus.SystemBus()\n\n        manager = dbus.Interface(bus.get_object("org.bluez",\n                                "/org/bluez"), "org.bluez.ProfileManager1")\n\n        option_list = [\n                        make_option("-C", "--channel", action="store",\n                                        type="int", dest="channel",\n                                        default=None),\n                        ]\n\n        parser = OptionParser(option_list=option_list)\n\n        (options, args) = parser.parse_args()\n\n        options.uuid = "1101"\n        options.psm = "3"\n        options.role = "server"\n        options.name = "Edison SPP Loopback"\n        options.service = "spp char loopback"\n        options.path = "/foo/bar/profile"\n        options.auto_connect = False\n        options.record = ""\n\n        profile = Profile(bus, options.path)\n\n        mainloop = GObject.MainLoop()\n\n        opts = {\n                        "AutoConnect" : options.auto_connect,\n                }\n\n        if (options.name):\n                opts["Name"] = options.name\n\n        if (options.role):\n                opts["Role"] = options.role\n\n        if (options.psm is not None):\n                opts["PSM"] = dbus.UInt16(options.psm)\n\n        if (options.channel is not None):\n                opts["Channel"] = dbus.UInt16(options.channel)\n\n        if (options.record):\n                opts["ServiceRecord"] = options.record\n\n        if (options.service):\n                opts["Service"] = options.service\n\n        if not options.uuid:\n                options.uuid = str(uuid.uuid4())\n\n        manager.RegisterProfile(options.path, options.uuid, opts)\n\n        mainloop.run()\n';
    var params = {
        indentCharacter: INDENT_DEFAULT_CHARACTER
    };

    var imports = {},
        instances = {};

    function getCode(bloqFullStructure) {
        //console.log('getting code', bloqFullStructure);
        imports = {};
        instances = {};

        var bloqsCode = getCodeFromBLoq(bloqFullStructure);
        var propiedad;
        //after bloqscode to reuse the bucle to fill libraries and instance dependencies
        var importsCode = '';
        for (propiedad in imports) {
            importsCode += 'import ' + propiedad + '\n';
        }

        var instancesCode = '';
        for (propiedad in instances) {
            instancesCode += INDENT_DEFAULT_CHARACTER.repeat(6) + propiedad + ' = ' + instances[propiedad] + '.' + instances[propiedad] + '()\n';
        }

        var code = '# coding=utf-8\n\n';
        code += DEFAULT_IMPORTS_CODE + '\n\n';
        code += importsCode + '\n\n';
        code += HEADERCODE + '\n\n';

        code += CLASSES_CODE + '\n\n';
        code += instancesCode + '\n\n';
        code += bloqsCode + '\n\n';
        code += FINAL_CODE + '\n\n';
        return code;
    }

    function getCodeFromBLoq(bloqFullStructure) {
        console.log('getting code from bloq', bloqFullStructure);

        var codeLines = bloqFullStructure.python.codeLines,
            aliases = bloqFullStructure.content[0],
            childs = bloqFullStructure.childs,
            childsCode = '',
            aliasesValuesHashMap = {},
            value,
            code = '',
            tempCode,
            match,
            numberOfIndents;

        if (bloqFullStructure.python.libraries) {
            for (var i = 0; i < bloqFullStructure.python.libraries.length; i++) {
                imports[bloqFullStructure.python.libraries[i]] = true;
            }
        }

        if (bloqFullStructure.python.needInstanceOf) {
            for (var i = 0; i < bloqFullStructure.python.needInstanceOf.length; i++) {
                instances[bloqFullStructure.python.needInstanceOf[i].name] = bloqFullStructure.python.needInstanceOf[i].type;
            }
        }

        if (aliases) {
            for (var i = 0; i < aliases.length; i++) {
                if (aliases[i].id) {
                    aliasesValuesHashMap[aliases[i].id] = aliases[i].value;
                } else if (aliases[i].bloqInputId && aliases[i].value) {
                    aliasesValuesHashMap[aliases[i].bloqInputId] = getCodeFromBLoq(aliases[i].value);
                }
            }
        }
        if (childs) {
            for (var i = 0; i < childs.length; i++) {
                childsCode += getCodeFromBLoq(childs[i]);
            }
            aliasesValuesHashMap.STATEMENTS = childsCode;
        }

        for (var i = 0; i < codeLines.length; i++) {
            numberOfIndents = (codeLines[i].indentation || 3);
            if (codeLines[i].conditional) {
                tempCode = codeLines[i].conditional.code[aliasesValuesHashMap[codeLines[i].conditional.aliasId]];
            } else {
                tempCode = codeLines[i].code;
            }

            //searchGroups
            match = PARAMS_REGEXP.exec(tempCode);
            while (match) {
                console.log('match!', match);
                console.log(aliasesValuesHashMap[match[1]]);
                tempCode = tempCode.replace(match[0], aliasesValuesHashMap[match[1]]);
                match = PARAMS_REGEXP.exec(tempCode);
            }

            if (bloqFullStructure.type !== 'output') {
                tempCode = tempCode.replace(/^/gm, params.indentCharacter.repeat(numberOfIndents));
                tempCode += '\n';
            }

            code += tempCode;
        }
        return code;
    }

    pythonGeneration.getCode = getCode;
    pythonGeneration.params = params;

    return pythonGeneration;

})(window.pythonGeneration = window.pythonGeneration || {}, undefined);