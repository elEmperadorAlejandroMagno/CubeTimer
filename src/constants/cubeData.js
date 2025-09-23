const CUBE_TYPES = ['2x2', '3x3', '4x4', '5x5', '6x6', '7x7', 'Pyraminx', 'Megaminx', 'Skewb'];
const CUBE_MOVES = {
    '2x2': ["U", "D", "L", "R", "F", "B"],
    '3x3': ["U", "D", "L", "R", "F", "B"],
    '4x4': ["U", "D", "L", "R", "F", "B", "Uw", "Lw", "Rw", "Fw", "Bw"],
    '5x5': ["U", "D", "L", "R", "F", "B", "Uw", "Lw", "Rw", "Fw", "Bw"],
    '6x6': ["U", "D", "L", "R", "F", "B", "Uw", "Lw", "Rw", "Fw", "Bw"],
    '7x7': ["U", "D", "L", "R", "F", "B", "Uw", "Lw", "Rw", "Fw", "Bw"],
    'Pyraminx': ["U", "L", "R", "B", "Uw", "Lw", "Rw", "Bw"],
    'Megaminx': ["PENDIENTE"],
    'Skewb': ["U", "D", "L", "R"]   
}
const CUBE_MOVES_VARIANTS = ['', "'", "2"];

export { CUBE_TYPES, CUBE_MOVES, CUBE_MOVES_VARIANTS };