import React, { useState } from 'react';
import { Stage, Layer, Circle, Text, Rect } from 'react-konva';
import mapData from '../mapdata';

const HomePage = () => {
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [stageSize] = useState({ width: 1200, height: 800 });

  const handleDeskClick = (desk) => {
    setSelectedDesk(desk);
  };

  return (
    <div className="container">
      <h1>Mapa de Asignación de Puestos</h1>
      <p>Visualización de la asignación de puestos en la oficina. Haz clic en un puesto para ver más detalles.</p>
      
      {selectedDesk && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          backgroundColor: '#f0f0f0',
          border: '1px solid #ddd',
          borderRadius: '5px' 
        }}>
          <h3>Detalles del Puesto</h3>
          <p>ID: {selectedDesk.id}</p>
          <p>Bloque: {selectedDesk.block}</p>
          <p>Número: {selectedDesk.number}</p>
          <p>Estado: {selectedDesk.assigned ? 'Asignado' : 'Disponible'}</p>
          {selectedDesk.assigned && selectedDesk.assignedTo && (
            <p>Asignado a: {selectedDesk.assignedTo}</p>
          )}
          <button onClick={() => setSelectedDesk(null)}>Cerrar</button>
        </div>
      )}
      
      <Stage width={stageSize.width} height={stageSize.height} style={{ border: '1px solid #ccc' }}>
        <Layer>
          {/* Renderizar bloques como áreas */}
          {Array.from(new Set(mapData.map(desk => desk.block))).map(block => {
            const desksInBlock = mapData.filter(desk => desk.block === block);
            if (desksInBlock.length === 0) return null;
            
            // Encontrar las dimensiones del bloque
            const minX = Math.min(...desksInBlock.map(desk => desk.x)) - 30;
            const minY = Math.min(...desksInBlock.map(desk => desk.y)) - 50;
            const maxX = Math.max(...desksInBlock.map(desk => desk.x)) + 30;
            const maxY = Math.max(...desksInBlock.map(desk => desk.y)) + 30;
            
            return (
              <React.Fragment key={`block-${block}`}>
                <Rect
                  x={minX}
                  y={minY}
                  width={maxX - minX}
                  height={maxY - minY}
                  fill="rgba(200, 200, 255, 0.2)"
                  stroke="#aaa"
                  strokeWidth={1}
                />
                <Text
                  x={minX + 10}
                  y={minY + 10}
                  text={`BLOQUE ${block}`}
                  fontSize={16}
                  fontStyle="bold"
                  fill="#333"
                />
              </React.Fragment>
            );
          })}
          
          {/* Renderizar puestos */}
          {mapData.map(desk => (
            <React.Fragment key={desk.id}>
              <Circle
                x={desk.x}
                y={desk.y}
                radius={20}
                fill={desk.assigned ? "#82ca9d" : "white"}
                stroke="#333"
                strokeWidth={1}
                onClick={() => handleDeskClick(desk)}
                onTap={() => handleDeskClick(desk)}
                shadowBlur={selectedDesk && selectedDesk.id === desk.id ? 10 : 0}
                shadowColor="blue"
                shadowOpacity={0.6}
                shadowOffsetX={0}
                shadowOffsetY={0}
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

export default HomePage;