
const generateInitialBoard = () => {
    let newBoard = Array(10).fill(null).map(() => Array(10).fill('x')); // Initialize all cells to 'x'

    let positions = [];
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            positions.push([i, j]);
        }
    }

    // Shuffle the positions
    positions.sort(() => Math.random() - 0.5);

    // Place the Amazons
    for (let i = 0; i < 2; i++) {
        let [x, y] = positions[i];
        newBoard[x][y] = 'wA';
    }
    for (let i = 2; i < 4; i++) {
        let [x, y] = positions[i];
        newBoard[x][y] = 'bA';
    }

    return newBoard;
};

export default generateInitialBoard;
