/* global jsPlumbUtil */
(function() {
    'use strict';

    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) {
                return;
            }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle('resize', 'optimizedResize');

    var app = angular.module('bitbloqOffline');

    // I provide an injectable (and exteded) version of the jsPlumb lib.
    app.factory('jsPlumb', function($window) {
        // Get a local handle on the global lodash reference.
        // Return the [formerly global] reference so that it can be injected into other aspects of the AngularJS application.
        return $window.jsPlumb;
    });

    /**
     * @ngdoc service
     * @name bitbloqOffline.protoBoLa
     * @description
     * # protoBoLa
     * Service in the bitbloqOffline.
     */
    app.service('hw2Bloqs', function($rootScope, jsPlumb) {
        var exports = {};

        var jsPlumbInstance = null;

        var config = {
            color: '#F1C933',
            colorHover: '#F19833'
        };

        var containerDefault = null,
            boardContainerId = null,
            robotContainerId = null,
            boardDOMElement = null,
            robotDOMElement = null,
            componentDragging = null;

        var board = null;

        var connectionEvent = new CustomEvent('connectionEvent');

        /*jshint validthis:true */
        exports.initialize = function(container, boardContainerIdRef, robotContainerIdRef) {

            if (!container) {
                throw Error;
            }

            containerDefault = container;
            boardContainerId = boardContainerIdRef;
            robotContainerId = robotContainerIdRef;

            console.log('🔧 hw2Bloqs.initialize called', {
                container: !!container,
                boardContainerId,
                robotContainerId,
                jsPlumb: !!jsPlumb
            });

            jsPlumbInstance = jsPlumb.getInstance();
            jsPlumbInstance.setContainer(container);
            
            console.log('✅ jsPlumbInstance created:', {
                instance: !!jsPlumbInstance,
                container: jsPlumbInstance.getContainer()
            });

            jsPlumbInstance.importDefaults({
                DragOptions: {
                    cursor: 'pointer',
                    zIndex: 2000
                },
                DropOptions: {
                    tolerance: 'touch',
                    cursor: 'crosshair',
                    hoverClass: 'dropHover',
                    activeClass: 'dragActive'
                },
                Connector: ['Flowchart', {
                    cornerRadius: 5,
                    alwaysRespectStubs: false,
                    midpoint: 1,
                    stub: [10, 40],
                    gap: 2
                }],
                EndpointStyle: {
                    fillStyle: config.color,
                    strokeStyle: config.colorHover
                },
                EndpointHoverStyle: {
                    fillStyle: config.colorHover
                },
                PaintStyle: {
                    fillStyle: config.color,
                    strokeStyle: config.color
                },
                HoverPaintStyle: {
                    fillStyle: config.colorHover,
                    strokeStyle: config.colorHover
                },
                MaxConnections: 1
            });

            _registerJsPlumbTypes();
            _connectionListeners();
            
            // CRÍTICO: Re-estilizar todas las conexiones cada vez que jsPlumb repinte
            jsPlumbInstance.bind('repaint', function() {
                setTimeout(function() {
                    _restyleAllConnectors();
                }, 50);
            });

            // window.removeEventListener('optimizedResize');
            window.addEventListener('optimizedResize', function() {
                exports.repaint();
            }, false);

            document.addEventListener('mouseup', function() {
                if (componentDragging) {
                    //Transforms absolute coordinates to relative coordinates
                    componentDragging.style.left = ((componentDragging.offsetLeft * 100) / containerDefault.offsetWidth) + '%';
                    componentDragging.style.top = ((componentDragging.offsetTop * 100) / containerDefault.offsetHeight) + '%';
                    componentDragging = null;
                }
            });

        };

        exports.addRobot = function(newRobot) {
            robotDOMElement = document.getElementById(robotContainerId);
            robotDOMElement.classList.remove('zowi');
            robotDOMElement.classList.remove('evolution');
            robotDOMElement.classList.add(newRobot.id);
            robotDOMElement.classList.add('opaque');
            boardDOMElement = document.getElementById(boardContainerId);
            boardDOMElement.classList.remove('opaque');
        };

        exports.addBoard = function(newBoard) {

            exports.removeBoard();

            board = newBoard;

            console.log('🔧 addBoard called:', {
                boardId: newBoard.id,
                boardContainerId
            });

            boardDOMElement = document.getElementById(boardContainerId);
            boardDOMElement.classList.add(board.id);

            boardDOMElement.classList.add('opaque');
            robotDOMElement = document.getElementById(robotContainerId);
            robotDOMElement.classList.remove('opaque');

            var _addBoardEndpoints = function() {

                console.log('🔧 _addBoardEndpoints called, pins:', board.pins);

                function addEP(pin) {

                    var overLayLocation = [];
                    if (type === 'digital') {
                        overLayLocation = [0.5, 1.5];
                    } else if (type === 'analog') {
                        overLayLocation = [0.5, -0.5];
                    } else {
                        overLayLocation = [0.5, -0.5];
                    }

                    console.log('📍 Creating board endpoint:', {
                        pin: pin.name,
                        type: type,
                        position: [pin.x, pin.y]
                    });

                    //Create a 'basic' endpoint
                    var epBoard = jsPlumbInstance.addEndpoint(boardDOMElement, {
                        anchor: [pin.x, pin.y, 0, -1, 0, 0],
                        endpoint: ['Rectangle', {
                            width: board.pinSize[type].w,
                            height: board.pinSize[type].h
                        }],
                        overlays: [
                            ['Label', {
                                label: 'Pin ' + pin.name,
                                labelStyle: {
                                    color: 'black'
                                },
                                location: overLayLocation
                            }]
                        ],
                        parameters: {
                            pinBoard: pin.name
                        },
                        cssClass: 'board_ep board_ep-' + type + ' pin-' + pin.name.toLowerCase(),
                        isTarget: true,
                        isSource: false,
                        scope: type,
                        uuid: pin.uid
                    });

                    // CRÍTICO: Aplicar estilos visuales a endpoints de placa
                    if (epBoard.canvas) {
                        var svgRect = epBoard.canvas.querySelector('rect');
                        if (svgRect) {
                            svgRect.style.fill = config.color;
                            svgRect.style.stroke = config.colorHover;
                            svgRect.style.strokeWidth = '2px';
                            svgRect.style.pointerEvents = 'none';
                        }

                        // Aplicar de nuevo después del renderizado completo
                        setTimeout(function() {
                            var rect = epBoard.canvas.querySelector('rect');
                            if (rect) {
                                rect.style.fill = config.color;
                                rect.style.stroke = config.colorHover;
                                rect.style.strokeWidth = '2px';
                                rect.style.pointerEvents = 'none';
                            }
                        }, 50);

                        // Reaplicar en mouseenter para prevenir que hover los oculte
                        epBoard.canvas.addEventListener('mouseenter', function() {
                            var rect = this.querySelector('rect');
                            if (rect) {
                                rect.style.fill = config.color;
                                rect.style.stroke = config.colorHover;
                                rect.style.strokeWidth = '2px';
                                rect.style.pointerEvents = 'none';
                            }
                        });
                    }

                    epBoard.unbind('click');
                    epBoard.bind('click', function(ep) {
                        if (ep.hasType('selected')) {
                            return false;
                        }
                        //Remove other connections & ep selected
                        var allConnections = jsPlumbInstance.getAllConnections();
                        if (allConnections) {
                            allConnections.forEach(function(con) {
                                con.removeType('selected');
                                if (con.endpoints) {
                                    con.endpoints.forEach(function(elem) {
                                        elem.removeType('selected');
                                    });
                                }
                            });
                        }
                        // Validar que ep.connections existe antes de iterar
                        if (ep.connections && ep.connections.length > 0) {
                            ep.connections.forEach(function(con) {
                                con.setType('selected');
                                if (con.endpoints) {
                                    con.endpoints.forEach(function(epAdjacent) {
                                        epAdjacent.setType('selected');
                                    });
                                }
                            });
                        }
                    });

                }

                for (var type in board.pins) {
                    board.pins[type].forEach(addEP);
                }

            };

            _addBoardEndpoints();

        };

        exports.removeBoard = function() {
            if (jsPlumbInstance && board && boardDOMElement) {
                boardDOMElement.classList.remove(board.id);
                jsPlumbInstance.removeAllEndpoints(boardDOMElement);
            }
            board = null;
        };

        var onComponentMouseDown = function() {
            var comp = this;
            componentDragging = comp;

            exports.unselectAllConnections();

            var connectionsArray = jsPlumbInstance.getConnections().filter(function(el) {
                return el.sourceId === comp.id;
            });

            $('.component_ep').removeClass('selected');
            jsPlumbInstance.selectEndpoints({
                source: this
            }).addClass('selected');

            connectionsArray.forEach(function(c) {
                _selectConnection(c);
            });
        };

        exports.addComponent = function(newComponent) {

            console.log('🔧 addComponent called:', {
                component: newComponent.name,
                id: newComponent.id,
                pins: newComponent.pins
            });

            if (!newComponent) {
                throw new Error('You need provide a component element :: addComponent');
            }
            if (!newComponent.uid) {
                newComponent.uid = jsPlumbUtil.uuid();
            }

            var DOMComponent = document.createElement('img');

            containerDefault.appendChild(DOMComponent);

            // CRÍTICO: jsPlumb necesita que el elemento tenga ID para renderizar endpoints
            DOMComponent.id = 'component-' + newComponent.uid;
            DOMComponent.dataset.uid = newComponent.uid;
            DOMComponent.dataset.target = 'component-context-menu';
            DOMComponent.dataset.name = newComponent.name;
            
            console.log('🆔 Component ID assigned:', DOMComponent.id);
            DOMComponent.setAttribute('context-menu', true);
            DOMComponent.classList.add('component');
            DOMComponent.style.top = newComponent.coordinates.y + '%';
            DOMComponent.style.left = newComponent.coordinates.x + '%';
            DOMComponent.src = 'images/components/' + (newComponent.id || newComponent.uuid) + '.svg';
            DOMComponent.style.width = newComponent.width + 'px';
            DOMComponent.style.height = newComponent.height + 'px';
            DOMComponent.draggable = true;

            $('.component_ep').removeClass('selected');

            DOMComponent.addEventListener('mousedown', onComponentMouseDown);

            _loadComponent(DOMComponent);
            exports.repaint();

            return DOMComponent;

            //Adds a raw svg for a component
            function _loadComponent() {

                var spaceInterPin;
                if (newComponent.pins.digital && newComponent.pins.analog) {
                    spaceInterPin = {
                        digital: {
                            x: newComponent.pins.digital && newComponent.width / (newComponent.pins.digital.length + 1) / newComponent.width,
                            y: 0
                        },
                        analog: {
                            x: newComponent.pins.analog && newComponent.width / (newComponent.pins.analog.length + 1) / newComponent.width,
                            y: 1
                        },
                        serial: {
                            x: 1,
                            y: 0.5
                        }
                    };
                } else {
                    spaceInterPin = {
                        digital: {
                            x: newComponent.pins.digital && newComponent.width / (newComponent.pins.digital.length + 1) / newComponent.width,
                            y: 1
                        },
                        analog: {
                            x: newComponent.pins.analog && newComponent.width / (newComponent.pins.analog.length + 1) / newComponent.width,
                            y: 0
                        },
                        serial: {
                            x: 1,
                            y: 0.5
                        },
                        greymotor: {
                            x: 0.5,
                            y: 1
                        }
                    };
                }

                var mandatoryPins = {};

                function createEP(element, index) {
                    console.log('📍 Creating component endpoint:', {
                        element,
                        index,
                        type,
                        component: newComponent.name
                    });

                    var el = element,
                        isMandatoryPin = false;
                    if (!newComponent.pin) {
                        newComponent.pin = {};
                    }
                    if (!(element in newComponent.pin)) {
                        newComponent.pin[element] = null;
                    } else {
                        if (!mandatoryPins[type]) {
                            mandatoryPins[type] = {};
                        }
                        mandatoryPins[type][element] = newComponent.pin[element];
                        isMandatoryPin = true;
                    }

                    if (typeof element !== 'string') {
                        el = Object.keys(element)[0];
                    }
                    var anchorValue = [spaceInterPin[type].x * (index + 1), spaceInterPin[type].y, 0, 0, 0, 0];

                    if (!newComponent.endpoints) {
                        newComponent.endpoints = {};
                    }
                    if (!newComponent.endpoints[el]) {
                        newComponent.endpoints[el] = {
                            type: type,
                            uid: jsPlumbUtil.uuid()
                        };
                    }

                    console.log('⚙️ About to call addEndpoint with:', {
                        anchor: anchorValue,
                        radius: 7,
                        cssClass: 'component_ep pin-' + el
                    });

                    var epComponent = jsPlumbInstance.addEndpoint(DOMComponent, {
                        // connectionType: 'default',
                        anchor: anchorValue,
                        uuid: newComponent.endpoints[el].uid,
                        parameters: {
                            pinComponent: el,
                            type: type
                        },
                        endpoint: ['Dot', {
                            radius: 7
                        }],
                        // CRÍTICO: Estilos visuales para que el endpoint sea visible
                        paintStyle: {
                            fillStyle: config.color,
                            strokeStyle: config.colorHover,
                            lineWidth: 2
                        },
                        hoverPaintStyle: {
                            fillStyle: config.colorHover,
                            strokeStyle: config.colorHover
                        },
                        isSource: true,
                        isTarget: false,
                        cssClass: 'component_ep pin-' + el,
                        hoverClass: 'component_ep--hover',
                        connectorStyle: {
                            strokeStyle: config.color,
                            fillStyle: 'transparent',
                            lineWidth: 5,
                            joinstyle: 'round',
                            outlineWidth: 1,
                            outlineColor: '#EBEBEB'
                        },
                        connectorHoverStyle: {
                            strokeStyle: config.colorHover
                        }
                    }, {
                        scope: type
                    });

                    console.log('✅ Endpoint created:', {
                        created: !!epComponent,
                        hasCanvas: !!epComponent.canvas,
                        cssClass: epComponent.canvas ? epComponent.canvas.className : 'NO CANVAS'
                    });

                    // CRÍTICO: Aplicar estilos manualmente porque jsPlumb no los aplica automáticamente
                    epComponent.setPaintStyle({
                        fillStyle: config.color,
                        strokeStyle: config.colorHover,
                        lineWidth: 2
                    });

                    // ÚLTIMO RECURSO: Manipular SVG DOM directamente DESPUÉS del renderizado de jsPlumb
                    if (epComponent.canvas) {
                        // Aplicar estilos inmediatamente
                        var svgCircle = epComponent.canvas.querySelector('circle');
                        if (svgCircle) {
                            svgCircle.style.fill = config.color;
                            svgCircle.style.stroke = config.colorHover;
                            svgCircle.style.strokeWidth = '2px';
                        }
                        
                        // Aplicar de nuevo después del renderizado completo de jsPlumb
                        setTimeout(function() {
                            var circle = epComponent.canvas.querySelector('circle');
                            if (circle) {
                                circle.style.fill = config.color;
                                circle.style.stroke = config.colorHover;
                                circle.style.strokeWidth = '2px';
                                console.log('🎨 SVG re-styled after jsPlumb render:', {
                                    fill: circle.style.fill,
                                    stroke: circle.style.stroke
                                });
                            }
                        }, 50);
                    }

                    epComponent.canvas.classList.add('selected');

                    // Reaplicar estilos en mouseenter para prevenir que hover los oculte
                    epComponent.canvas.addEventListener('mouseenter', function() {
                        var circle = this.querySelector('circle');
                        if (circle) {
                            circle.style.fill = config.color;
                            circle.style.stroke = config.colorHover;
                            circle.style.strokeWidth = '2px';
                            // CRÍTICO: Deshabilitar pointer-events en circle para permitir drag
                            circle.style.pointerEvents = 'none';
                        }
                    });

                    // CRÍTICO: Asegurar que el círculo SVG no bloquee eventos de drag
                    if (epComponent.canvas) {
                        var circleEl = epComponent.canvas.querySelector('circle');
                        if (circleEl) {
                            circleEl.style.pointerEvents = 'none';
                        }
                    }

                    epComponent.unbind('click');
                    epComponent.bind('click', function(ep) {

                        ep.canvas.classList.add('selected');

                        exports.unselectAllConnections();

                        if (ep.hasType('selected')) {
                            return false;
                        }

                        ep.connections.forEach(function(con) {
                            _selectConnection(con);
                        });

                    });

                    //Connect automaticaly these pins
                    if (isMandatoryPin) {
                        if (mandatoryPins[type][element]) {
                            var epBoardDOM = document.querySelector('.pin-' + mandatoryPins[type][element].toLowerCase());

                            if (epBoardDOM) {
                                var epBoardReference = epBoardDOM._jsPlumb;
                                epBoardReference.detachAll();
                                var uidEPBoard = epBoardReference.getUuid();
                                var uidEPComponent = epComponent.getUuid();
                                jsPlumbInstance.connect({
                                    uuids: [uidEPComponent, uidEPBoard],
                                    type: 'automatic'
                                });
                            } else {
                                console.warn('Unable to recover board endpoints');
                            }

                        } else {
                            console.warn('mandatoryPins. Some reference lost', mandatoryPins);
                        }
                    }

                }

                for (var type in newComponent.pins) {
                    if (newComponent.pins[type]) {
                        newComponent.pins[type].forEach(createEP);
                    }
                }

                jsPlumbInstance.draggable(DOMComponent, {
                    containment: true
                });

            }

        };

        exports.disconnectComponent = function(component) {
            var el = document.querySelector('[data-uid="' + component.uid + '"]');
            jsPlumbInstance.select({
                source: el.id
            }).detach();
        };

        exports.disconnectAllComponents = function() {
            jsPlumbInstance.detachAllConnections(boardDOMElement);
        };

        exports.removeComponent = function(component) {
            component.removeEventListener('mousedown', onComponentMouseDown);

            jsPlumbInstance.getConnections(component).forEach(function(conn) {
                conn.setType('removing');
            });
            jsPlumbInstance.detachAllConnections(component);
            jsPlumbInstance.remove(component);
        };

        exports.removeAllComponents = function() {
            jsPlumbInstance.deleteEveryEndpoint();
            var nodeList = containerDefault.querySelectorAll('.component');
            [].forEach.call(nodeList, function(el) {
                el.removeEventListener('mousedown', onComponentMouseDown);
                jsPlumb.remove(el);
            });
        };

        exports.removeSelectedConnection = function() {
            jsPlumbInstance.getAllConnections().forEach(function(con) {
                if (con.hasType('selected')) {
                    con.endpoints.forEach(function(elem) {
                        elem.removeType('selected');
                        elem.removeClass('selected');
                    });
                    jsPlumbInstance.detach(con);
                }
            });
        };

        /**
         * [loadSchema It loads a board schema]
         * @param  {[type]} schema [description]
         * @return {[type]}        [description]
         */
        exports.loadSchema = function(newSchema) {

            this.schema = newSchema;
            var ref = this;

            if (ref.schema.robot) {
                exports.addRobot(ref.schema.robot);
            } else if (ref.schema.board) {

                //Add board
                exports.addBoard(ref.schema.board);

                //Add components
                this.schema.components.forEach(function(component) {
                    exports.addComponent(component);
                });

                //Add connections
                this.schema.connections.forEach(function(connection) {
                    if (jsPlumbInstance.getEndpoint(connection.pinSourceUid).isFull()) {
                        return false;
                    }

                    jsPlumbInstance.connect({
                        uuids: [connection.pinSourceUid, connection.pinTargetUid],
                        type: 'automatic'
                    });

                });
            } else {
                console.warn('Unable to add board', ref.schema);
            }

            exports.repaint();

        };

        exports.saveSchema = function() {

            var schema = {
                components: [],
                connections: []
            };
            var endpointsRef = {};

            function _setParameters(ep) {
                endpointsRef[ep.getParameter('pinComponent')] = {
                    uid: ep.getUuid(),
                    type: ep.scope
                };
            }

            var componentList = [].slice.call(containerDefault.querySelectorAll('.component'));
            console.log('🔍 DEBUG saveSchema - componentList length:', componentList.length);
            
            componentList.forEach(function(item) {
                console.log('🔍 DEBUG saveSchema - Processing component:', item.dataset.uid);

                var endpoints = jsPlumbInstance.getEndpoints(item);
                console.log('🔍 DEBUG saveSchema - endpoints:', endpoints ? endpoints.length : 'null');

                if (endpoints && endpoints.length > 0) {

                    endpointsRef = {};
                    endpoints.forEach(_setParameters);
                    
                    console.log('🔍 DEBUG saveSchema - endpointsRef:', endpointsRef);

                    var connections = jsPlumbInstance.getConnections({
                        source: item
                    });
                    
                    console.log('🔍 DEBUG saveSchema - connections length:', connections.length);

                    if (connections.length) { //components disconnected are not saving
                        schema.components.push({
                            endpoints: endpointsRef,
                            uid: item.dataset.uid,
                            connected: connections.length > 0
                        });
                        console.log('🔍 DEBUG saveSchema - Component ADDED to schema');
                    } else {
                        console.warn('⚠️ DEBUG saveSchema - Component NOT added (no connections)');
                    }
                } else {
                    console.warn('⚠️ DEBUG saveSchema - Component has no endpoints');
                }
            });
            
            console.log('🔍 DEBUG saveSchema - Final components:', schema.components.length);

            function _getConnections() {
                return jsPlumbInstance.getAllConnections().map(function(connection) {

                    var connectionParams = connection.getParameters();
                    
                    // Usar los parámetros guardados en la conexión
                    return ({
                        pinSourceUid: connectionParams.pinSourceUid,
                        pinTargetUid: connectionParams.pinTargetUid,
                        pinBoard: connectionParams.pinBoard,      // ← Leer desde parámetros de conexión
                        pinComponent: connectionParams.pinComponent // ← Leer desde parámetros de conexión
                    });

                }) || [];
            }

            //Store connections data
            schema.connections = _getConnections();

            return schema;
        };

        function _connectionListeners() {

            jsPlumbInstance.unbind('click');
            jsPlumbInstance.unbind('connection');
            jsPlumbInstance.unbind('connectionDetached');

            jsPlumbInstance.bind('connection', function(connection) {

                console.log('🔗 CONNECTION EVENT:', {
                    source: connection.source.id,
                    target: connection.target.id,
                    sourceEndpoint: connection.sourceEndpoint.getUuid(),
                    targetEndpoint: connection.targetEndpoint.getUuid(),
                    hasConnection: !!connection.connection,
                    connector: connection.connection.connector
                });

                // Verificar si el connector tiene canvas
                if (connection.connection && connection.connection.canvas) {
                    console.log('✅ Connector canvas exists:', {
                        canvas: connection.connection.canvas,
                        visible: connection.connection.canvas.style.display !== 'none',
                        opacity: connection.connection.canvas.style.opacity,
                        className: connection.connection.canvas.className
                    });
                    
                    // CRÍTICO: Aplicar estilos al path SVG del connector directamente
                    var paths = connection.connection.canvas.querySelectorAll('path');
                    console.log('📊 Paths found:', paths.length);
                    
                    if (paths.length > 0) {
                        // Aplicar estilos inmediatamente
                        paths.forEach(function(path, index) {
                            console.log('Path ' + index + ' before styling:', {
                                stroke: path.getAttribute('stroke'),
                                strokeWidth: path.getAttribute('stroke-width'),
                                fill: path.getAttribute('fill'),
                                d: path.getAttribute('d') ? 'exists' : 'missing'
                            });
                            
                            path.setAttribute('stroke', config.color);
                            path.setAttribute('stroke-width', '5');
                            path.setAttribute('fill', 'none');
                            path.style.stroke = config.color;
                            path.style.strokeWidth = '5px';
                            path.style.fill = 'none';
                            
                            console.log('Path ' + index + ' after immediate styling:', {
                                stroke: path.getAttribute('stroke'),
                                strokeWidth: path.getAttribute('stroke-width'),
                                styleStroke: path.style.stroke
                            });
                        });
                        
                        // CRÍTICO: Reaplicar estilos después de que jsPlumb termine de renderizar
                        setTimeout(function() {
                            var canvas = connection.connection.canvas;
                            if (canvas) {
                                var pathsAgain = canvas.querySelectorAll('path');
                                console.log('🔄 Reapplying styles after render, paths:', pathsAgain.length);
                                pathsAgain.forEach(function(path, index) {
                                    path.setAttribute('stroke', config.color);
                                    path.setAttribute('stroke-width', '5');
                                    path.setAttribute('fill', 'none');
                                    path.style.stroke = config.color;
                                    path.style.strokeWidth = '5px';
                                    path.style.fill = 'none';
                                    path.style.visibility = 'visible';
                                    path.style.display = 'block';
                                    console.log('✅ Path ' + index + ' re-styled:', path.getAttribute('stroke'));
                                    
                                    // ÚLTIMO RECURSO: MutationObserver para forzar estilos permanentes
                                    var observer = new MutationObserver(function(mutations) {
                                        mutations.forEach(function(mutation) {
                                            if (mutation.type === 'attributes' && 
                                                (mutation.attributeName === 'stroke' || 
                                                 mutation.attributeName === 'stroke-width' ||
                                                 mutation.attributeName === 'fill')) {
                                                var target = mutation.target;
                                                if (target.getAttribute('stroke') !== config.color) {
                                                    target.setAttribute('stroke', config.color);
                                                    target.setAttribute('stroke-width', '5');
                                                    target.setAttribute('fill', 'none');
                                                    target.style.stroke = config.color;
                                                    target.style.strokeWidth = '5px';
                                                    target.style.fill = 'none';
                                                    console.log('🔧 MutationObserver re-applied styles');
                                                }
                                            }
                                        });
                                    });
                                    observer.observe(path, {
                                        attributes: true,
                                        attributeFilter: ['stroke', 'stroke-width', 'fill', 'style']
                                    });
                                });
                            }
                        }, 100);
                    } else {
                        console.warn('❌ NO paths found in connector canvas!');
                    }
                } else {
                    console.warn('❌ NO connector canvas found!');
                }

                connection.targetEndpoint.setType('connected');
                connection.sourceEndpoint.setType('connected');

                // Guardar TODOS los parámetros necesarios en la conexión
                var pinComponent = connection.sourceEndpoint.getParameter('pinComponent');
                var pinBoard = connection.targetEndpoint.getParameter('pinBoard');
                
                connection.connection.setParameters({
                    pinSourceUid: connection.sourceEndpoint.getUuid(),
                    pinTargetUid: connection.targetEndpoint.getUuid(),
                    pinComponent: pinComponent,  // ← NUEVO: guardar nombre del pin del componente
                    pinBoard: pinBoard           // ← NUEVO: guardar nombre del pin de la placa
                });
                
                var pinAssignation = {};
                pinAssignation[pinComponent] = pinBoard;

                var componentData = {
                    uid: connection.source.dataset.uid,
                    connections: [connection.connection],
                    pin: pinAssignation
                };

                connection.connection.bind('click', function(c) {
                    exports.unselectAllConnections();
                    _selectConnection(c);
                });

                connectionEvent.componentData = componentData;
                connectionEvent.protoBoLaAction = 'attach';
                connectionEvent.protoBoLaActionParent =
                    connection.connection.hasType('undoredo') || connection.connection.hasType('removing') || connection.connection.getData().undoredo;

                if (connection.target.classList.contains('board')) {
                    console.log('📤 Dispatching connectionEvent:', {
                        action: connectionEvent.protoBoLaAction,
                        componentData: connectionEvent.componentData
                    });
                    containerDefault.dispatchEvent(connectionEvent);
                    console.log('✅ Event dispatched');
                    
                    // CRÍTICO: Forzar actualización de Angular después del evento
                    setTimeout(function() {
                        if ($rootScope.$$phase) {
                            console.log('⚠️ Digest already in progress');
                        } else {
                            $rootScope.$apply();
                            console.log('✅ $rootScope.$apply() called');
                        }
                    }, 50);
                } else {
                    console.warn('⚠️ Target is not board, event NOT dispatched');
                }

            });

            jsPlumbInstance.bind('connectionDetached', function(connection) {

                connection.targetEndpoint.removeType('connected');
                connection.sourceEndpoint.removeType('connected');

                var pinAssignation = {};
                pinAssignation[connection.sourceEndpoint.getParameter('pinComponent')] = undefined;

                var componentData = {
                    uid: connection.source.dataset.uid,
                    id: connection.source.dataset.id,
                    category: connection.source.dataset.category,
                    pin: pinAssignation,
                    connections: [connection.connection]
                };

                _unselectConnection(connection.connection);

                connection.connection.unbind('click');

                connectionEvent.componentData = componentData;
                connectionEvent.protoBoLaAction = 'detach';
                connectionEvent.protoBoLaActionParent =
                    connection.connection.hasType('undoredo') || connection.connection.hasType('removing') || connection.connection.getData().undoredo;

                if (connection.target.classList.contains('board')) {
                    containerDefault.dispatchEvent(connectionEvent);
                }

            });

            jsPlumbInstance.bind('connectionMoved', function(connection) {
                connection.originalTargetEndpoint.removeType('selected');
                connection.originalTargetEndpoint.removeClass('selected');
                connection.originalTargetEndpoint.removeClass('endpointDrag');
            });

        }

        function _selectConnection(element) {
            if (element.hasType('selected')) {
                return false;
            }
            element.setType('selected');
            element.canvas.classList.add('selected');

            element.endpoints.forEach(function(ep) {
                ep.setType('selected');
                ep.canvas.classList.add('selected');
            });
        }

        function _unselectConnection(element) {
            element.removeType('selected');

            element.canvas.classList.remove('selected');

            element.endpoints.forEach(function(ep) {
                ep.removeType('selected');
                ep.canvas.classList.remove('selected');
            });
        }

        exports.unselectAllConnections = function() {
            jsPlumbInstance.getAllConnections().forEach(function(con) {
                con.removeType('selected');

                con.canvas.classList.remove('selected');

                con.endpoints.forEach(function(ep) {
                    ep.removeType('selected');
                    ep.canvas.classList.remove('selected');
                });
            });
        };

        exports.repaint = function() {
            setTimeout(function() {
                try {
                    jsPlumbInstance.repaintEverything();
                    
                    // Reaplicar estilos a TODOS los endpoints después del repaint
                    setTimeout(function() {
                        // Endpoints de componentes (círculos)
                        document.querySelectorAll('.component_ep svg circle').forEach(function(circle) {
                            circle.style.fill = config.color;
                            circle.style.stroke = config.colorHover;
                            circle.style.strokeWidth = '2px';
                            circle.style.pointerEvents = 'none';
                        });
                        // Endpoints de placa (rectángulos)
                        document.querySelectorAll('.board_ep svg rect').forEach(function(rect) {
                            rect.style.fill = config.color;
                            rect.style.stroke = config.colorHover;
                            rect.style.strokeWidth = '2px';
                            rect.style.pointerEvents = 'none';
                        });
                        console.log('🎨 All endpoints (board + components) re-styled after repaint');
                    }, 50);
                } catch (e) {
                    console.warn('protoboard container reference lost!. Re-engage', e);
                }
            }, 100);
        };

        function _restyleAllConnectors() {
            // Re-estilizar TODAS las conexiones para que sean visibles
            jsPlumbInstance.getAllConnections().forEach(function(conn) {
                if (conn.canvas) {
                    var paths = conn.canvas.querySelectorAll('path');
                    paths.forEach(function(path) {
                        path.setAttribute('stroke', config.color);
                        path.setAttribute('stroke-width', '5');
                        path.setAttribute('fill', 'none');
                        path.style.stroke = config.color;
                        path.style.strokeWidth = '5px';
                        path.style.fill = 'none';
                        path.style.visibility = 'visible';
                        path.style.display = 'block';
                    });
                }
            });
            console.log('🔄 All connectors re-styled');
        }

        function _registerJsPlumbTypes() {

            // Register connection types
            var commonConnectionType = {

            };

            jsPlumbInstance.registerConnectionTypes({
                'selected': {
                    paintStyle: {
                        strokeStyle: config.colorHover
                    },
                    hoverPaintStyle: {
                        strokeStyle: config.colorHover
                    }
                },
                'default': commonConnectionType
            });

            // Register endpoints types
            jsPlumbInstance.registerEndpointTypes({
                'selected': {
                    paintStyle: {
                        strokeStyle: config.colorHover,
                        fillStyle: config.colorHover
                    },
                    hoverPaintStyle: {
                        fillStyle: config.colorHover
                    }
                }
            });

            jsPlumbInstance.registerEndpointTypes({
                'connected': {
                    paintHoverStyle: {
                        fillStyle: config.colorHover
                    },
                    endpointHoverStyle: {
                        fillStyle: config.colorHover
                    }
                }
            });
        }

        return exports;

    });

})();
