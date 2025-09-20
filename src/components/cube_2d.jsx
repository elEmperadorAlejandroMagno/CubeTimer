import '../styles/cube_2d.css';
import { getCube2D, mixCube2D } from '../utils/cube_utils.js';
import { useCubeType } from '../context/CubeTypeContext';
import { useMix } from '../context/MixContext';

export default function Cube2d() {
  const { cubeType } = useCubeType();
  const { currentMix } = useMix();
  const size = Number(String(cubeType).split('x')[0]) || 3;
  const cube = getCube2D(size);
  const mixedCube = mixCube2D(currentMix, cube);

  // Orden y posiciones para la red 2D (net)
  const faceOrder = [
    { name: 'top', style: { gridColumn: '2', gridRow: '1' } },
    { name: 'left', style: { gridColumn: '1', gridRow: '2' } },
    { name: 'front', style: { gridColumn: '2', gridRow: '2' } },
    { name: 'right', style: { gridColumn: '3', gridRow: '2' } },
    { name: 'back', style: { gridColumn: '4', gridRow: '2' } },
    { name: 'bottom', style: { gridColumn: '2', gridRow: '3' } },
  ];

  return (
    <div className="cube-2d">
      <div className="cube-net">
        {faceOrder.map(({ name, style }) => (
          <div key={name} className={`face ${name}`} style={style}>
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
  );
}