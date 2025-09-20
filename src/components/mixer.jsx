import '../styles/mixer.css';
import {CUBE_TYPES} from '../constants/cubeData';
import { useMix } from '../context/MixContext';

export default function Mixer() {
    const { currentMix, cubeType, generateMix, changeCubeType } = useMix();

    function handleCubeTypeChange(event) {
        const selectedType = event.target.value;
        changeCubeType(selectedType);
    }
    
    function handleGenerateMix() {
        generateMix();
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
                <span className="mix-label">{currentMix}</span>
            </div>
        </div>
    );
}