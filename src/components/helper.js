const generateInitialBoard = () => {
    // Erstelle ein leeres 10x10-Brett
    const newBoard = Array(10).fill(null).map(() => Array(10).fill('-1'));

    // Setze die Amazonen für Spieler 1 (Weiß)
    newBoard[0][3] = '0';
    newBoard[0][6] = '0';
    newBoard[3][0] = '0';
    newBoard[3][9] = '0';

    // Setze die Amazonen für Spieler 2 (Schwarz)
    newBoard[6][0] = '1';
    newBoard[6][9] = '1';
    newBoard[9][3] = '1';
    newBoard[9][6] = '1';

    return newBoard;
};

export default generateInitialBoard;
