const CUBE_TYPES = ['2x2', '3x3', '4x4', '5x5', '6x6', '7x7', 'Pyraminx', 'Megaminx', 'Skewb'];
const CUBE_MOVES = {
    '2x2': ['U', "U", 'D', "D", 'L', "L", 'R', "R", 'F', "F", 'B', "B"],
    '3x3': ['U', "U", 'D', "D", 'L', "L", 'R', "R", 'F', "F", 'B', "B"],
    '4x4': ['U', "U", 'D', "D", 'L', "L", 'R', "R", 'F', "F", 'B', "B", 'u', "u", 'd', "d", 'l', "l", 'r', "r", 'f', "f", 'b', "b"],
    '5x5': ['U', "U", 'D', "D", 'L', "L", 'R', "R", 'F', "F", 'B', "B", 'u', "u", 'd', "d", 'l', "l", 'r', "r", 'f', "f", 'b', "b"],
    '6x6': ['U', "U", 'D', "D", 'L', "L", 'R', "R", 'F', "F", 'B', "B", 'u', "u", 'd', "d", 'l', "l", 'r', "r", 'f', "f", 'b', "b", 'Uw', "Uw", 'Dw', "Dw", 'Lw', "Lw", 'Rw', "Rw", 'Fw', "Fw", 'Bw', "Bw"],
    '7x7': ['U', "U", 'D', "D", 'L', "L", 'R', "R", 'F', "F", 'B', "B", 'u', "u", 'd', "d", 'l', "l", 'r', "r", 'f', "f", 'b', "b", 'Uw', "Uw", "Dw", "Dw", 'Lw', "Lw", "Rw", "Rw", 'Fw', "Fw", "Bw", "Bw"],
    'Pyraminx': ['U', "U", 'L', "L", 'R', "R", 'B', "B", 'u', "u", 'l', "l", 'r', "r", 'b', "b"],
    'Megaminx': ["PENDIENTE"],
    'Skewb': ['U', "U", 'D', "D", 'L', "L", 'R', "R"]   
}
const CUBE_MOVES_VARIANTS = ['', "'", "2"];

export { CUBE_TYPES, CUBE_MOVES, CUBE_MOVES_VARIANTS };