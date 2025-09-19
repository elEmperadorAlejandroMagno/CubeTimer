import { createContext, useContext, useState } from 'react';

const CubeTypeContext = createContext();

export function CubeTypeProvider({ children }) {
  const [cubeType, setCubeType] = useState('3x3');
  return (
    <CubeTypeContext.Provider value={{ cubeType, setCubeType }}>
      {children}
    </CubeTypeContext.Provider>
  );
}

export function useCubeType() {
  return useContext(CubeTypeContext);
}