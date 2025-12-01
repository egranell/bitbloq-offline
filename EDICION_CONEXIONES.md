# Sistema de Edición de Conexiones en Bitbloq Offline

## Resumen

El sistema de conexiones en Bitbloq Offline utiliza la biblioteca **jsPlumb** para crear conexiones visuales entre los pines de las placas (Arduino UNO, bq ZUM, etc.) y los componentes (LEDs, sensores, servos, etc.). La edición de estas conexiones se realiza mediante interacciones visuales drag-and-drop.

## Arquitectura del Sistema

### 1. Componentes Principales

#### **hw.json** (`app/res/hw.json`)
Define la estructura de hardware:
- **boards**: Lista de placas con sus pines (digital, analog, serial)
- **components**: Lista de componentes organizados por categorías
- Cada pin tiene:
  - `x`, `y`: Posición relativa (0-1) en la placa/componente
  - `name`: Nombre del pin (ej: "13", "A0", "serial")
  - `uid`: Identificador único

#### **hw2Bloqs.js** (`app/scripts/services/hw2Bloqs.js`)
Servicio que gestiona las conexiones usando jsPlumb:
- Crea endpoints (puntos de conexión) en placas y componentes
- Gestiona la creación/eliminación de conexiones
- Maneja eventos de conexión/desconexión
- Guarda/carga el esquema de conexiones

#### **hardwareTab.js** (`app/scripts/controllers/hardwareTab.js`)
Controlador que coordina la interfaz de usuario:
- Maneja el drag & drop de componentes
- Procesa eventos de conexión
- Actualiza el modelo de datos del proyecto
- Gestiona la selección de elementos

## Cómo se Editan las Conexiones

### 2. Crear una Conexión

#### Proceso Visual (Usuario):
1. El usuario arrastra desde un **endpoint** de un componente (punto de origen)
2. Suelta sobre un **endpoint** de la placa (punto de destino)
3. jsPlumb crea la conexión visual automáticamente

#### Proceso Técnico:

```javascript
// En hw2Bloqs.js - Cuando se conecta
jsPlumbInstance.bind('connection', function(connection) {
    // 1. Marca los endpoints como conectados
    connection.targetEndpoint.setType('connected');
    connection.sourceEndpoint.setType('connected');
    
    // 2. Guarda los UIDs de los endpoints
    connection.connection.setParameters({
        pinSourceUid: connection.sourceEndpoint.getUuid(),
        pinTargetUid: connection.targetEndpoint.getUuid()
    });
    
    // 3. Crea datos de la conexión
    var pinAssignation = {};
    pinAssignation[connection.sourceEndpoint.getParameter('pinComponent')] = 
        connection.targetEndpoint.getParameter('pinBoard');
    
    // 4. Dispara evento personalizado
    connectionEvent.componentData = {
        uid: connection.source.dataset.uid,
        pin: pinAssignation
    };
    connectionEvent.protoBoLaAction = 'attach';
    containerDefault.dispatchEvent(connectionEvent);
});
```

#### En hardwareTab.js - Procesamiento del Evento:

```javascript
var connectionEventHandler = function(e) {
    // Busca el componente en el proyecto
    componentReference = _.find($scope.project.hardware.components, {
        'uid': e.componentData.uid
    });
    
    if (e.protoBoLaAction === 'attach') {
        // Asigna el pin al componente
        pinKey = Object.keys(e.componentData.pin)[0];
        componentReference.pin[pinKey] = e.componentData.pin[pinKey];
        
        // Marca como conectado
        componentReference.connected = true;
        
        // Actualiza la interfaz
        $scope.refreshComponentsArray();
    }
};
```

### 3. Eliminar una Conexión

#### Formas de Eliminar:

**A) Arrastrar la conexión existente a otro pin:**
```javascript
// jsPlumb automáticamente desconecta del pin anterior
// y conecta al nuevo pin
```

**B) Hacer clic en una conexión y presionar Delete/Backspace:**
```javascript
// En hardwareTab.js
$scope.onHwKeyPress = function($event) {
    if ($event.which === 46 || $event.which === 8) { // Supr o Backspace
        if (!$scope.componentSelected) {
            hw2Bloqs.removeSelectedConnection();
        }
    }
};

// En hw2Bloqs.js
exports.removeSelectedConnection = function() {
    jsPlumbInstance.getAllConnections().forEach(function(con) {
        if (con.hasType('selected')) {
            jsPlumbInstance.detach(con);
        }
    });
};
```

**C) Desconectar un componente completo:**
```javascript
// Desde el menú contextual o programáticamente
$scope.disconnectComponent = function(component) {
    hw2Bloqs.disconnectComponent(component);
    $scope.refreshComponentsArray();
};

// En hw2Bloqs.js
exports.disconnectComponent = function(component) {
    var el = document.querySelector('[data-uid="' + component.uid + '"]');
    jsPlumbInstance.select({ source: el.id }).detach();
};
```

#### Proceso de Desconexión:

```javascript
jsPlumbInstance.bind('connectionDetached', function(connection) {
    // 1. Remueve el tipo 'connected' de los endpoints
    connection.targetEndpoint.removeType('connected');
    connection.sourceEndpoint.removeType('connected');
    
    // 2. Limpia la asignación de pin
    var pinAssignation = {};
    pinAssignation[connection.sourceEndpoint.getParameter('pinComponent')] = undefined;
    
    // 3. Dispara evento de desconexión
    connectionEvent.protoBoLaAction = 'detach';
    connectionEvent.componentData = {
        uid: connection.source.dataset.uid,
        pin: pinAssignation
    };
    containerDefault.dispatchEvent(connectionEvent);
});
```

### 4. Seleccionar una Conexión

Las conexiones se pueden seleccionar para editarlas o eliminarlas:

```javascript
// Click en una conexión
connection.connection.bind('click', function(c) {
    exports.unselectAllConnections();
    _selectConnection(c);
});

function _selectConnection(element) {
    // Cambia el estilo visual
    element.setType('selected');
    element.canvas.classList.add('selected');
    
    // Marca los endpoints
    element.endpoints.forEach(function(ep) {
        ep.setType('selected');
        ep.canvas.classList.add('selected');
    });
}
```

## Estructura de Datos

### Configuración de un Pin en hw.json:

```json
{
    "x": 0.478,        // Posición X relativa (0-1)
    "y": 0.098,        // Posición Y relativa (0-1)
    "name": "13",      // Nombre del pin
    "uid": "6be0dd9d-2e52-4b7d-9dfc-c9edad53ad01"  // ID único
}
```

### Datos del Componente en el Proyecto:

```javascript
{
    uid: "unique-id",
    id: "led",
    name: "led_0",
    category: "leds",
    coordinates: { x: 50, y: 50 },
    pin: {
        s: "13"  // El pin 's' del LED está conectado al pin '13' de la placa
    },
    connected: true,
    endpoints: {
        s: {
            type: "digital",
            uid: "endpoint-uid"
        }
    }
}
```

### Datos de Conexión Guardados:

```javascript
{
    connections: [
        {
            pinSourceUid: "endpoint-component-uid",  // UID del endpoint del componente
            pinTargetUid: "endpoint-board-uid"       // UID del endpoint de la placa
        }
    ]
}
```

## Funciones Clave de la API

### hw2Bloqs Service:

| Función | Descripción |
|---------|-------------|
| `initialize(container, boardId, robotId)` | Inicializa jsPlumb en el contenedor |
| `addBoard(board)` | Añade una placa y crea sus endpoints |
| `addComponent(component)` | Añade un componente y crea sus endpoints |
| `disconnectComponent(component)` | Desconecta todos los pines de un componente |
| `disconnectAllComponents()` | Desconecta todos los componentes de la placa |
| `removeSelectedConnection()` | Elimina la conexión seleccionada |
| `loadSchema(schema)` | Carga un esquema completo con componentes y conexiones |
| `saveSchema()` | Guarda el esquema actual en formato JSON |
| `repaint()` | Redibuja todas las conexiones |

### Eventos Personalizados:

```javascript
// Evento disparado cuando se conecta/desconecta
container.addEventListener('connectionEvent', function(e) {
    // e.componentData: Datos del componente y pin
    // e.protoBoLaAction: 'attach' o 'detach'
});
```

## Configuración de jsPlumb

### Estilos de Conexión:

```javascript
jsPlumbInstance.importDefaults({
    Connector: ['Flowchart', {
        cornerRadius: 5,
        stub: [10, 40],
        gap: 2
    }],
    PaintStyle: {
        fillStyle: '#F1C933',    // Color amarillo
        strokeStyle: '#F1C933'
    },
    HoverPaintStyle: {
        fillStyle: '#F19833',    // Color naranja al pasar el ratón
        strokeStyle: '#F19833'
    },
    MaxConnections: 1            // Máximo 1 conexión por endpoint
});
```

### Tipos de Endpoints:

- **Placa (board_ep)**: Rectangulares, solo pueden recibir conexiones (isTarget: true)
- **Componente (component_ep)**: Circulares (dots), solo pueden iniciar conexiones (isSource: true)

## Flujo Completo de una Conexión

```
1. Usuario arrastra desde pin de componente
   ↓
2. jsPlumb detecta el drag
   ↓
3. Usuario suelta sobre pin de placa
   ↓
4. jsPlumb crea la conexión visual
   ↓
5. Se dispara evento 'connection'
   ↓
6. hw2Bloqs procesa y guarda parámetros
   ↓
7. Se dispara evento personalizado 'connectionEvent'
   ↓
8. hardwareTab actualiza el modelo del componente
   ↓
9. Se marca component.connected = true
   ↓
10. Se actualiza la interfaz y el código generado
```

## Restricciones y Validaciones

1. **Un pin solo puede tener una conexión** (MaxConnections: 1)
2. **Los pines deben ser del mismo tipo** (scope: 'digital', 'analog', 'serial')
3. **No se puede conectar sin placa** seleccionada
4. **Los componentes no se pueden conectar en modo robot**
5. **Los pines integrados se conectan automáticamente** (ej: bluetooth en bq ZUM)

## Conexiones Automáticas

Algunos componentes tienen pines obligatorios que se conectan automáticamente:

```javascript
// En hw2Bloqs.js - createEP()
if (isMandatoryPin) {
    var epBoardDOM = document.querySelector('.pin-' + mandatoryPins[type][element]);
    if (epBoardDOM) {
        var epBoardReference = epBoardDOM._jsPlumb;
        jsPlumbInstance.connect({
            uuids: [uidEPComponent, uidEPBoard],
            type: 'automatic'
        });
    }
}
```

Ejemplos:
- RTC (reloj): siempre conectado a A4 (SDA) y A5 (SCL)
- LCD: siempre conectado a A4 (SDA) y A5 (SCL)
- Bluetooth integrado: siempre conectado a pines TX/RX específicos

## Guardado y Carga de Proyectos

### Al Guardar:

```javascript
exports.saveSchema = function() {
    return {
        components: [
            {
                uid: "component-uid",
                endpoints: { s: { type: "digital", uid: "ep-uid" } },
                connected: true
            }
        ],
        connections: [
            {
                pinSourceUid: "ep-component-uid",
                pinTargetUid: "ep-board-uid"
            }
        ]
    };
};
```

### Al Cargar:

```javascript
exports.loadSchema = function(schema) {
    // 1. Añade la placa
    exports.addBoard(schema.board);
    
    // 2. Añade los componentes
    schema.components.forEach(exports.addComponent);
    
    // 3. Recrea las conexiones usando los UIDs guardados
    schema.connections.forEach(function(connection) {
        jsPlumbInstance.connect({
            uuids: [connection.pinSourceUid, connection.pinTargetUid],
            type: 'automatic'
        });
    });
};
```

## Conclusión

El sistema de conexiones es completamente visual e interactivo:

1. **Crear conexión**: Arrastrar desde componente a placa
2. **Mover conexión**: Arrastrar el extremo de la conexión a otro pin
3. **Seleccionar conexión**: Hacer clic en la línea de conexión
4. **Eliminar conexión**: Seleccionar y presionar Delete/Backspace
5. **Desconectar componente**: Click derecho → Desconectar

Todo esto se traduce automáticamente en el modelo de datos del proyecto y se refleja en el código generado.
