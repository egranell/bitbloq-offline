# Documentación Técnica - Bitbloq Offline

## Información del Proyecto

**Estado:** ⚠️ PROYECTO DISCONTINUADO - No recibirá soporte adicional

**Versión:** 1.2.3  
**Licencia:** GPL-3.0  
**Repositorio:** https://github.com/bq/bitbloq-offline

## Descripción

Bitbloq Offline es una aplicación de escritorio multiplataforma que permite programar visualmente placas Arduino sin necesidad de conexión a internet. Es la versión offline del proyecto web [Bitbloq](http://bitbloq.bq.com).

## Stack Tecnológico

### Frontend
- **Angular 1.4.9** - Framework principal
- **AngularJS Módulos:**
  - angular-route (1.4.9)
  - angular-websocket (1.0.14)
  - angular-clipboard (1.2.1)
  - angular-sanitize (1.3.20)
  - angular-translate (2.9.0)
  - angular-nvd3 (^1.0.7)
- **jQuery 2.2.0**
- **Bloqs ^0.27.3** - Librería para programación por bloques
- **JSPlumb 2.0.5** - Para conectores visuales
- **Lodash 3.10.1** - Utilidades JavaScript
- **D3.js 3.5.2** & **NVD3 ^1.8.3** - Gráficos y visualización de datos
- **Prism 1.4.1** - Syntax highlighting
- **ng-dialog 0.5.8** - Diálogos modales

### Backend/Desktop
- **Electron 0.36.7** (prebuilt) - Framework para aplicaciones de escritorio
- **Node.js** - Runtime
- **WebSockets (ws 1.0.1)** - Comunicación en tiempo real

### Build Tools
- **Grunt 0.4.5** - Task runner
- **Grunt plugins:**
  - grunt-sass (1.1.0) - Compilación SCSS
  - grunt-svgstore (0.5.0) - Generación de sprites SVG
  - grunt-contrib-watch (0.6.1) - Watch de archivos
  - grunt-contrib-copy (0.8.2) - Copia de archivos
  - grunt-contrib-clean (0.7.0) - Limpieza de directorios
  - grunt-contrib-jshint (^1.0.0) - Linting de código
  - grunt-wiredep (2.0.0) - Inyección de dependencias
- **Bower** - Gestor de dependencias frontend
- **npm** - Gestor de dependencias Node.js

### Herramientas de Análisis
- **Universal Analytics ^0.3.11** - Telemetría
- **JSHint** - Linter JavaScript con configuración en `.jshintrc`

## Arquitectura del Proyecto

```
bitbloq-offline/
├── app/                           # Aplicación principal
│   ├── fonts/                     # Fuentes tipográficas (Roboto)
│   ├── images/                    # Recursos gráficos
│   │   ├── boards/               # Imágenes de placas Arduino
│   │   ├── components/           # Imágenes de componentes electrónicos
│   │   ├── icons/                # Iconos SVG para sprite
│   │   └── robots/               # Imágenes de robots (ej: ZOWI)
│   ├── res/                       # Recursos compartidos
│   │   ├── hw.json               # Configuración de hardware
│   │   ├── properties.json       # Propiedades del proyecto
│   │   ├── locales/              # Traducciones i18n
│   │   ├── menus/                # Definición de menús
│   │   └── web2board/            # Aplicación anidada Web2Board
│   ├── scripts/                   # Código Angular
│   │   ├── app.js                # Configuración principal Angular
│   │   ├── WSHubsApi.js          # API WebSocket
│   │   ├── controllers/          # Controladores Angular
│   │   ├── directives/           # Directivas Angular
│   │   ├── factories/            # Factories Angular
│   │   └── services/             # Servicios Angular
│   ├── styles/                    # Estilos SCSS
│   │   ├── main.scss             # Archivo principal SCSS
│   │   ├── main.css              # CSS compilado
│   │   ├── _fonts.scss           # Definiciones de fuentes
│   │   ├── _global.scss          # Estilos globales
│   │   ├── _layout.scss          # Layout principal
│   │   ├── _reset.scss           # Reset CSS
│   │   ├── _variables.scss       # Variables SCSS
│   │   ├── components/           # Estilos de componentes
│   │   └── views/                # Estilos de vistas
│   ├── views/                     # Templates HTML
│   │   ├── components/           # Componentes reutilizables
│   │   ├── modals/               # Diálogos modales
│   │   ├── bloqs-project.html    # Vista principal de proyecto
│   │   ├── hardware-tab.html     # Pestaña de hardware
│   │   ├── software-tab.html     # Pestaña de software
│   │   └── ...
│   └── index.html                 # HTML principal de la app
├── res/                           # Recursos para distribución
│   ├── linux-prebuilt/           # Binarios precompilados Linux x64
│   ├── linux32-prebuilt/         # Binarios precompilados Linux x86
│   ├── linuxArm-prebuilt/        # Binarios precompilados Linux ARM
│   ├── mac-prebuilt/             # Binarios precompilados macOS
│   ├── windows32-prebuilt/       # Binarios precompilados Windows
│   └── buildWindowsExe/          # Herramientas build Windows
├── docs/                          # Documentación
│   ├── motherboard_troubleshooting.pdf
│   └── onlineVSoffline.jpg
├── tasks/                         # Tareas Grunt personalizadas
│   └── poeditor.js               # Integración con POEditor
├── main.js                        # Punto de entrada Electron
├── package.json                   # Dependencias npm
├── bower.json                     # Dependencias bower
├── gruntfile.js                   # Configuración Grunt
├── .jshintrc                      # Configuración JSHint
├── .scss-lint.yml                 # Configuración linter SCSS
├── .travis.yml                    # Configuración CI Travis
└── LICENSE                        # Licencia GPL-3.0
```

## Hardware Soportado

### Placas de Arduino
- Arduino UNO
- Freaduino UNO
- BQ ZUM
- Arduino Nano (168)

### Robots
- ZOWI

## Plataformas Soportadas

- **Linux:** Ubuntu 12.04+, Fedora 21, Debian 8
- **macOS:** 10.9 o superior
- **Windows:** 7 y superior (32 y 64 bits, ARM no soportado)

## Configuración del Proyecto

### main.js (Electron)
```javascript
- Ventana principal: 1440x800 (mínimo 800x600)
- Crash Reporter: Desactivado (autoSubmit: false)
- DevTools: Comentado por defecto
- Título: "Bitbloq Offline v{version}"
```

### Configuración de Build (Gruntfile)

#### Tareas Disponibles

```bash
# Desarrollo
grunt watch          # Observa cambios y recarga automáticamente
grunt sass           # Compila archivos SCSS a CSS
grunt svgstore       # Genera sprite SVG desde iconos
grunt jshint         # Analiza código JavaScript

# Build para distribución
grunt dist           # Construye para todas las plataformas
grunt build:windows  # Solo Windows
grunt build:mac      # Solo macOS
grunt build:linux    # Solo Linux x64
grunt build:linux32  # Solo Linux x86
grunt build:linuxArm # Solo Linux ARM

# Internacionalización
grunt i18n           # Descarga traducciones de POEditor
```

## Instalación y Desarrollo

### Requisitos Previos

1. **Node.js** (recomendado: versión 4.x - 6.x por compatibilidad con Electron 0.36.7)
2. **npm** (incluido con Node.js)
3. **Bower** (instalable globalmente: `npm install -g bower`)
4. **Git**

### Instalación de Dependencias

```bash
# Clonar el repositorio
git clone https://github.com/bq/bitbloq-offline.git
cd bitbloq-offline

# Instalar dependencias npm (incluye postinstall que ejecuta bower)
npm install

# O manualmente:
npm install
bower install
```

### Ejecutar en Desarrollo

```bash
# Método 1: Usando npm/electron directamente
npm start
# o
electron .

# Método 2: Usando Grunt con watch
grunt watch
```

### Compilar y Ejecutar Estilos

```bash
# Compilar SCSS a CSS
grunt sass

# Generar sprite de iconos SVG
grunt svgstore
```

### Build para Producción

```bash
# Build completo (todas las plataformas)
grunt dist

# Build específico
grunt build:windows   # Salida: dist/BitbloqOffline-windows/
grunt build:mac       # Salida: dist/BitbloqOffline-mac/
grunt build:linux     # Salida: dist/BitbloqOffline-linux/
```

## Estructura de Comunicación

### WebSocket Hub API (WSHubsApi.js)

La aplicación utiliza un sistema de comunicación basado en WebSockets para comunicarse con web2board:

```javascript
- Protocolo: WebSocket (ws://)
- Patrón: Hub API con callbacks y futures
- Timeout configurable del servidor
- Sistema de reconexión automática
- Mensajes estructurados por hub y función
```

## Componentes Principales

### Angular App Structure

```javascript
// app.js
- Configuración de módulos Angular
- Routing configuration
- Inicialización de servicios

// Controllers
- Control de lógica de vistas
- Gestión de estado de la aplicación

// Directives
- Componentes reutilizables
- Manipulación DOM específica

// Services
- Lógica de negocio
- Comunicación con APIs
- Gestión de estado global

// Factories
- Creación de objetos
- Utilidades compartidas
```

## Internacionalización (i18n)

- Sistema: angular-translate
- Carga: Static files loader
- Ubicación: `app/res/locales/`
- Integración: POEditor (Proyecto ID: 38967)
- Comando: `grunt i18n`

## Testing y Quality Assurance

### JSHint Configuration
- Configuración en `.jshintrc`
- Reporter: jshint-stylish
- Ejecutar: `npm test` o `grunt jshint`

### Travis CI
- Configuración en `.travis.yml`
- Ejecución automática de tests en commits

## Drivers de Hardware

Los drivers necesarios para las placas se encuentran en:
- `res/linux-prebuilt/drivers/`
- `res/mac-prebuilt/drivers/`
- `res/windows32-prebuilt/drivers/`

**Importante:** Los usuarios deben instalar los drivers manualmente después de descomprimir la aplicación.

## Web2Board Integration

Web2Board es una aplicación anidada que maneja la comunicación con las placas Arduino:

- Ubicación: `app/res/web2board/`
- Plataformas específicas: win32, linux, linux32, darwin, linuxArm
- Configuración: `web2board-config.json`
- Logs: Generados en tiempo de ejecución (excluidos del build)

## Notas de Desarrollo

### Versiones Antiguas
⚠️ Este proyecto usa versiones antiguas de las dependencias:
- Electron 0.36.7 (actual: 20+)
- Angular 1.4.9 (actual: Angular 17+)
- Node.js compatible: 4.x - 6.x

### Problemas Conocidos
1. **Compatibilidad Node.js:** Puede requerir versiones antiguas de Node.js
2. **Electron deprecado:** API puede haber cambiado significativamente
3. **Bower deprecado:** Considerar migrar a npm/yarn
4. **Python en macOS:** Requiere configuración específica del enlace simbólico

### Recomendaciones de Migración
Si se desea modernizar el proyecto:
1. Actualizar a Electron moderno (requiere cambios en API)
2. Migrar de Bower a npm/yarn
3. Actualizar Angular a versión moderna o migrar a framework actual
4. Actualizar todas las dependencias a versiones seguras
5. Reemplazar Grunt por Webpack/Vite

## Recursos Adicionales

### Enlaces
- Versión Online: http://bitbloq.bq.com
- Repositorio GitHub: https://github.com/bq/bitbloq-offline
- Documentación Arduino: https://www.arduino.cc
- Electron Docs: https://www.electronjs.org/docs

### Soporte
⚠️ El proyecto está discontinuado. No hay soporte oficial disponible.

Para consultas históricas:
- Email: soporte.bitbloq@bq.com (posiblemente inactivo)

### Troubleshooting
- [Guía de resolución de problemas de placa](docs/motherboard_troubleshooting.pdf)

## Licencia

GPL-3.0 - Ver archivo LICENSE para más detalles

## Contribuidores

- Diego Segura <diego.segura@bq.com>
- Laura del Río <laura.delrio@bq.com>
- Fernando del Olmo <fernando.delolmo@bq.com>
- Tom Calvo <tomas.calvo@bq.com>
- Luis Antonio Gonzalez <luisantonio.gonzalez@bq.com>

---

**Última actualización:** Enero 2025  
**Versión de la documentación:** 1.0
