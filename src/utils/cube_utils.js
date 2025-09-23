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

export function getCube2D(size, layers = 6) {

        let cube = {};
        // Orden estándar del cubo de Rubik: Top, Front, Right, Back, Left, Bottom
        let faceNames = ["top", "front", "right", "back", "left", "bottom"];
        let colors = ["white", "green", "red", "blue", "orange", "yellow"];
        
        for (let i = 0; i < layers; i++) {
            cube[faceNames[i]] = createLayer(colors[i], size);
        }
        return cube;
    }

export function mixCube2D(algorithm, cube) {
    const moves = algorithm.trim().split(/\s+/);
    for (let move of moves) {
        if (makeMove[move]) {
            makeMove[move](cube);
        }
    }
    return cube;
}

// Mapeo de movimientos a funciones
const makeMove = {
    'R': (cube) => moveR(cube),
    "R'": (cube) => moveRPrime(cube),
    'R2': (cube) => moveR2(cube),
    'L': (cube) => moveL(cube),
    "L'": (cube) => moveLPrime(cube),
    'L2': (cube) => moveL2(cube),
    'U': (cube) => moveU(cube),
    "U'": (cube) => moveUPrime(cube),
    'U2': (cube) => moveU2(cube),
    'D': (cube) => moveD(cube),
    "D'": (cube) => moveDPrime(cube),
    'D2': (cube) => moveD2(cube),
    'F': (cube) => moveF(cube),
    "F'": (cube) => moveFPrime(cube),
    'F2': (cube) => moveF2(cube),
    'B': (cube) => moveB(cube),
    "B'": (cube) => moveBPrime(cube),
    'B2': (cube) => moveB2(cube),
    // Movimientos de capas anchas (wide moves)
    'Rw': (cube) => moveRw(cube),
    "Rw'": (cube) => moveRwPrime(cube),
    'Rw2': (cube) => moveRw2(cube),
    'Lw': (cube) => moveLw(cube),
    "Lw'": (cube) => moveLwPrime(cube),
    'Lw2': (cube) => moveLw2(cube),
    'Uw': (cube) => moveUw(cube),
    "Uw'": (cube) => moveUwPrime(cube),
    'Uw2': (cube) => moveUw2(cube),
    'Dw': (cube) => moveDw(cube),
    "Dw'": (cube) => moveDwPrime(cube),
    'Dw2': (cube) => moveDw2(cube),
    'Fw': (cube) => moveFw(cube),
    "Fw'": (cube) => moveFwPrime(cube),
    'Fw2': (cube) => moveFw2(cube),
    'Bw': (cube) => moveBw(cube),
    "Bw'": (cube) => moveBwPrime(cube),
    'Bw2': (cube) => moveBw2(cube),
}

// Funciones de movimiento U (Top)
function moveU(cube) {
    // Rotar la cara superior en sentido horario
    cube.top = rotateMatrixClockwise(cube.top);
    
    // Intercambiar las primeras filas de las caras laterales
    const size = cube.top.length;
    const temp = [];
    
    // Guardar la primera fila del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[0][i];
    }
    
    // front <- right
    for (let i = 0; i < size; i++) {
        cube.front[0][i] = cube.right[0][i];
    }
    
    // right <- back
    for (let i = 0; i < size; i++) {
        cube.right[0][i] = cube.back[0][i];
    }
    
    // back <- left
    for (let i = 0; i < size; i++) {
        cube.back[0][i] = cube.left[0][i];
    }
    
    // left <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.left[0][i] = temp[i];
    }
    
    return cube;
}

function moveUPrime(cube) {
    // Rotar la cara superior en sentido antihorario
    cube.top = rotateMatrixCounterClockwise(cube.top);
    
    // Intercambiar las primeras filas en dirección opuesta
    const size = cube.top.length;
    const temp = [];
    
    // Guardar la primera fila del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[0][i];
    }
    
    // front <- left
    for (let i = 0; i < size; i++) {
        cube.front[0][i] = cube.left[0][i];
    }
    
    // left <- back
    for (let i = 0; i < size; i++) {
        cube.left[0][i] = cube.back[0][i];
    }
    
    // back <- right
    for (let i = 0; i < size; i++) {
        cube.back[0][i] = cube.right[0][i];
    }
    
    // right <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.right[0][i] = temp[i];
    }
    
    return cube;
}

function moveU2(cube) {
    moveU(cube);
    moveU(cube);
    return cube;
}

// Funciones de movimiento D (Bottom)
function moveD(cube) {
    // Rotar la cara inferior en sentido horario
    cube.bottom = rotateMatrixClockwise(cube.bottom);
    
    // Intercambiar las últimas filas de las caras laterales
    const size = cube.bottom.length;
    const lastRow = size - 1;
    const temp = [];
    
    // Guardar la última fila del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[lastRow][i];
    }
    
    // front <- left
    for (let i = 0; i < size; i++) {
        cube.front[lastRow][i] = cube.left[lastRow][i];
    }
    
    // left <- back
    for (let i = 0; i < size; i++) {
        cube.left[lastRow][i] = cube.back[lastRow][i];
    }
    
    // back <- right
    for (let i = 0; i < size; i++) {
        cube.back[lastRow][i] = cube.right[lastRow][i];
    }
    
    // right <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.right[lastRow][i] = temp[i];
    }
    
    return cube;
}

function moveDPrime(cube) {
    // Rotar la cara inferior en sentido antihorario
    cube.bottom = rotateMatrixCounterClockwise(cube.bottom);
    
    // Intercambiar las últimas filas en dirección opuesta
    const size = cube.bottom.length;
    const lastRow = size - 1;
    const temp = [];
    
    // Guardar la última fila del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[lastRow][i];
    }
    
    // front <- right
    for (let i = 0; i < size; i++) {
        cube.front[lastRow][i] = cube.right[lastRow][i];
    }
    
    // right <- back
    for (let i = 0; i < size; i++) {
        cube.right[lastRow][i] = cube.back[lastRow][i];
    }
    
    // back <- left
    for (let i = 0; i < size; i++) {
        cube.back[lastRow][i] = cube.left[lastRow][i];
    }
    
    // left <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.left[lastRow][i] = temp[i];
    }
    
    return cube;
}

function moveD2(cube) {
    moveD(cube);
    moveD(cube);
    return cube;
}

// Funciones de movimiento R (Right)
function moveR(cube) {
    // Rotar la cara derecha en sentido horario
    cube.right = rotateMatrixClockwise(cube.right);
    
    // Intercambiar las columnas derechas
    const size = cube.right.length;
    const lastCol = size - 1;
    const temp = [];
    
    // Guardar la última columna del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[i][lastCol];
    }
    
    // front <- bottom
    for (let i = 0; i < size; i++) {
        cube.front[i][lastCol] = cube.bottom[i][lastCol];
    }
    
    // bottom <- back (invertido)
    for (let i = 0; i < size; i++) {
        cube.bottom[i][lastCol] = cube.back[size - 1 - i][0];
    }
    
    // back <- top (invertido)
    for (let i = 0; i < size; i++) {
        cube.back[i][0] = cube.top[size - 1 - i][lastCol];
    }
    
    // top <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.top[i][lastCol] = temp[i];
    }
    
    return cube;
}

function moveRPrime(cube) {
    // Rotar la cara derecha en sentido antihorario
    cube.right = rotateMatrixCounterClockwise(cube.right);
    
    // Intercambiar las columnas derechas en dirección opuesta
    const size = cube.right.length;
    const lastCol = size - 1;
    const temp = [];
    
    // Guardar la última columna del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[i][lastCol];
    }
    
    // front <- top
    for (let i = 0; i < size; i++) {
        cube.front[i][lastCol] = cube.top[i][lastCol];
    }
    
    // top <- back (invertido)
    for (let i = 0; i < size; i++) {
        cube.top[i][lastCol] = cube.back[size - 1 - i][0];
    }
    
    // back <- bottom (invertido)
    for (let i = 0; i < size; i++) {
        cube.back[i][0] = cube.bottom[size - 1 - i][lastCol];
    }
    
    // bottom <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.bottom[i][lastCol] = temp[i];
    }
    
    return cube;
}

function moveR2(cube) {
    moveR(cube);
    moveR(cube);
    return cube;
}

// Funciones de movimiento L (Left)
function moveL(cube) {
    // Rotar la cara izquierda en sentido horario
    cube.left = rotateMatrixClockwise(cube.left);
    
    // Intercambiar las columnas izquierdas
    const size = cube.left.length;
    const temp = [];
    
    // Guardar la primera columna del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[i][0];
    }
    
    // front <- top
    for (let i = 0; i < size; i++) {
        cube.front[i][0] = cube.top[i][0];
    }
    
    // top <- back (invertido)
    for (let i = 0; i < size; i++) {
        cube.top[i][0] = cube.back[size - 1 - i][size - 1];
    }
    
    // back <- bottom (invertido)
    for (let i = 0; i < size; i++) {
        cube.back[i][size - 1] = cube.bottom[size - 1 - i][0];
    }
    
    // bottom <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.bottom[i][0] = temp[i];
    }
    
    return cube;
}

function moveLPrime(cube) {
    // Rotar la cara izquierda en sentido antihorario
    cube.left = rotateMatrixCounterClockwise(cube.left);
    
    // Intercambiar las columnas izquierdas en dirección opuesta
    const size = cube.left.length;
    const temp = [];
    
    // Guardar la primera columna del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[i][0];
    }
    
    // front <- bottom
    for (let i = 0; i < size; i++) {
        cube.front[i][0] = cube.bottom[i][0];
    }
    
    // bottom <- back (invertido)
    for (let i = 0; i < size; i++) {
        cube.bottom[i][0] = cube.back[size - 1 - i][size - 1];
    }
    
    // back <- top (invertido)
    for (let i = 0; i < size; i++) {
        cube.back[i][size - 1] = cube.top[size - 1 - i][0];
    }
    
    // top <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.top[i][0] = temp[i];
    }
    
    return cube;
}

function moveL2(cube) {
    moveL(cube);
    moveL(cube);
    return cube;
}

// Funciones de movimiento F (Front)
function moveF(cube) {
    // Rotar la cara frontal en sentido horario
    cube.front = rotateMatrixClockwise(cube.front);
    
    // Intercambiar las aristas que tocan la cara frontal
    const size = cube.front.length;
    const lastRow = size - 1;
    const temp = [];
    
    // Guardar la última fila del top
    for (let i = 0; i < size; i++) {
        temp[i] = cube.top[lastRow][i];
    }
    
    // top <- left (columna derecha, invertida)
    for (let i = 0; i < size; i++) {
        cube.top[lastRow][i] = cube.left[lastRow - i][lastRow];
    }
    
    // left (columna derecha) <- bottom (primera fila)
    for (let i = 0; i < size; i++) {
        cube.left[i][lastRow] = cube.bottom[0][i];
    }
    
    // bottom (primera fila) <- right (columna izquierda, invertida)
    for (let i = 0; i < size; i++) {
        cube.bottom[0][i] = cube.right[lastRow - i][0];
    }
    
    // right (columna izquierda) <- temp (top original)
    for (let i = 0; i < size; i++) {
        cube.right[i][0] = temp[i];
    }
    
    return cube;
}

function moveFPrime(cube) {
    // Rotar la cara frontal en sentido antihorario
    cube.front = rotateMatrixCounterClockwise(cube.front);
    
    // Intercambiar las aristas en dirección opuesta
    const size = cube.front.length;
    const lastRow = size - 1;
    const temp = [];
    
    // Guardar la última fila del top
    for (let i = 0; i < size; i++) {
        temp[i] = cube.top[lastRow][i];
    }
    
    // top <- right (columna izquierda)
    for (let i = 0; i < size; i++) {
        cube.top[lastRow][i] = cube.right[i][0];
    }
    
    // right (columna izquierda) <- bottom (primera fila, invertida)
    for (let i = 0; i < size; i++) {
        cube.right[i][0] = cube.bottom[0][lastRow - i];
    }
    
    // bottom (primera fila) <- left (columna derecha)
    for (let i = 0; i < size; i++) {
        cube.bottom[0][i] = cube.left[i][lastRow];
    }
    
    // left (columna derecha) <- temp (top original, invertido)
    for (let i = 0; i < size; i++) {
        cube.left[i][lastRow] = temp[lastRow - i];
    }
    
    return cube;
}

function moveF2(cube) {
    moveF(cube);
    moveF(cube);
    return cube;
}

// Funciones de movimiento B (Back)
function moveB(cube) {
    // Rotar la cara trasera en sentido horario
    cube.back = rotateMatrixClockwise(cube.back);
    
    // Intercambiar las aristas que tocan la cara trasera
    const size = cube.back.length;
    const lastCol = size - 1;
    const temp = [];
    
    // Guardar la primera fila del top
    for (let i = 0; i < size; i++) {
        temp[i] = cube.top[0][i];
    }
    
    // top (primera fila) <- right (columna derecha)
    for (let i = 0; i < size; i++) {
        cube.top[0][i] = cube.right[i][lastCol];
    }
    
    // right (columna derecha) <- bottom (última fila, invertida)
    for (let i = 0; i < size; i++) {
        cube.right[i][lastCol] = cube.bottom[size - 1][lastCol - i];
    }
    
    // bottom (última fila) <- left (columna izquierda)
    for (let i = 0; i < size; i++) {
        cube.bottom[size - 1][i] = cube.left[i][0];
    }
    
    // left (columna izquierda) <- temp (top original, invertido)
    for (let i = 0; i < size; i++) {
        cube.left[i][0] = temp[lastCol - i];
    }
    
    return cube;
}

function moveBPrime(cube) {
    // Rotar la cara trasera en sentido antihorario
    cube.back = rotateMatrixCounterClockwise(cube.back);
    
    // Intercambiar las aristas en dirección opuesta
    const size = cube.back.length;
    const lastCol = size - 1;
    const temp = [];
    
    // Guardar la primera fila del top
    for (let i = 0; i < size; i++) {
        temp[i] = cube.top[0][i];
    }
    
    // top (primera fila) <- left (columna izquierda, invertida)
    for (let i = 0; i < size; i++) {
        cube.top[0][i] = cube.left[lastCol - i][0];
    }
    
    // left (columna izquierda) <- bottom (última fila)
    for (let i = 0; i < size; i++) {
        cube.left[i][0] = cube.bottom[size - 1][i];
    }
    
    // bottom (última fila) <- right (columna derecha, invertida)
    for (let i = 0; i < size; i++) {
        cube.bottom[size - 1][i] = cube.right[lastCol - i][lastCol];
    }
    
    // right (columna derecha) <- temp (top original)
    for (let i = 0; i < size; i++) {
        cube.right[i][lastCol] = temp[i];
    }
    
    return cube;
}

function moveB2(cube) {
    moveB(cube);
    moveB(cube);
    return cube;
}

// Funciones de movimiento Rw (Right wide) - mueve las dos capas derechas
function moveRw(cube) {
    // Realizar movimiento R normal
    moveR(cube);
    
    // Realizar movimiento de la capa interna (segunda desde la derecha)
    const size = cube.right.length;
    const col = size - 2; // Segunda columna desde la derecha
    const temp = [];
    
    // Guardar la segunda columna desde la derecha del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[i][col];
    }
    
    // front <- bottom
    for (let i = 0; i < size; i++) {
        cube.front[i][col] = cube.bottom[i][col];
    }
    
    // bottom <- back (invertido)
    for (let i = 0; i < size; i++) {
        cube.bottom[i][col] = cube.back[size - 1 - i][1]; // Segunda desde la izquierda en back
    }
    
    // back <- top (invertido)
    for (let i = 0; i < size; i++) {
        cube.back[i][1] = cube.top[size - 1 - i][col];
    }
    
    // top <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.top[i][col] = temp[i];
    }
    
    return cube;
}

function moveRwPrime(cube) {
    // Realizar movimiento R' normal
    moveRPrime(cube);
    
    // Realizar movimiento inverso de la capa interna
    const size = cube.right.length;
    const col = size - 2; // Segunda columna desde la derecha
    const temp = [];
    
    // Guardar la segunda columna desde la derecha del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[i][col];
    }
    
    // front <- top
    for (let i = 0; i < size; i++) {
        cube.front[i][col] = cube.top[i][col];
    }
    
    // top <- back (invertido)
    for (let i = 0; i < size; i++) {
        cube.top[i][col] = cube.back[size - 1 - i][1];
    }
    
    // back <- bottom (invertido)
    for (let i = 0; i < size; i++) {
        cube.back[i][1] = cube.bottom[size - 1 - i][col];
    }
    
    // bottom <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.bottom[i][col] = temp[i];
    }
    
    return cube;
}

function moveRw2(cube) {
    moveRw(cube);
    moveRw(cube);
    return cube;
}

// Funciones de movimiento Lw (Left wide) - mueve las dos capas izquierdas
function moveLw(cube) {
    // Realizar movimiento L normal
    moveL(cube);
    
    // Realizar movimiento de la capa interna (segunda desde la izquierda)
    const size = cube.left.length;
    const col = 1; // Segunda columna desde la izquierda
    const temp = [];
    
    // Guardar la segunda columna desde la izquierda del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[i][col];
    }
    
    // front <- top
    for (let i = 0; i < size; i++) {
        cube.front[i][col] = cube.top[i][col];
    }
    
    // top <- back (invertido)
    for (let i = 0; i < size; i++) {
        cube.top[i][col] = cube.back[size - 1 - i][size - 2]; // Segunda desde la derecha en back
    }
    
    // back <- bottom (invertido)
    for (let i = 0; i < size; i++) {
        cube.back[i][size - 2] = cube.bottom[size - 1 - i][col];
    }
    
    // bottom <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.bottom[i][col] = temp[i];
    }
    
    return cube;
}

function moveLwPrime(cube) {
    // Realizar movimiento L' normal
    moveLPrime(cube);
    
    // Realizar movimiento inverso de la capa interna
    const size = cube.left.length;
    const col = 1; // Segunda columna desde la izquierda
    const temp = [];
    
    // Guardar la segunda columna desde la izquierda del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[i][col];
    }
    
    // front <- bottom
    for (let i = 0; i < size; i++) {
        cube.front[i][col] = cube.bottom[i][col];
    }
    
    // bottom <- back (invertido)
    for (let i = 0; i < size; i++) {
        cube.bottom[i][col] = cube.back[size - 1 - i][size - 2];
    }
    
    // back <- top (invertido)
    for (let i = 0; i < size; i++) {
        cube.back[i][size - 2] = cube.top[size - 1 - i][col];
    }
    
    // top <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.top[i][col] = temp[i];
    }
    
    return cube;
}

function moveLw2(cube) {
    moveLw(cube);
    moveLw(cube);
    return cube;
}

// Funciones de movimiento Uw (Up wide) - mueve las dos capas superiores
function moveUw(cube) {
    // Realizar movimiento U normal
    moveU(cube);
    
    // Realizar movimiento de la capa interna (segunda desde arriba)
    const size = cube.top.length;
    const row = 1; // Segunda fila desde arriba
    const temp = [];
    
    // Guardar la segunda fila del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[row][i];
    }
    
    // front <- right
    for (let i = 0; i < size; i++) {
        cube.front[row][i] = cube.right[row][i];
    }
    
    // right <- back
    for (let i = 0; i < size; i++) {
        cube.right[row][i] = cube.back[row][i];
    }
    
    // back <- left
    for (let i = 0; i < size; i++) {
        cube.back[row][i] = cube.left[row][i];
    }
    
    // left <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.left[row][i] = temp[i];
    }
    
    return cube;
}

function moveUwPrime(cube) {
    // Realizar movimiento U' normal
    moveUPrime(cube);
    
    // Realizar movimiento inverso de la capa interna
    const size = cube.top.length;
    const row = 1; // Segunda fila desde arriba
    const temp = [];
    
    // Guardar la segunda fila del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[row][i];
    }
    
    // front <- left
    for (let i = 0; i < size; i++) {
        cube.front[row][i] = cube.left[row][i];
    }
    
    // left <- back
    for (let i = 0; i < size; i++) {
        cube.left[row][i] = cube.back[row][i];
    }
    
    // back <- right
    for (let i = 0; i < size; i++) {
        cube.back[row][i] = cube.right[row][i];
    }
    
    // right <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.right[row][i] = temp[i];
    }
    
    return cube;
}

function moveUw2(cube) {
    moveUw(cube);
    moveUw(cube);
    return cube;
}

// Funciones de movimiento Dw (Down wide) - mueve las dos capas inferiores
function moveDw(cube) {
    // Realizar movimiento D normal
    moveD(cube);
    
    // Realizar movimiento de la capa interna (segunda desde abajo)
    const size = cube.bottom.length;
    const row = size - 2; // Segunda fila desde abajo
    const temp = [];
    
    // Guardar la segunda fila desde abajo del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[row][i];
    }
    
    // front <- left
    for (let i = 0; i < size; i++) {
        cube.front[row][i] = cube.left[row][i];
    }
    
    // left <- back
    for (let i = 0; i < size; i++) {
        cube.left[row][i] = cube.back[row][i];
    }
    
    // back <- right
    for (let i = 0; i < size; i++) {
        cube.back[row][i] = cube.right[row][i];
    }
    
    // right <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.right[row][i] = temp[i];
    }
    
    return cube;
}

function moveDwPrime(cube) {
    // Realizar movimiento D' normal
    moveDPrime(cube);
    
    // Realizar movimiento inverso de la capa interna
    const size = cube.bottom.length;
    const row = size - 2; // Segunda fila desde abajo
    const temp = [];
    
    // Guardar la segunda fila desde abajo del frente
    for (let i = 0; i < size; i++) {
        temp[i] = cube.front[row][i];
    }
    
    // front <- right
    for (let i = 0; i < size; i++) {
        cube.front[row][i] = cube.right[row][i];
    }
    
    // right <- back
    for (let i = 0; i < size; i++) {
        cube.right[row][i] = cube.back[row][i];
    }
    
    // back <- left
    for (let i = 0; i < size; i++) {
        cube.back[row][i] = cube.left[row][i];
    }
    
    // left <- temp (front original)
    for (let i = 0; i < size; i++) {
        cube.left[row][i] = temp[i];
    }
    
    return cube;
}

function moveDw2(cube) {
    moveDw(cube);
    moveDw(cube);
    return cube;
}

// Funciones de movimiento Fw (Front wide) - mueve las dos capas frontales
function moveFw(cube) {
    // Realizar movimiento F normal
    moveF(cube);
    
    // Realizar movimiento de la capa interna (segunda desde el frente)
    const size = cube.front.length;
    const lastRow = size - 1;
    const row = size - 2; // Segunda fila desde abajo en top/bottom
    const temp = [];
    
    // Guardar la segunda fila desde abajo del top
    for (let i = 0; i < size; i++) {
        temp[i] = cube.top[row][i];
    }
    
    // top <- left (segunda columna desde la derecha, invertida)
    for (let i = 0; i < size; i++) {
        cube.top[row][i] = cube.left[lastRow - i][size - 2];
    }
    
    // left (segunda columna desde la derecha) <- bottom (segunda fila desde arriba)
    for (let i = 0; i < size; i++) {
        cube.left[i][size - 2] = cube.bottom[1][i];
    }
    
    // bottom (segunda fila desde arriba) <- right (segunda columna desde la izquierda, invertida)
    for (let i = 0; i < size; i++) {
        cube.bottom[1][i] = cube.right[lastRow - i][1];
    }
    
    // right (segunda columna desde la izquierda) <- temp (top original)
    for (let i = 0; i < size; i++) {
        cube.right[i][1] = temp[i];
    }
    
    return cube;
}

function moveFwPrime(cube) {
    // Realizar movimiento F' normal
    moveFPrime(cube);
    
    // Realizar movimiento inverso de la capa interna
    const size = cube.front.length;
    const lastRow = size - 1;
    const row = size - 2; // Segunda fila desde abajo en top/bottom
    const temp = [];
    
    // Guardar la segunda fila desde abajo del top
    for (let i = 0; i < size; i++) {
        temp[i] = cube.top[row][i];
    }
    
    // top <- right (segunda columna desde la izquierda)
    for (let i = 0; i < size; i++) {
        cube.top[row][i] = cube.right[i][1];
    }
    
    // right (segunda columna desde la izquierda) <- bottom (segunda fila desde arriba, invertida)
    for (let i = 0; i < size; i++) {
        cube.right[i][1] = cube.bottom[1][lastRow - i];
    }
    
    // bottom (segunda fila desde arriba) <- left (segunda columna desde la derecha)
    for (let i = 0; i < size; i++) {
        cube.bottom[1][i] = cube.left[i][size - 2];
    }
    
    // left (segunda columna desde la derecha) <- temp (top original, invertido)
    for (let i = 0; i < size; i++) {
        cube.left[i][size - 2] = temp[lastRow - i];
    }
    
    return cube;
}

function moveFw2(cube) {
    moveFw(cube);
    moveFw(cube);
    return cube;
}

// Funciones de movimiento Bw (Back wide) - mueve las dos capas traseras
function moveBw(cube) {
    // Realizar movimiento B normal
    moveB(cube);
    
    // Realizar movimiento de la capa interna (segunda desde atrás)
    const size = cube.back.length;
    const lastCol = size - 1;
    const row = 1; // Segunda fila desde arriba
    const temp = [];
    
    // Guardar la segunda fila desde arriba del top
    for (let i = 0; i < size; i++) {
        temp[i] = cube.top[row][i];
    }
    
    // top (segunda fila desde arriba) <- right (segunda columna desde la derecha)
    for (let i = 0; i < size; i++) {
        cube.top[row][i] = cube.right[i][size - 2];
    }
    
    // right (segunda columna desde la derecha) <- bottom (segunda fila desde abajo, invertida)
    for (let i = 0; i < size; i++) {
        cube.right[i][size - 2] = cube.bottom[size - 2][lastCol - i];
    }
    
    // bottom (segunda fila desde abajo) <- left (segunda columna desde la izquierda)
    for (let i = 0; i < size; i++) {
        cube.bottom[size - 2][i] = cube.left[i][1];
    }
    
    // left (segunda columna desde la izquierda) <- temp (top original, invertido)
    for (let i = 0; i < size; i++) {
        cube.left[i][1] = temp[lastCol - i];
    }
    
    return cube;
}

function moveBwPrime(cube) {
    // Realizar movimiento B' normal
    moveBPrime(cube);
    
    // Realizar movimiento inverso de la capa interna
    const size = cube.back.length;
    const lastCol = size - 1;
    const row = 1; // Segunda fila desde arriba
    const temp = [];
    
    // Guardar la segunda fila desde arriba del top
    for (let i = 0; i < size; i++) {
        temp[i] = cube.top[row][i];
    }
    
    // top (segunda fila desde arriba) <- left (segunda columna desde la izquierda, invertida)
    for (let i = 0; i < size; i++) {
        cube.top[row][i] = cube.left[lastCol - i][1];
    }
    
    // left (segunda columna desde la izquierda) <- bottom (segunda fila desde abajo)
    for (let i = 0; i < size; i++) {
        cube.left[i][1] = cube.bottom[size - 2][i];
    }
    
    // bottom (segunda fila desde abajo) <- right (segunda columna desde la derecha, invertida)
    for (let i = 0; i < size; i++) {
        cube.bottom[size - 2][i] = cube.right[lastCol - i][size - 2];
    }
    
    // right (segunda columna desde la derecha) <- temp (top original)
    for (let i = 0; i < size; i++) {
        cube.right[i][size - 2] = temp[i];
    }
    
    return cube;
}

function moveBw2(cube) {
    moveBw(cube);
    moveBw(cube);
    return cube;
}

// movimientos Rw, Lw, Uw, Dw, Fw, Bw (doble capa) se pueden implementar de manera similar





function rotateMatrixClockwise(matrix) {
  const n = matrix.length;
  const result = Array.from({ length: n }, () => Array(n));
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      result[j][n - 1 - i] = matrix[i][j];
  return result;
}

function rotateMatrixCounterClockwise(matrix) {
  const n = matrix.length;
  const result = Array.from({ length: n }, () => Array(n));
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      result[n - 1 - j][i] = matrix[i][j];
  return result;
}

export default { mixCube2D, getCube2D };