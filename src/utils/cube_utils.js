function  createLayer(color, size) {
        let layer = []
        for (let i = 0; i < size; i++) {
            layer.push([]);
            for (let j = 0; j < size; j++) {
            layer[i][j] = color;
            }
        }
    return layer
    }

export default function getCube2D(size, layers = 6) {

        let cube = {};
        // Orden estándar del cubo de Rubik: Top, Front, Right, Back, Left, Bottom
        let faceNames = ["top", "front", "right", "back", "left", "bottom"];
        let colors = ["white", "green", "red", "blue", "orange", "yellow"];
        
        for (let i = 0; i < layers; i++) {
            cube[faceNames[i]] = createLayer(colors[i], size);
        }
        return cube;
    }

console.log(getCube2D());