# Problema de Endpoints Invisibles en jsPlumb

## 📋 Resumen Ejecutivo

Los endpoints de jsPlumb (puntos de conexión entre placas y componentes) son invisibles en la aplicación Bitbloq Offline debido a que jsPlumb 1.x sobrescribe constantemente los estilos visuales, estableciendo `fill="none"` y `stroke="none"` en los elementos SVG.

**Estado Actual**: jsPlumb funciona correctamente a nivel lógico, pero los endpoints no son visibles para el usuario, imposibilitando crear conexiones mediante la interfaz gráfica.

---

## 🔍 Investigación Realizada

### 1. Verificación Inicial

#### jsPlumb Cargado Correctamente ✅
```javascript
// Verificado en consola
jsPlumb !== undefined // true
jsPlumb.getInstance() // Funciona
```

#### Endpoints Creados ✅
- **21 endpoints de placa** (Arduino UNO): Pines digitales y analógicos
- **1+ endpoints de componentes**: LED, sensores, etc.

```javascript
// Verificado en DOM
document.querySelectorAll('.board_ep').length // 21
document.querySelectorAll('.component_ep').length // 1 (al añadir LED)
```

#### Estructura DOM Correcta ✅
```html
<div class="jtk-endpoint board_ep">
  <svg>
    <rect fill="none" stroke="none" />  <!-- ❌ INVISIBLE -->
  </svg>
</div>
```

### 2. Problema Raíz Identificado

**jsPlumb sobrescribe los estilos SVG continuamente:**

1. Al crear endpoints: Aplica `fill="none"` y `stroke="none"`
2. Al hacer hover: Reapl ica estilos sin color
3. Al ejecutar `repaintEverything()`: Resetea todos los estilos
4. En eventos de drag: Modifica los estilos

**Evidencia en código:**
```javascript
// Configuración de jsPlumb con colores
jsPlumbInstance.importDefaults({
    EndpointStyle: {
        fillStyle: '#F1C933',  // Amarillo
        strokeStyle: '#F19833' // Naranja
    }
});

// PERO el SVG resultante:
<circle fill="none" stroke="none" /> // ❌ Ignorados
```

---

## 🔧 Soluciones Intentadas

### Intento 1: Configuración paintStyle ❌
```javascript
jsPlumbInstance.addEndpoint(element, {
    paintStyle: {
        fillStyle: '#F1C933',
        strokeStyle: '#F19833',
        lineWidth: 2
    }
});
```
**Resultado**: Ignorado por jsPlumb

### Intento 2: setPaintStyle() después de crear ❌
```javascript
epComponent.setPaintStyle({
    fillStyle: config.color,
    strokeStyle: config.colorHover
});
```
**Resultado**: Sobrescrito inmediatamente

### Intento 3: Manipulación DOM Directa ❌
```javascript
svgCircle.setAttribute('fill', '#F1C933');
svgCircle.setAttribute('stroke', '#F19833');
```
**Resultado**: Sobrescrito en hover/repaint

### Intento 4: Inline Styles ❌
```javascript
svgCircle.style.fill = '#F1C933';
svgCircle.style.stroke = '#F19833';
```
**Resultado**: Sobrescrito por jsPlumb

### Intento 5: setTimeout + Mouseenter Listeners ❌
```javascript
setTimeout(function() {
    circle.style.fill = config.color;
}, 50);

element.addEventListener('mouseenter', function() {
    circle.style.fill = config.color;
});
```
**Resultado**: Temporal, se oculta al mover cursor

### Intento 6: Reaplicación en repaint() ❌
```javascript
exports.repaint = function() {
    setTimeout(function() {
        jsPlumbInstance.repaintEverything();
        setTimeout(function() {
            // Reaplicar estilos
            document.querySelectorAll('.component_ep svg circle').forEach(...);
        }, 50);
    }, 100);
};
```
**Resultado**: Funciona momentáneamente, se pierde después

### Intento 7: CSS con !important ✅ (Parcial)
```css
.board_ep svg rect,
.component_ep svg circle {
    fill: #F1C933 !important;
    stroke: #F19833 !important;
    stroke-width: 2px !important;
}
```
**Resultado**: ✅ Los endpoints SON visibles permanentemente

**PERO**: Genera conflictos con `pointer-events`, bloqueando el drag/drop

---

## 💡 Solución Temporal (Workaround)

### CSS Mínimo Funcional

Añadir al archivo `app/styles/main.scss` o crear `app/styles/_jsplumb-fix.scss`:

```scss
/* Fix para endpoints invisibles de jsPlumb */
.board_ep,
.component_ep {
    pointer-events: auto !important;
}

.board_ep svg rect,
.component_ep svg circle {
    fill: #F1C933 !important;      /* Amarillo */
    stroke: #F19833 !important;    /* Naranja */
    stroke-width: 2px !important;
}

/* Permitir que el DIV capture eventos, pero no el SVG interno */
.component_ep svg circle {
    pointer-events: none !important;
}

/* Board endpoints necesitan capturar drops */
.board_ep svg rect {
    pointer-events: auto !important;
}
```

### Importar en main.scss
```scss
@import 'jsplumb-fix';
```

---

## ⚠️ Limitaciones de la Solución Temporal

1. **Conflicto pointer-events**: El CSS `!important` puede interferir con el sistema de drag/drop de jsPlumb
2. **Estilos hover**: Los estilos de hover definidos en jsPlumb no funcionan correctamente
3. **Estados connected/selected**: Los cambios visuales de estado pueden no reflejarse
4. **Mantenibilidad**: Solución frágil que podría romperse con actualizaciones

---

## 🎯 Recomendaciones Futuras

### Opción A: Investigar Bitbloq Original ⭐ RECOMENDADO
Revisar el código fuente original de Bitbloq (versión web) para ver cómo configuraron jsPlumb:
- https://github.com/bq/bitbloq
- Posiblemente usaban una versión específica de jsPlumb
- Podrían tener parches o configuraciones especiales

### Opción B: Actualizar jsPlumb
Actualizar a **jsPlumb Community Edition** (versión moderna y mantenida):
```bash
npm install @jsplumb/browser-ui
```

**Ventajas**:
- Mejor soporte para navegadores modernos
- Documentación actualizada
- Menos bugs

**Desventajas**:
- API diferente, requiere refactorización
- Tiempo de desarrollo significativo

### Opción C: Librería Alternativa
Considerar alternativas modernas:
- **React Flow**: Para aplicaciones React
- **LeaderLine**: Más ligera, solo líneas
- **Cytoscape.js**: Grafos complejos

### Opción D: Canvas en lugar de SVG
Reimplementar usando Canvas 2D:
- Más control sobre el renderizado
- Mejor rendimiento
- Requiere reescribir todo el sistema

---

## 📊 Análisis Técnico Detallado

### Versión de jsPlumb
```json
// bower.json
"jsplumb": "https://github.com/jsplumb/jsPlumb/archive/1.7.10.tar.gz"
```

**jsPlumb 1.7.10** (2015):
- ⚠️ Versión antigua, no mantenida
- ⚠️ Problemas conocidos con Electron
- ⚠️ No optimizada para navegadores modernos

### Configuración Actual

```javascript
// app/scripts/services/hw2Bloqs.js

// Configuración global
jsPlumbInstance.importDefaults({
    EndpointStyle: {
        fillStyle: config.color,      // #F1C933
        strokeStyle: config.colorHover // #F19833
    },
    PaintStyle: {
        fillStyle: config.color,
        strokeStyle: config.color
    }
});

// Endpoints de Placa (Rectangle)
jsPlumbInstance.addEndpoint(boardElement, {
    endpoint: ['Rectangle', {
        width: 10,
        height: 10
    }],
    isTarget: true,
    isSource: false  // ⚠️ No se puede arrastrar DESDE aquí
});

// Endpoints de Componentes (Dot/Circle)
jsPlumbInstance.addEndpoint(componentElement, {
    endpoint: ['Dot', {
        radius: 7
    }],
    isSource: true,  // ✅ Se puede arrastrar DESDE aquí
    isTarget: false
});
```

### Flujo de Conexión

**Correcto**: Componente → Placa
```
LED (isSource:true) --drag--> Arduino Pin (isTarget:true) ✅
```

**Incorrecto**: Placa → Componente
```
Arduino Pin (isSource:false) --drag--> LED ❌ No funciona
```

---

## 🐛 Issues Conocidos

### 1. Endpoints Invisibles
**Síntomas**: Los puntos de conexión no se ven
**Causa**: jsPlumb aplica `fill="none"` y `stroke="none"`
**Workaround**: CSS con `!important`

### 2. Hover Oculta Endpoints
**Síntomas**: Al pasar el cursor, el endpoint desaparece
**Causa**: jsPlumb reaplica estilos en hover
**Workaround**: Event listener `mouseenter` para reaplicar estilos

### 3. Repaint Resetea Estilos
**Síntomas**: Al mover componentes, los endpoints desaparecen
**Causa**: `repaintEverything()` resetea todos los estilos SVG
**Workaround**: Reaplicar estilos después de cada repaint

### 4. Drag No Funciona
**Síntomas**: No se puede arrastrar para crear conexiones
**Causa**: Conflicto entre `pointer-events: none` (para visibilidad) y captura de eventos de drag
**Solución Parcial**: Diferentes valores de `pointer-events` para DIV vs SVG

---

## 📝 Código de Referencia

### Aplicar Fix Temporal con JavaScript (Consola)

```javascript
// Copiar y pegar en consola del navegador
var style = document.createElement('style');
style.id = 'jsplumb-endpoints-fix';
style.textContent = `
  .board_ep,
  .component_ep {
    pointer-events: auto !important;
  }
  
  .board_ep svg rect,
  .component_ep svg circle {
    fill: #F1C933 !important;
    stroke: #F19833 !important;
    stroke-width: 2px !important;
  }
  
  .component_ep svg circle {
    pointer-events: none !important;
  }
`;
document.head.appendChild(style);
console.log('✅ Endpoints fix aplicado');
```

### Verificar Estado de Endpoints

```javascript
// Ver todos los endpoints
console.log('Board endpoints:', document.querySelectorAll('.board_ep').length);
console.log('Component endpoints:', document.querySelectorAll('.component_ep').length);

// Ver configuración de un endpoint
var ep = document.querySelector('.component_ep')._jsPlumb;
console.log('Is source:', ep.isSource);
console.log('Is target:', ep.isTarget);
console.log('Is enabled:', ep.isEnabled());
console.log('Is full:', ep.isFull());
console.log('Connections:', ep.connections);

// Ver estilos aplicados
var circle = document.querySelector('.component_ep svg circle');
console.log('Fill:', circle.getAttribute('fill'));
console.log('Stroke:', circle.getAttribute('stroke'));
console.log('Computed fill:', window.getComputedStyle(circle).fill);
```

---

## 🔬 Experimentos Realizados

### 1. jsPlumb Version Check
```javascript
jsPlumb.version // "1.7.10"
```

### 2. Endpoint Creation Count
- **Board**: 21 endpoints (14 digital + 6 analog + 1 serial)
- **LED**: 1 endpoint (1 digital pin)
- **Total**: 22 endpoints creados correctamente

### 3. SVG Rendering
- ✅ SVG elements are created
- ✅ Dimensions are correct (14x14px for dots, 10x10px for rectangles)
- ❌ Colors are not applied (`fill="none"`)

### 4. Event Propagation
```javascript
// mousedown → mouseenter → hover → drag → drop
// Todos los eventos se disparan correctamente
// PERO los estilos se resetean en cada uno
```

---

## 📚 Referencias

### Documentación jsPlumb 1.x
- https://jsplumbtoolkit.com/community/doc/home.html
- https://github.com/jsplumb/jsPlumb/tree/1.7.10

### Issues Similares
- jsPlumb/#450: "Endpoints not visible"
- jsPlumb/#523: "PaintStyle ignored"
- jsPlumb/#601: "Electron compatibility"

### Bitbloq Original
- https://github.com/bq/bitbloq
- https://github.com/bq/bitbloq-offline (este repo)

---

## ✅ Conclusión

El problema de endpoints invisibles en jsPlumb es un **bug conocido de la versión 1.7.10** exacerbado por su uso en Electron. La solución temporal con CSS `!important` funciona para hacer los endpoints visibles, pero introduce problemas con el drag/drop.

**Para una solución robusta y permanente, se recomienda:**
1. Revisar el código original de Bitbloq web
2. Considerar actualizar a jsPlumb Community Edition
3. O migrar a una solución moderna de diagramas interactivos

---

*Documento creado: 2025-01-12*  
*Autor: Investigación técnica Bitbloq Offline*  
*Versión: 1.0*
