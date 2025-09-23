import '../styles/cube_2d.css';
import { useState } from 'react';
import { getCube2D, mixCube2D } from '../utils/cube_utils.js';
import { useMix } from '../context/MixContext';

export default function Cube2d() {
  const [isOpen, setIsOpen] = useState(true);
  const { cubeType, currentMix } = useMix();
  const size = Number(String(cubeType).split('x')[0]) || 3;
  const cube = getCube2D(size);
  const mixedCube = mixCube2D(currentMix, cube);

  // CSS variables dinámicas para el tamaño del cubo
  const cubeStyles = {
    '--face-grid-size': size,
  };

  // Orden y posiciones para la red 2D (net)
  const faceOrder = [
    { name: 'top', style: { gridColumn: '2', gridRow: '1' } },
    { name: 'left', style: { gridColumn: '1', gridRow: '2' } },
    { name: 'front', style: { gridColumn: '2', gridRow: '2' } },
    { name: 'right', style: { gridColumn: '3', gridRow: '2' } },
    { name: 'back', style: { gridColumn: '4', gridRow: '2' } },
    { name: 'bottom', style: { gridColumn: '2', gridRow: '3' } },
  ];

  const toggleCube = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`cube-2d-wrapper ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={toggleCube} className='toggle-cube-btn'>
        {isOpen ? '◀' : '▶'}
      </button>
      
      <div className={`cube-2d ${isOpen ? 'visible' : 'hidden'}`} style={cubeStyles}>
        <div className="cube-net">
          {faceOrder.map(({ name, style }) => (
            <div 
              key={name} 
              className={`face ${name}`} 
              style={{
                ...style,
                gridTemplateColumns: `repeat(${size}, 1fr)`,
                gridTemplateRows: `repeat(${size}, 1fr)`
              }}
            >
              {mixedCube[name].map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                  {row.map((color, colIndex) => (
                    <div
                      key={colIndex}
                      className="square"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}