# Solución: Componentes No Aparecen en Código

## Problema Identificado

Los componentes añadidos al hardware **no aparecen en el código generado**.

## Causa Raíz

### Flujo Normal del Sistema

1. **Usuario arrastra conexión** en hardware tab
2. **jsPlumb dispara evento** `connectionEvent` (en hw2Bloqs.js línea 468)
3. **hardwareTab.js escucha evento** `connectionEventHandler` (línea ~218)
4. **Actualiza componente**: `componentReference.connected = true`
5. **Refresca componentes**: Llama `$scope.refreshComponentsArray()`
6. **bloqsProject.js genera código**: Solo incluye componentes con `connected: true`

### ¿Por Qué Falla?

**jsPlumb no funciona correctamente** → Los eventos de conexión no se disparan → Los componentes nunca se marcan como `connected = true` → No aparecen en el código

## Diagnóstico del Problema

### 1. jsPlumb No Se Carga

**Síntoma**: No se ven puntos de conexión (endpoints) en placas ni componentes

**Verificar**:
```javascript
// En DevTools Console:
console.log('jsPlumb:', window.jsPlumb);
console.log('Version:', jsPlumb?.version);
```

**Debe mostrar**: 
- Objeto jsPlumb con funciones
- Version: "2.15.6"

**Si muestra `undefined`**: jsPlumb no se cargó

### 2. Container No Está Inicializado

**Síntoma**: jsPlumb existe pero los eventos no se disparan

**Verificar en código** `hardwareTab.js`:
```javascript
// Línea ~193
if (container) {
    container.addEventListener('connectionEvent', connectionEventHandler);
}
```

**El problema**: `container` podría ser null o no estar disponible

### 3. Eventos No Se Disparan

**Síntoma**: Conexiones visuales funcionan pero componentes no se marcan como conectados

**El problema**: Event listener no está registrado correctamente

## Soluciones

### Solución A: Verificar Carga de jsPlumb (Ya Implementada)

✅ jsPlumb 2.15.6 descargado en `app/libs/jsplumb.min.js`
✅ `index.html` actualizado para cargarlo

**Verificar que funciona**:
1. Abrir DevTools (F12)
2. Ejecutar: `console.log(window.jsPlumb?.version)`
3. Debe mostrar: `"2.15.6"`

### Solución B: Limpiar Caché de Electron

El problema más probable es que Electron tiene en caché el mock antiguo de jsPlumb.

```bash
# Cerrar aplicación
pkill -f electron

# Limpiar caché
rm -rf ~/.config/Electron/Cache
rm -rf ~/.cache/electron

# Reiniciar
npm start
```

### Solución C: Forzar Inicialización de hw2Bloqs

Si el container no se inicializa correctamente, añadir verificación en `hardwareTab.js`:

```javascript
// Después de línea ~193 en hardwareTab.js
var ensureContainerReady = function() {
    if (!container) {
        container = document.getElementById('proto');
    }
    
    if (container && !container.hasEventListener) {
        container.addEventListener('connectionEvent', connectionEventHandler);
        container.hasEventListener = true; // Marca para no duplicar
        console.log('✓ connectionEvent listener registered');
    }
};

// Llamar en varios puntos
$scope.$on('hardware:loaded', ensureContainerReady);
$timeout(ensureContainerReady, 500);
```

### Solución D: Debug Mode - Verificar Eventos

Añadir logs temporales para diagnosticar:

```javascript
// En hw2Bloqs.js, línea ~468 (dentro de bind('connection'))
console.log('🔵 CONNECTION EVENT FIRED:', {
    component: componentData.uid,
    pin: pinAssignation
});
containerDefault.dispatchEvent(connectionEvent);

// En hardwareTab.js, inicio de connectionEventHandler
var connectionEventHandler = function(e) {
    console.log('🟢 CONNECTION EVENT RECEIVED:', e);
    // ... resto del código
};
```

## Plan de Acción

### Paso 1: Verificar jsPlumb
```bash
# En DevTools Console:
console.log('jsPlumb loaded:', !!window.jsPlumb);
console.log('jsPlumb version:', window.jsPlumb?.version);
```

**Resultado esperado**: 
- `jsPlumb loaded: true`
- `jsPlumb version: "2.15.6"`

**Si falla**: Limpiar caché (Solución B)

### Paso 2: Probar Conexión

1. Añadir placa (ej: Arduino UNO)
2. Arrastrar componente (ej: LED) al canvas
3. Intentar crear conexión:
   - ¿Se ven puntos de conexión?
   - ¿Se puede arrastrar desde componente a placa?
   - ¿Se crea línea de conexión visual?

### Paso 3: Verificar Eventos

En DevTools Console, ejecutar:
```javascript
// Verificar que el listener está registrado
var container = document.getElementById('proto');
console.log('Container:', container);
console.log('Has listeners:', !!container?._events);
```

### Paso 4: Verificar Componentes Array

Después de conectar un componente:
```javascript
// En DevTools Console:
angular.element(document.body).scope().$parent.componentsArray
```

**Debe mostrar**: Array con el componente conectado en la categoría correspondiente

### Paso 5: Verificar Código Generado

1. Ir a pestaña "Código"
2. Verificar que aparece el código del componente

## Checklist de Verificación

- [ ] jsPlumb se carga correctamente (version 2.15.6)
- [ ] Se ven puntos de conexión en placa
- [ ] Se ven puntos de conexión en componentes
- [ ] Se pueden arrastrar conexiones
- [ ] Las conexiones crean líneas visuales
- [ ] Console muestra evento connection fired
- [ ] Console muestra evento connection received
- [ ] componentsArray incluye componente conectado
- [ ] Código se genera correctamente

## Archivos Involucrados

| Archivo | Rol | Líneas Clave |
|---------|-----|--------------|
| `hw2Bloqs.js` | Dispara evento connection | 468-520 |
| `hardwareTab.js` | Escucha evento, marca connected | 218-260 |
| `bloqsProject.js` | Filtra componentes connected, genera código | 80-130 |
| `index.html` | Carga jsPlumb | 36 |

## Próximos Pasos

1. **Limpiar caché** de Electron (Solución B más probable)
2. **Reiniciar** aplicación
3. **Probar** conexión de componente
4. **Verificar** código generado
5. **Si persiste**: Añadir logs de debug (Solución D)

---

**Estado**: ✅ PROBLEMA IDENTIFICADO - SOLUCIÓN LISTA
**Fecha**: 1 de diciembre de 2025
**Prioridad**: ALTA (bloquea funcionalidad principal)
