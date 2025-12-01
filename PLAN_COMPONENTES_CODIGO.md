# Plan: Solucionar Problema de Componentes que No Aparecen en Código

## Objetivo
Hacer que los componentes añadidos al hardware se reflejen correctamente en el código generado.

## Plan de Acción

### FASE 1: Investigación y Diagnóstico
- [x] Identificar archivos relevantes para generación de código
- [ ] Analizar flujo de datos: Hardware → Código
- [ ] Verificar servicios bloqs y hw2Bloqs
- [ ] Revisar controladores softwareTab y hardwareTab
- [ ] Identificar punto de ruptura

### FASE 2: Análisis de Código
- [ ] Examinar hw2Bloqs.js (conversión hardware → bloqs)
- [ ] Examinar bloqs.factory.js
- [ ] Examinar softwareTab.js (generador de código)
- [ ] Verificar comunicación entre tabs

### FASE 3: Solución
- [ ] Aplicar fixes identificados
- [ ] Verificar integración
- [ ] Probar funcionalidad completa

## Archivos Críticos Identificados

### Servicios
- `app/scripts/services/hw2Bloqs.js` - Convierte hardware a bloqs
- `app/scripts/services/common.js` - Estado compartido
- `app/scripts/services/utils.js` - Utilidades

### Factories
- `app/scripts/factories/bloqs.factory.js` - Gestión de bloqs
- `app/scripts/factories/node.factory.js` - Nodos del proyecto

### Controladores  
- `app/scripts/controllers/hardwareTab.js` - Gestión de hardware
- `app/scripts/controllers/softwareTab.js` - Generación de código
- `app/scripts/controllers/bloqsProject.js` - Proyecto global

## Estado: EN EJECUCIÓN
