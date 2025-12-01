# Solución: Ventana Vacía en Bitbloq Offline

## Problema Identificado

La aplicación se ejecuta pero muestra una ventana vacía. Los errores en consola indican:

```
Failed to load resource: net::ERR_FILE_NOT_FOUND - bloqs.js
d3.js: undefined is not iterable
Angular Error: Provider 'bloqs' must return a value from $get factory method
```

## Causa Raíz

El proyecto tiene **dependencias muy específicas** de versiones antiguas (Bower):
- **bloqs 0.27.3** - Librería personalizada de BQ para bloques
- **d3 3.5.2** - Las versiones modernas (7.x) tienen breaking changes
- **jsplumb 2.0.5** - Versión específica que ya no existe

Las versiones modernas de npm tienen estructuras de directorios diferentes y APIs incompatibles.

## Solución Recomendada

### Opción A: Usar Bower + Versiones Antiguas (RECOMENDADO para funcionalidad)

```bash
# 1. Instalar bower globalmente si no lo tienes
sudo npm install -g bower

# 2. Instalar dependencias de bower (versiones exactas del proyecto)
bower install

# 3. Revertir index.html a usar bower_components
# (Usar el backup: git checkout app/index.html o restaurar manualmente)

# 4. Ejecutar
npm start
```

### Opción B: Migración Completa (Requiere trabajo extenso)

Para usar solo npm, necesitas:

1. **Encontrar/compilar bloqs 0.27.3 para npm**
   - Es una librería personalizada de BQ
   - Posible solución: Copiar desde bower_components a un directorio local

2. **Downgrade de D3 a versión 3.x**
   ```bash
   npm install d3@3.5.17 --save
   ```

3. **Instalar versiones compatibles de otras librerías**
   ```bash
   npm install angular@1.4.9 --save
   npm install nvd3@1.8.3 --save
   ```

4. **Actualizar todos los paths en index.html**

## Solución Rápida (TEMPORAL)

He creado un script para intentar usar bower:

```bash
#!/bin/bash
# instalar_bower_deps.sh

echo "Instalando dependencias bower..."
bower install

echo "Restaurando index.html original..."
cp app/index.html app/index.html.npm-backup
git checkout app/index.html || echo "Usar backup manual"

echo "Listo. Ejecuta: npm start"
```

## Estado Actual del Proyecto

### ✅ Lo que funciona:
- Electron 31 modernizado
- APIs de Electron actualizadas
- Node.js 20 compatible
- Package.json actualizado
- Main.js modernizado

### ⚠️ Lo que necesita atención:
- Dependencias frontend con versiones específicas
- Bloqs library (librería propietaria de BQ)
- Compatibilidad de versiones de d3/nvd3
- Estructura de directorios de node_modules vs bower_components

## Recomendación Final

Para **usar la aplicación ahora mismo**:

1. **Instala bower y sus dependencias:**
   ```bash
   npm install -g bower  # puede requerir sudo
   bower install
   ```

2. **Revierte app/index.html al original:**
   ```bash
   git checkout app/index.html
   ```
   O manualmente cambia todas las rutas de `../node_modules/` a `../bower_components/`

3. **Ejecuta:**
   ```bash
   npm start
   ```

Para **migración completa a npm** (proyecto futuro):
- Requiere 2-3 días de trabajo
- Actualizar/reescribir librería bloqs
- Migrar código a d3 v7 (muchos cambios breaking)
- Probar extensivamente todas las funcionalidades

## Archivos de Referencia

- `app/index.html` (actual) - Configurado para node_modules
- `app/index.html.npm-backup` - Backup de versión npm
- `bower.json` - Definición de dependencias bower originales

## Comandos Útiles

```bash
# Ver qué instaló bower
ls bower_components/

# Ver estructura de bloqs
ls -R bower_components/bloqs/

# Probar con DevTools (ver errores)
# Ya está habilitado en main.js

# Revertir cambios
git checkout app/index.html
git checkout package.json
```

## Conclusión

La modernización de Electron y Node.js fue **exitosa**, pero las dependencias frontend requieren trabajo adicional debido a:
1. Librería propietaria (bloqs) no disponible en npm
2. Versiones específicas con breaking changes
3. Estructura del proyecto acoplada a Bower

**Solución inmediata:** Usar bower + dependencias originales
**Solución a largo plazo:** Migración completa del frontend (proyecto separado)

---

**Actualizado:** 1 de diciembre de 2025
