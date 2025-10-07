const CUBE_TYPES = ['2x2', '3x3', '4x4', '5x5', '6x6', '7x7', 'Pyraminx', 'Megaminx', 'Skewb', 'Square-1'];
const CUBE_MOVES = {
    '2x2': ["U", "D", "L", "R", "F", "B"],
    '3x3': ["U", "D", "L", "R", "F", "B"],
    '4x4': ["U", "D", "L", "R", "F", "B", "Uw", "Lw", "Rw", "Fw", "Bw"],
    '5x5': ["U", "D", "L", "R", "F", "B", "Uw", "Lw", "Rw", "Fw", "Bw"],
    '6x6': ["U", "D", "L", "R", "F", "B", "Uw", "Lw", "Rw", "Fw", "Bw"],
    '7x7': ["U", "D", "L", "R", "F", "B", "Uw", "Lw", "Rw", "Fw", "Bw"],
    'Pyraminx': ["U", "L", "R", "B", "u", "l", "r", "b"],
    'Megaminx': ["R++", "R--", "D++", "D--"],
    'Skewb': ["U", "B", "L", "R", "U'", "B'", "L'", "R'"],
    'Square-1': [-1, 1, -2, 2, -3, 3, -4, 4, -5, 5, -6, 6,"U", "D"],  
}
const CUBE_MOVES_VARIANTS = ['', "'", "2"];

const CUBES_AVAILABLE_2D = ['2x2', '3x3', '4x4', '5x5', '6x6', '7x7'];

export { CUBE_TYPES, CUBE_MOVES, CUBE_MOVES_VARIANTS, CUBES_AVAILABLE_2D };