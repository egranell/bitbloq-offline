# Bitbloq Offline v2.0.0 🚀

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Electron](https://img.shields.io/badge/Electron-31.7.5-blue.svg)](https://www.electronjs.org/)
[![License](https://img.shields.io/badge/License-GPL--3.0-orange.svg)](LICENSE)

---

## 📌 Estado del Proyecto

> **✨ PROYECTO MODERNIZADO EN 2025**  
> Esta versión ha sido actualizada con tecnologías modernas (Electron 31, Node.js 20) y
> está completamente funcional. El proyecto original de BQ fue discontinuado en 2016,
> pero esta fork modernizada continúa el desarrollo.

---

## 🇪🇸 Español

### Descripción

**Bitbloq Offline** es una herramienta de [programación visual](https://es.wikipedia.org/wiki/Programaci%C3%B3n_visual) para [Arduino](https://www.arduino.cc/) basada en bloques. Permite crear programas de forma intuitiva sin necesidad de escribir código, ideal para educación y aprendizaje de programación.

### ✨ Características

- 🎨 **Programación visual** mediante bloques (similar a Scratch)
- 🔌 **Compatible** con Arduino UNO, Freaduino UNO, BQ ZUM
- 🤖 **Soporte** para robot ZOWI
- 💾 **Modo offline** completo - no requiere conexión a internet
- ⚡ **Modernizado** con Electron 31 y Node.js 20 (2025)
- 🐛 **Correcciones** de JSPlumb endpoints y gestión de conexiones

### 🖥️ Plataformas Soportadas

- **Linux**: Ubuntu 16.04+, Fedora 30+, Debian 10+
- **macOS**: 10.13 (High Sierra) o superior
- **Windows**: Windows 10/11 (64-bit)

### 📋 Requisitos

- **Node.js**: 18.x o 20.x LTS
- **npm**: 9.x o superior
- **Electron**: 31.7.5 (incluido)

### 🚀 Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/egranell/bitbloq-offline.git
cd bitbloq-offline

# Instalar dependencias
npm install

# Ejecutar la aplicación
npm start
```

### 🛠️ Comandos Disponibles

```bash
npm start              # Ejecutar aplicación
npm run dev            # Modo desarrollo con inspector
npm run build:sass     # Compilar estilos SCSS
npm run watch:sass     # Watch mode para SCSS
npm run lint           # Linter de código
```

### 📦 Compilar Ejecutables

```bash
# Para todas las plataformas
grunt dist

# Por plataforma específica
grunt build:windows    # Windows
grunt build:linux      # Linux 64-bit
grunt build:linux32    # Linux 32-bit
grunt build:mac        # macOS
grunt build:linuxArm   # Linux ARM
```

Los ejecutables se generarán en la carpeta `/dist/{os}/`.

### 🔧 Desarrollo

#### Estructura del Proyecto

```
bitbloq-offline/
├── app/                          # Aplicación principal
│   ├── fonts/                    # Fuentes
│   ├── images/                   # Imágenes y assets
│   ├── libs/                     # Librerías (JSPlumb)
│   ├── res/                      # Recursos (locales, web2board)
│   ├── scripts/                  # Código AngularJS
│   │   ├── controllers/         # Controladores
│   │   ├── directives/          # Directivas
│   │   ├── factories/           # Factories
│   │   └── services/            # Servicios
│   ├── styles/                   # Estilos SCSS
│   └── views/                    # Templates HTML
├── main.js                       # Entry point Electron
├── package.json                  # Dependencias npm
└── gruntfile.js                  # Configuración build
```

#### Tareas Grunt

```bash
grunt svgstore    # Genera sprite SVG desde iconos
grunt sass        # Compila SCSS a CSS
grunt watch       # Watch mode con recarga automática
```

### 📚 Documentación Técnica

- 📖 **[DOCUMENTACION_TECNICA.md](DOCUMENTACION_TECNICA.md)** - Arquitectura y detalles técnicos
- 🎯 **[PLAN_MEJORA_INTEGRAL.md](PLAN_MEJORA_INTEGRAL.md)** - Roadmap de mejoras y modernización
- ✅ **[MODERNIZACION_COMPLETADA.md](MODERNIZACION_COMPLETADA.md)** - Resumen de cambios realizados
- 🔧 **[SOLUCION_FINAL_CODIGO.md](SOLUCION_FINAL_CODIGO.md)** - Soluciones implementadas

### 🐛 Problemas Conocidos y Soluciones

Si la placa no es detectada:
1. Revisar [motherboard_troubleshooting.pdf](docs/motherboard_troubleshooting.pdf)
2. Instalar drivers desde la carpeta `drivers/` de la aplicación
3. Verificar permisos de acceso al puerto serie

### 🤝 Contribuir

Este es un proyecto Open Source. Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### 📄 Licencia

Este proyecto está licenciado bajo GPL-3.0 - ver [LICENSE](LICENSE) para detalles.

### 🏆 Créditos

**Proyecto original por BQ (2016):**
- Diego Segura
- Laura del Río
- Fernando del Olmo
- Tom Calvo
- Luis Antonio González

**Modernización 2025:**
- Actualización a Electron 31 y Node.js 20
- Corrección de JSPlumb endpoints
- Documentación técnica completa
- Plan de mejora integral

---

## 🇬🇧 English

### Description

**Bitbloq Offline** is a visual programming tool for Arduino based on blocks. It allows creating programs intuitively without writing code, ideal for education and learning programming.

### ✨ Features

- 🎨 **Visual programming** with blocks (Scratch-like)
- 🔌 **Compatible** with Arduino UNO, Freaduino UNO, BQ ZUM
- 🤖 **Support** for ZOWI robot
- 💾 **Fully offline** - no internet connection required
- ⚡ **Modernized** with Electron 31 and Node.js 20 (2025)
- 🐛 **Fixed** JSPlumb endpoints and connection management

### 🖥️ Supported Platforms

- **Linux**: Ubuntu 16.04+, Fedora 30+, Debian 10+
- **macOS**: 10.13 (High Sierra) or later
- **Windows**: Windows 10/11 (64-bit)

### 📋 Requirements

- **Node.js**: 18.x or 20.x LTS
- **npm**: 9.x or higher
- **Electron**: 31.7.5 (included)

### 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/egranell/bitbloq-offline.git
cd bitbloq-offline

# Install dependencies
npm install

# Run the application
npm start
```

### 🛠️ Available Commands

```bash
npm start              # Run application
npm run dev            # Development mode with inspector
npm run build:sass     # Compile SCSS styles
npm run watch:sass     # Watch mode for SCSS
npm run lint           # Code linter
```

### 📦 Building Executables

```bash
# For all platforms
grunt dist

# For specific platform
grunt build:windows    # Windows
grunt build:linux      # Linux 64-bit
grunt build:linux32    # Linux 32-bit
grunt build:mac        # macOS
grunt build:linuxArm   # Linux ARM
```

Executables will be generated in `/dist/{os}/` folder.

### 🔧 Development

#### Project Structure

```
bitbloq-offline/
├── app/                          # Main application
│   ├── fonts/                    # Fonts
│   ├── images/                   # Images and assets
│   ├── libs/                     # Libraries (JSPlumb)
│   ├── res/                      # Resources (locales, web2board)
│   ├── scripts/                  # AngularJS code
│   │   ├── controllers/         # Controllers
│   │   ├── directives/          # Directives
│   │   ├── factories/           # Factories
│   │   └── services/            # Services
│   ├── styles/                   # SCSS styles
│   └── views/                    # HTML templates
├── main.js                       # Electron entry point
├── package.json                  # npm dependencies
└── gruntfile.js                  # Build configuration
```

#### Grunt Tasks

```bash
grunt svgstore    # Generate SVG sprite from icons
grunt sass        # Compile SCSS to CSS
grunt watch       # Watch mode with auto-reload
```

### 📚 Technical Documentation

- 📖 **[DOCUMENTACION_TECNICA.md](DOCUMENTACION_TECNICA.md)** - Architecture and technical details
- 🎯 **[PLAN_MEJORA_INTEGRAL.md](PLAN_MEJORA_INTEGRAL.md)** - Improvement roadmap and modernization
- ✅ **[MODERNIZACION_COMPLETADA.md](MODERNIZACION_COMPLETADA.md)** - Summary of changes made
- 🔧 **[SOLUCION_FINAL_CODIGO.md](SOLUCION_FINAL_CODIGO.md)** - Implemented solutions

### 🐛 Known Issues and Solutions

If the board is not detected:
1. Review [motherboard_troubleshooting.pdf](docs/motherboard_troubleshooting.pdf)
2. Install drivers from application's `drivers/` folder
3. Verify serial port access permissions

### 🤝 Contributing

This is an Open Source project. Contributions are welcome:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📄 License

This project is licensed under GPL-3.0 - see [LICENSE](LICENSE) for details.

### 🏆 Credits

**Original project by BQ (2016):**
- Diego Segura
- Laura del Río
- Fernando del Olmo
- Tom Calvo
- Luis Antonio González

**2025 Modernization:**
- Updated to Electron 31 and Node.js 20
- Fixed JSPlumb endpoints
- Complete technical documentation
- Comprehensive improvement plan

---

## 🔗 Links

- 🌐 **Original project**: [bitbloq.bq.com](http://bitbloq.bq.com)
- 📦 **Releases**: [GitHub Releases](https://github.com/egranell/bitbloq-offline/releases)
- 🐛 **Issues**: [GitHub Issues](https://github.com/egranell/bitbloq-offline/issues)
- 📖 **Wiki**: [Project Wiki](https://github.com/egranell/bitbloq-offline/wiki)

---

## 📊 Version History

### v2.0.0 (2025) - Modernization Release
- ✨ Updated to Electron 31.7.5
- ✨ Updated to Node.js 20.x LTS
- ✨ Updated all npm dependencies
- 🐛 Fixed JSPlumb endpoints rendering
- 🐛 Fixed connection management
- 📚 Added comprehensive technical documentation
- 📋 Created improvement roadmap

### v1.2.3 (2016) - Original BQ Release
- 🎉 Initial release by BQ
- 🎨 Visual programming with blocks
- 🔌 Arduino UNO, Freaduino UNO, BQ ZUM support
- 🤖 ZOWI robot support

---

**Made with ❤️ for education and learning**
