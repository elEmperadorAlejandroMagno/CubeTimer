import '../styles/mixer.css';
import {CUBE_TYPES, CUBE_MOVES, CUBE_MOVES_VARIANTS} from '../constants/cubeData';
import { useState } from 'react';

export default function Mixer() {
    const [mix, setMix] = useState(makeMix(CUBE_MOVES[CUBE_TYPES[0]], CUBE_MOVES_VARIANTS));
    const [cubeType, setCubeType] = useState(CUBE_TYPES[0]);

    function handleCubeTypeChange(event) {
        const selectedType = event.target.value;
        setCubeType(selectedType);
        setMix(makeMix(CUBE_MOVES[selectedType], CUBE_MOVES_VARIANTS));
    }
    function handleGenerateMix() {
        setMix(makeMix(CUBE_MOVES[cubeType], CUBE_MOVES_VARIANTS));
    }
    function makeMix(moves, movesVariants) {
        let mix = "";
        for (let i = 0; i < 20; i++) {
            const move = moves[Math.floor(Math.random() * moves.length)];
            const variant = movesVariants[Math.floor(Math.random() * movesVariants.length)];
            mix += move + variant + " ";
        }
        return mix.trim();
    }
    
    return (
        <div className="mixer">
            <div className="cube-select">
                <select name="cube-select" id="cube" onChange={handleCubeTypeChange} value={cubeType}>
                    {CUBE_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <button className="reset-mix" onClick={handleGenerateMix}>Generate Mix</button>
            </div>
            <div className="mix-container">
                <span className="mix-label">{mix}</span>
            </div>
        </div>
    );
}