# Solución: Conexiones Visuales con jsPlumb

## Problema Identificado

Las conexiones visuales entre placas y componentes **no funcionan** porque:

1. **jsPlumb está mockeado** en `app/index.html` - La librería real está deshabilitada
2. **Versión incompatible en node_modules** - jsPlumb 4.0.0-RC47 vs código que usa API de jsPlumb 2.x
3. **jsPlumb 2.x no disponible en bower** - El repositorio ya no tiene las versiones antiguas

## Solución: Cargar jsPlumb 2.15.6 desde CDN

### Paso 1: Modificar `app/index.html`

Reemplazar el mock de jsPlumb actual con la carga desde CDN:

```html
<!-- Antes (líneas 26-27): -->
<!-- jsPlumb comentado temporalmente - funcionalidad de conexiones visuales limitada -->
<!-- <script src="../node_modules/@jsplumb/community/js/jsplumb.community.umd.js"></script> -->

<!-- Cambiar por: -->
<!-- jsPlumb 2.15.6 desde CDN - Compatible con código existente -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jsPlumb/2.15.6/js/jsplumb.min.js"></script>
```

Luego **eliminar todo el código del mock** (líneas 28-95 aproximadamente):

```javascript
// ELIMINAR ESTE BLOQUE COMPLETO:
<script>
// Mock completo de jsPlumb usando Proxy...
// ... (todo el código del mock)
</script>
```

### Paso 2: Verificar que jQuery esté cargado antes

jsPlumb 2.x requiere jQuery. El código actual ya lo carga correctamente:

```html
<script>
window.$ = window.JQuery = window.jQuery = require('jquery');
window.Q = require('q');
</script>
```

✅ Esto ya está correcto.

### Paso 3: Reiniciar la aplicación

```bash
npm start
```

## Archivo de Modificación

El único archivo que necesita modificación es:
- `app/index.html` - Reemplazar mock con CDN

## Código Completo para app/index.html (sección head)

```html
<!doctype html>
<html data-ng-app="bitbloqOffline">

<head>
    <meta charset="UTF-8">
    <title>Bitbloq Offline</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- bower:css -->
    <link rel="stylesheet" href="../bower_components/bloqs/dist/bloqs.css" />
    <link rel="stylesheet" href="../bower_components/prism/themes/prism.css" />
    <link rel="stylesheet" href="../bower_components/ng-dialog/css/ngDialog.css" />
    <link rel="stylesheet" href="../bower_components/ng-dialog/css/ngDialog-theme-default.css" />
    <link rel="stylesheet" href="../bower_components/nvd3/build/nv.d3.css" />
    <!-- endbower -->
    <link rel="stylesheet" href="../bower_components/prism/plugins/line-numbers/prism-line-numbers.css" />
    <link rel="stylesheet" href="styles/main.css" />
</head>

<body>
    <div ng-include="'images/sprite.svg'" ng-hide="true"></div>
    <div data-ng-include="'views/components/alerts.html'" ng-controller="AlertsCtrl" class="alerts--container"></div>
    <div data-ng-view=""></div>
    <script>
    window.$ = window.JQuery = window.jQuery = require('jquery');
    window.Q = require('q');
    </script>
    <!-- bower:js -->
    <script src="../bower_components/angular/angular.js"></script>
    <script src="../bower_components/angular-route/angular-route.js"></script>
    <script src="../bower_components/angular-websocket/angular-websocket.min.js"></script>
    <script src="../bower_components/angular-clipboard/angular-clipboard.js"></script>
    <script src="../bower_components/lodash/lodash.js"></script>
    
    <!-- jsPlumb 2.15.6 desde CDN - Compatible con código existente -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jsPlumb/2.15.6/js/jsplumb.min.js"></script>
    
    <script src="../bower_components/angular-sanitize/angular-sanitize.js"></script>
    <!-- ... resto de scripts bower ... -->
```

## ¿Por qué desde CDN?

1. **jsPlumb 2.x no está en bower** - El repositorio ya no tiene versiones antiguas
2. **node_modules tiene versión incompatible** - v4.0.0-RC47 tiene API diferente
3. **CDN es confiable** - CDNJS es un servicio estable y rápido
4. **Funcionalidad completa** - Todas las APIs de jsPlumb 2.x disponibles
5. **Sin dependencias adicionales** - No requiere npm/bower install

## Métodos de jsPlumb Usados en el Código

El código de Bitbloq usa estos métodos de jsPlumb 2.x:

```javascript
// Instancia
jsPlumbInstance = jsPlumb.getInstance()
jsPlumbInstance.setContainer(container)

// Endpoints
jsPlumbInstance.addEndpoint(element, options)
jsPlumbInstance.removeAllEndpoints(element)
jsPlumbInstance.getEndpoint(uuid)
jsPlumbInstance.getEndpoints(element)
jsPlumbInstance.selectEndpoints(options)

// Conexiones
jsPlumbInstance.connect(options)
jsPlumbInstance.detach(connection)
jsPlumbInstance.detachAllConnections(element)
jsPlumbInstance.getConnections(options)
jsPlumbInstance.getAllConnections()
jsPlumbInstance.select(options)

// Drag & Drop
jsPlumbInstance.draggable(element, options)

// Eventos
jsPlumbInstance.bind('connection', callback)
jsPlumbInstance.bind('connectionDetached', callback)
jsPlumbInstance.bind('connectionMoved', callback)
jsPlumbInstance.unbind('connection')

// UI
jsPlumbInstance.repaintEverything()
jsPlumbInstance.remove(element)

// Configuración
jsPlumbInstance.importDefaults(options)
jsPlumbInstance.registerConnectionTypes(types)
jsPlumbInstance.registerEndpointTypes(types)
```

Todos estos métodos están disponibles en jsPlumb 2.15.6 desde CDN.

## Funcionalidad Esperada Después de la Solución

Una vez aplicada la solución, deberían funcionar:

✅ **Arrastrar conexiones** desde componentes a pines de la placa
✅ **Mover conexiones** a diferentes pines
✅ **Seleccionar conexiones** con click
✅ **Eliminar conexiones** con Delete/Backspace
✅ **Desconectar componentes** desde menú contextual
✅ **Conexiones automáticas** para componentes con pines fijos (RTC, LCD, BT)
✅ **Guardar/cargar proyectos** con conexiones
✅ **Visualización correcta** de las líneas de conexión

## ✅ SOLUCIÓN APLICADA: jsPlumb Local

Se ha descargado jsPlumb 2.15.6 localmente para uso offline:

```bash
# jsPlumb descargado en:
app/libs/jsplumb.min.js (211KB)

# Configurado en index.html:
<script src="libs/jsplumb.min.js"></script>
```

Esta solución elimina la dependencia de CDN y permite uso offline completo.

## Compatibilidad

jsPlumb 2.15.6 es compatible con:
- ✅ jQuery 2.x / 3.x (proyecto usa 3.7.1)
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Electron 31.x (proyecto usa 31.7.5)
- ✅ AngularJS 1.4+ (proyecto usa 1.8.3)

## Resumen de Cambios

| Archivo | Cambio | Líneas |
|---------|--------|--------|
| `app/index.html` | Reemplazar mock con CDN | ~70 líneas |
| `bower.json` | Revertir cambio jsPlumb (opcional) | 1 línea |

## Comandos de Aplicación

```bash
# 1. Editar app/index.html (ver arriba)

# 2. Revertir cambio en bower.json (opcional)
git checkout bower.json

# 3. Reiniciar aplicación
npm start
```

## Verificación

Para verificar que jsPlumb se cargó correctamente, en la consola del navegador:

```javascript
// Debería mostrar el objeto jsPlumb
console.log(window.jsPlumb)

// Debería mostrar "2.15.6"
console.log(jsPlumb.version)
```

## Estado Actual vs Estado Esperado

### Antes (Con Mock)
- ❌ No se pueden crear conexiones
- ❌ No se pueden mover conexiones  
- ❌ No se pueden eliminar conexiones
- ❌ Proyectos guardados pierden conexiones
- ⚠️ Interfaz visible pero no funcional

### Después (Con jsPlumb Real desde CDN)
- ✅ Crear conexiones arrastrando
- ✅ Mover conexiones entre pines
- ✅ Seleccionar y eliminar conexiones
- ✅ Proyectos guardan/cargan conexiones correctamente
- ✅ Interfaz completamente funcional

## Notas Importantes

1. **No usar jsPlumb 4.x** - La API es completamente diferente y requeriría reescribir todo hw2Bloqs.js
2. **CDN requiere internet** - Para uso offline, descargar el archivo manualmente
3. **jsPlumb 2.x es legacy** - Pero es la versión que el código espera
4. **Futuro** - Considerar migrar a jsPlumb 5.x o alternativas modernas en el largo plazo

---

**Creado:** 1 de diciembre de 2025  
**Última actualización:** 1 de diciembre de 2025  
**Estado:** ✅ SOLUCIÓN LISTA PARA APLICAR
