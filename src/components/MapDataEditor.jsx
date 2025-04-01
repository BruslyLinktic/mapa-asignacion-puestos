import React, { useState, useEffect } from 'react';
import { Stage, Layer, Circle, Text, Rect, Line } from 'react-konva';
import initialMapData from '../mapdata'; // Tu archivo de datos actual

const MapDataEditor = () => {
  const [mapData, setMapData] = useState(initialMapData || []);
  const [editMode, setEditMode] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [gridSize, setGridSize] = useState(20);
  const [stageSize, setStageSize] = useState({ width: 1200, height: 800 });
  const [selectedBlock, setSelectedBlock] = useState('A');
  
  // Configuración para la generación automática
  const [blockConfig, setBlockConfig] = useState({
    A: { startX: 100, startY: 100, rows: 5, cols: 8, spacingX: 60, spacingY: 60, totalDesks: 39 },
    B: { startX: 100, startY: 400, rows: 8, cols: 8, spacingX: 60, spacingY: 60, totalDesks: 61 },
    C: { startX: 100, startY: 700, rows: 5, cols: 5, spacingX: 60, spacingY: 60, totalDesks: 25 }
  });

  // Función para generar el layout automático
  const generateLayout = (block) => {
    const config = blockConfig[block];
    const newDesks = [];
    let counter = 1;
    
    // Calcular cuántas filas y columnas necesitamos
    const totalCells = config.rows * config.cols;
    
    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.cols; col++) {
        // Solo agregar hasta el número total de escritorios especificado
        if (counter <= config.totalDesks) {
          newDesks.push({
            id: `${block}-${counter}`,
            block: block,
            number: counter,
            x: config.startX + col * config.spacingX,
            y: config.startY + row * config.spacingY,
            assigned: false,
            assignedTo: null
          });
          counter++;
        }
      }
    }
    
    return newDesks;
  };

  // Generar layout para todos los bloques
  const generateAllLayouts = () => {
    const allDesks = [];
    
    Object.keys(blockConfig).forEach(block => {
      const blockDesks = generateLayout(block);
      allDesks.push(...blockDesks);
    });
    
    setMapData(allDesks);
  };

  // Manejar el fin del arrastre
  const handleDragEnd = (e, id) => {
    const updatedData = mapData.map(desk => {
      if (desk.id === id) {
        // Ajustar a la cuadrícula si es necesario
        let x = e.target.x();
        let y = e.target.y();
        
        if (showGrid) {
          x = Math.round(x / gridSize) * gridSize;
          y = Math.round(y / gridSize) * gridSize;
        }
        
        return { ...desk, x, y };
      }
      return desk;
    });
    
    setMapData(updatedData);
  };

  // Exportar los datos
  const exportData = () => {
    const dataStr = JSON.stringify(mapData, null, 2);
    
    // Crear un elemento temporal para descargar
    const element = document.createElement('a');
    const file = new Blob([dataStr], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'mapdata.js';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    // También mostrar en la consola para copiar/pegar
    console.log('export const mapData = ' + dataStr + ';');
    console.log('export default mapData;');
    
    alert('Datos exportados a la consola y descargados como archivo.');
  };

  // Renderizar cuadrícula
  const renderGrid = () => {
    if (!showGrid) return null;
    
    const gridLines = [];
    
    // Líneas verticales
    for (let x = 0; x <= stageSize.width; x += gridSize) {
      gridLines.push(
        <Line
          key={`v-${x}`}
          points={[x, 0, x, stageSize.height]}
          stroke="#ddd"
          strokeWidth={1}
        />
      );
    }
    
    // Líneas horizontales
    for (let y = 0; y <= stageSize.height; y += gridSize) {
      gridLines.push(
        <Line
          key={`h-${y}`}
          points={[0, y, stageSize.width, y]}
          stroke="#ddd"
          strokeWidth={1}
        />
      );
    }
    
    return gridLines;
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2>Editor de Mapa de Puestos</h2>
        
        <div style={{ marginBottom: '10px' }}>
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Desactivar Edición' : 'Activar Edición'}
          </button>
          <button onClick={() => setShowGrid(!showGrid)} style={{ marginLeft: '10px' }}>
            {showGrid ? 'Ocultar Cuadrícula' : 'Mostrar Cuadrícula'}
          </button>
          <button onClick={exportData} style={{ marginLeft: '10px' }}>
            Exportar Datos
          </button>
          <button onClick={generateAllLayouts} style={{ marginLeft: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
            Generar Todos los Layouts
          </button>
        </div>
        
        {/* Controles de configuración por bloque */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '15px' }}>
          {Object.keys(blockConfig).map(block => (
            <div key={block} style={{ 
              border: selectedBlock === block ? '2px solid #4CAF50' : '1px solid #ddd', 
              padding: '10px', 
              borderRadius: '5px' 
            }}>
              <h3 onClick={() => setSelectedBlock(block)} style={{ cursor: 'pointer' }}>
                Bloque {block}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                <label>
                  X inicial:
                  <input
                    type="number"
                    value={blockConfig[block].startX}
                    onChange={(e) => setBlockConfig({
                      ...blockConfig,
                      [block]: { ...blockConfig[block], startX: parseInt(e.target.value) }
                    })}
                    style={{ width: '60px', marginLeft: '5px' }}
                  />
                </label>
                <label>
                  Y inicial:
                  <input
                    type="number"
                    value={blockConfig[block].startY}
                    onChange={(e) => setBlockConfig({
                      ...blockConfig,
                      [block]: { ...blockConfig[block], startY: parseInt(e.target.value) }
                    })}
                    style={{ width: '60px', marginLeft: '5px' }}
                  />
                </label>
                <label>
                  Filas:
                  <input
                    type="number"
                    value={blockConfig[block].rows}
                    onChange={(e) => setBlockConfig({
                      ...blockConfig,
                      [block]: { ...blockConfig[block], rows: parseInt(e.target.value) }
                    })}
                    style={{ width: '60px', marginLeft: '5px' }}
                  />
                </label>
                <label>
                  Columnas:
                  <input
                    type="number"
                    value={blockConfig[block].cols}
                    onChange={(e) => setBlockConfig({
                      ...blockConfig,
                      [block]: { ...blockConfig[block], cols: parseInt(e.target.value) }
                    })}
                    style={{ width: '60px', marginLeft: '5px' }}
                  />
                </label>
                <label>
                  Espacio X:
                  <input
                    type="number"
                    value={blockConfig[block].spacingX}
                    onChange={(e) => setBlockConfig({
                      ...blockConfig,
                      [block]: { ...blockConfig[block], spacingX: parseInt(e.target.value) }
                    })}
                    style={{ width: '60px', marginLeft: '5px' }}
                  />
                </label>
                <label>
                  Espacio Y:
                  <input
                    type="number"
                    value={blockConfig[block].spacingY}
                    onChange={(e) => setBlockConfig({
                      ...blockConfig,
                      [block]: { ...blockConfig[block], spacingY: parseInt(e.target.value) }
                    })}
                    style={{ width: '60px', marginLeft: '5px' }}
                  />
                </label>
                <label>
                  Total puestos:
                  <input
                    type="number"
                    value={blockConfig[block].totalDesks}
                    onChange={(e) => setBlockConfig({
                      ...blockConfig,
                      [block]: { ...blockConfig[block], totalDesks: parseInt(e.target.value) }
                    })}
                    style={{ width: '60px', marginLeft: '5px' }}
                  />
                </label>
              </div>
              <button 
                onClick={() => {
                  const newLayout = generateLayout(block);
                  const otherBlocks = mapData.filter(desk => desk.block !== block);
                  setMapData([...otherBlocks, ...newLayout]);
                }}
                style={{ marginTop: '10px', width: '100%' }}
              >
                Generar Bloque {block}
              </button>
            </div>
          ))}
        </div>
        
        <div>
          <label>
            Tamaño de cuadrícula:
            <input
              type="range"
              min="5"
              max="50"
              value={gridSize}
              onChange={(e) => setGridSize(parseInt(e.target.value))}
              style={{ marginLeft: '10px', width: '100px' }}
            />
            {gridSize}px
          </label>
        </div>
      </div>
      
      <Stage width={stageSize.width} height={stageSize.height} style={{ border: '1px solid #ccc' }}>
        <Layer>
          {/* Renderizar la cuadrícula */}
          {renderGrid()}
          
          {/* Renderizar los bloques */}
          {Object.keys(blockConfig).map(block => {
            const config = blockConfig[block];
            return (
              <Rect
                key={`block-${block}`}
                x={config.startX - 20}
                y={config.startY - 40}
                width={(config.cols * config.spacingX) + 40}
                height={(config.rows * config.spacingY) + 40}
                fill="rgba(200, 200, 255, 0.2)"
                stroke="#aaa"
                strokeWidth={1}
              />
            );
          })}
          
          {/* Renderizar etiquetas de bloque */}
          {Object.keys(blockConfig).map(block => {
            const config = blockConfig[block];
            return (
              <Text
                key={`label-${block}`}
                x={config.startX}
                y={config.startY - 30}
                text={`BLOQUE ${block}`}
                fontSize={16}
                fontStyle="bold"
                fill="#333"
              />
            );
          })}
          
          {/* Renderizar los puestos */}
          {mapData.map(desk => (
            <React.Fragment key={desk.id}>
              <Circle
                x={desk.x}
                y={desk.y}
                radius={20}
                fill={desk.assigned ? "#82ca9d" : "white"}
                stroke="#333"
                strokeWidth={1}
                draggable={editMode}
                onDragEnd={(e) => handleDragEnd(e, desk.id)}
              />
              <Text
                x={desk.x - 8}
                y={desk.y - 8}
                text={desk.number.toString()}
                fontSize={14}
                fill="#333"
              />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default MapDataEditor;