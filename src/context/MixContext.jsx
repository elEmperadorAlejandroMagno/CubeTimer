import { createContext, useContext, useState, useEffect } from 'react';
import { CUBE_TYPES, CUBE_MOVES, CUBE_MOVES_VARIANTS } from '../constants/cubeData';

const MixContext = createContext();

export function MixProvider({ children }) {
    const [currentMix, setCurrentMix] = useState('');
    const [cubeType, setCubeType] = useState('3x3');

    // Generar mezcla inicial al cargar el componente
    useEffect(() => {
        generateMix(CUBE_TYPES[0]);
    }, []);

    // Generar una nueva mezcla
    const generateMix = (type = cubeType, length = 20) => {
        const moves = CUBE_MOVES[type];
        const variants = CUBE_MOVES_VARIANTS;
        let mixArr = [];

        for (let i = 0; i < length; i++) {
            let moveFull = '';
            do {
                const move = moves[Math.floor(Math.random() * moves.length)];
                const variant = variants[Math.floor(Math.random() * variants.length)];
                moveFull = move + variant;
            } while (i > 0 && moveFull[0] === mixArr[i - 1][0]);
            mixArr.push(moveFull);
        }
        
        const generatedMix = mixArr.join(' ').trim();
        setCurrentMix(generatedMix);
        return generatedMix;
    };

    // Cambiar el tipo de cubo y generar nueva mezcla
    const changeCubeType = (type) => {
        setCubeType(type);
        generateMix(type);
    };

    // Limpiar la mezcla actual
    const clearMix = () => {
        setCurrentMix('');
    };

    const value = {
        currentMix,
        cubeType,
        generateMix,
        changeCubeType,
        clearMix,
        setCurrentMix
    };

    return (
        <MixContext.Provider value={value}>
            {children}
        </MixContext.Provider>
    );
}

export function useMix() {
    const context = useContext(MixContext);
    if (!context) {
        throw new Error('useMix must be used within a MixProvider');
    }
    return context;
}
