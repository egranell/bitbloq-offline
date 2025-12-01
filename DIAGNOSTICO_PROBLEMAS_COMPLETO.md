# Diagnóstico Completo de Problemas en Bitbloq Offline

## Problemas Reportados

1. ❌ **Las conexiones entre placas y componentes no se pueden editar**
2. ❌ **Al añadir componentes no aparece su configuración en el código**

## Estado de la Solución de jsPlumb

### ✅ Implementado Correctamente

- jsPlumb 2.15.6 descargado en `app/libs/jsplumb.min.js` (211KB)
- `app/index.html` actualizado para cargar jsPlumb
- Estilos CSS de endpoints presentes en `main.css`
- Código de hw2Bloqs.js intacto

## Diagnóstico Detallado

### Problema 1: Conexiones No Funcionan

**Causas Posibles:**

1. **jsPlumb no se carga correctamente**
   - Error en la ruta del archivo
   - Bloqueado por Content Security Policy
   - Error de carga en Electron

2. **Errores JavaScript rompen la ejecución**
   - Error al inicializar jsPlumb
   - Error en hw2Bloqs.js
   - Conflicto con otras librerías

3. **Caché de Electron**
   - Electron guardó el mock antiguo en caché
   - Necesita limpieza de caché

### Problema 2: Componentes No Aparecen en Código

Este es un problema **MÁS GRAVE** que indica:

**Posibles Causas:**

1. **Librería bloqs no carga correctamente**
   ```
   bower_components/bloqs/dist/bloqs.js
   bower_components/bloqs/dist/bloqs.css
   ```

2. **Errores JavaScript críticos** que rompen la aplicación antes de llegar a generar código

3. **Problema con AngularJS** - Los controladores no se inicializan correctamente

4. **hw2Bloqs no funciona** - El sistema de hardware no se comunica con el generador de código

## Plan de Diagnóstico Paso a Paso

### Paso 1: Verificar Consola JavaScript

Abrir DevTools (F12) y buscar errores:

```javascript
// En la consola, verificar:

// 1. ¿jsPlumb existe?
console.log('jsPlumb:', window.jsPlumb);

// 2. ¿bloqs existe?
console.log('bloqs:', window.bloqs);

// 3. ¿Angular se cargó?
console.log('Angular:', window.angular);

// 4. ¿jQuery se cargó?
console.log('jQuery:', window.jQuery);
```

### Paso 2: Verificar Pestaña Network

En DevTools → Network, verificar que se cargan:

- ✅ `jsplumb.min.js`
- ✅ `bloqs.js`
- ✅ `angular.js`
- ✅ `lodash.js`
- ✅ Todos los archivos de `bower_components`

### Paso 3: Buscar Errores Específicos

Errores comunes a buscar:

```
❌ "bloqs is not defined"
❌ "jsPlumb is not defined"  
❌ "Cannot read property of undefined"
❌ "Failed to load resource"
❌ "ReferenceError"
❌ "TypeError"
```

### Paso 4: Verificar Inicialización de AngularJS

```javascript
// Verificar que el módulo de Angular se inicializó
angular.module('bitbloqOffline');
```

## Soluciones Propuestas

### Solución A: Limpiar Caché y Reiniciar

```bash
# 1. Matar todos los procesos de Electron
pkill -f electron

# 2. Limpiar caché de Electron
rm -rf ~/.config/Electron/Cache
rm -rf ~/.cache/electron

# 3. Limpiar node_modules de Electron
rm -rf node_modules/electron/dist/

# 4. Reinstalar Electron
npm install electron@31.7.5 --save

# 5. Reiniciar aplicación
npm start
```

### Solución B: Verificar bower_components

```bash
# Verificar que bloqs existe y está completo
ls -lh bower_components/bloqs/dist/

# Si no existe o está incompleto:
bower install

# O reinstalar todo:
rm -rf bower_components
bower install
```

### Solución C: Modo Debug Completo

Modificar `main.js` para forzar DevTools:

```javascript
mainWindow.webContents.openDevTools({ mode: 'detach' });
```

### Solución D: Verificar Orden de Carga

El orden de carga en `index.html` es crítico:

```html
<!-- ORDEN CORRECTO: -->
1. jQuery (requerido primero)
2. Angular
3. Lodash
4. jsPlumb (requiere jQuery)
5. bloqs (requiere Angular y jQuery)
6. Otros scripts
```

## Checklist de Verificación

### Antes de Iniciar la Aplicación

- [ ] `app/libs/jsplumb.min.js` existe (211KB)
- [ ] `bower_components/bloqs/` existe y contiene archivos
- [ ] `bower_components/angular/` existe
- [ ] `app/index.html` tiene el script correcto de jsPlumb
- [ ] No hay archivos `.backup` en uso

### Al Iniciar la Aplicación

- [ ] Abre automáticamente (sin ventana vacía)
- [ ] DevTools se abre (modo debug)
- [ ] No hay errores rojos en Console
- [ ] Pestaña Network muestra todos los archivos cargados (status 200)

### Al Usar la Aplicación

- [ ] Se puede seleccionar una placa
- [ ] Se pueden arrastrar componentes
- [ ] Los componentes se ven en el canvas
- [ ] Se puede hacer click en componentes
- [ ] Aparece panel de configuración del componente
- [ ] **Se ven puntos de conexión** (endpoints) en placa y componentes
- [ ] Se puede arrastrar desde endpoints
- [ ] Se crean líneas de conexión visibles
- [ ] El código se genera en la pestaña de código

## Problemas Conocidos de la Modernización

### 1. Dependencias Bower vs npm

- El proyecto usa **Bower** (deprecado) para dependencias frontend
- Algunas librerías tienen rutas diferentes en npm vs bower
- **bloqs** es una librería propietaria de BQ, solo disponible en bower

### 2. Versiones Específicas

- El código fue escrito para versiones específicas muy antiguas
- AngularJS 1.4.9 (2015)
- jsPlumb 2.x (no compatible con 4.x)
- D3.js 3.x (breaking changes en v4+)

### 3. Electron Modernizado

- Electron 31 tiene restricciones de seguridad más estrictas
- Content Security Policy puede bloquear scripts
- nodeIntegration debe estar habilitado para `require()`

## Comandos de Emergencia

### Reset Completo

```bash
# Guardar proyectos
cp -r bitbloq-projects ~/backup-bitbloq-projects

# Limpiar TODO
git clean -fdx
git reset --hard

# Reinstalar
npm install --legacy-peer-deps
bower install

# Restaurar cambios de jsPlumb
cp ~/backup/jsplumb.min.js app/libs/
# Editar app/index.html manualmente

# Reiniciar
npm start
```

### Verificar Integridad de Archivos

```bash
# Verificar tamaños de archivos críticos
ls -lh app/libs/jsplumb.min.js           # Debe ser ~211KB
ls -lh bower_components/bloqs/dist/bloqs.js  # Debe existir
ls -lh bower_components/angular/angular.js   # Debe existir

# Verificar checksums
md5sum app/libs/jsplumb.min.js
# Debe coincidir con: (valor del archivo original de CDN)
```

## Registro de Problemas para Análisis

Por favor, copia y pega los siguientes datos:

### 1. Errores en Console

```
[Pegar aquí cualquier error rojo de la consola]
```

### 2. Estado de jsPlumb

```javascript
// Ejecutar en consola y pegar resultado:
console.log('jsPlumb version:', window.jsPlumb?.version);
console.log('jsPlumb getInstance:', typeof window.jsPlumb?.getInstance);
```

### 3. Estado de bloqs

```javascript
// Ejecutar en consola y pegar resultado:
console.log('bloqs:', window.bloqs);
console.log('angular.module:', window.angular);
```

### 4. Network Status

```
Lista de archivos que NO cargaron (status != 200):
[Pegar aquí]
```

## Próximos Pasos

1. **Recopilar información de diagnóstico** usando los comandos de arriba
2. **Identificar el error específico** en la consola
3. **Aplicar la solución correspondiente**
4. **Probar funcionalidad completa**

---

**Creado:** 1 de diciembre de 2025  
**Última actualización:** 1 de diciembre de 2025  
**Estado:** 🔍 DIAGNÓSTICO EN PROGRESO
