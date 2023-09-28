import Cell from "./Cell";

const Board = ({ board, onCellClick, possibleMoves }) => (
    
    <div>
        {board.map((row, i) => (
            <div key={i}>
                {row.map((cell, j) => (
                    <Cell
                        key={`${i}-${j}`}
                        value={cell}
                        onClick={() => onCellClick(i, j)}
                        isPossibleMove={possibleMoves.some(([x, y]) => x === i && y === j)}
                    />
                ))}
            </div>
        ))}
    </div>
);

export default Board;