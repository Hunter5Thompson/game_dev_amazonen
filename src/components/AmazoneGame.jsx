import React, { useState} from 'react';
import generateRandomBoard from './helper';
import Board from './Board';
import GameOverPopup from './GameOverPopup';
import axios from 'axios';


  

const GameLogic = ({ playerId, gameId }) => {
  const [board, setBoard] = useState(generateRandomBoard());
  const [currentPlayer, setCurrentPlayer] = useState('0');
  const [gameOver, setGameOver] = useState(false);
  const [selectedAmazon, setSelectedAmazon] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [arrowPhase, setArrowPhase] = useState(false);
  console.log("Player ID:", playerId);
  console.log("Game ID:", gameId);
  const selectAmazon = (i, j) => {
    if (board[i][j] === currentPlayer) {
      setSelectedAmazon([i, j]);
    }
  };

  const getPossibleMoves = (arrowPos) => {
    if (selectedAmazon === null) {
      return [];
    }

    let [x, y] = selectedAmazon;
    let possibleMoves = [];

    // Check all cells on the board
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        // Check if the cell is on the same row, column, or diagonal as the selected Amazon
        if (i === x || j === y || Math.abs(i - x) === Math.abs(j - y)) {
          // Check if all cells between the selected Amazon and this cell are empty
          let dx = i > x ? 1 : i < x ? -1 : 0;
          let dy = j > y ? 1 : j < y ? -1 : 0;
          let x1 = x + dx, y1 = y + dy;
          while (x1 !== i || y1 !== j) {
            if (board[x1][y1] === '0' || board[x1][y1] === '1' || board[x1][y1] === '-2') {
              break;
            }
            x1 += dx;
            y1 += dy;
          }
          // If all cells between the selected Amazon and this cell are empty, this cell is a possible move
          if (x1 === i && y1 === j && board[i][j] === '-1') {
            possibleMoves.push([i, j]);
          }
        }
      }
    }

    // Check if the arrow position is also on the board
    if (arrowPos && (arrowPos[0] < 0 || arrowPos[0] >= 10 || arrowPos[1] < 0 || arrowPos[1] >= 10)) {
      return [];
    }

    return possibleMoves;
  };


  

  const handleCellClick =async (i, j) => {
    if (arrowPhase) {
      if (getPossibleMoves().some(([x, y]) => x === i && y === j) && board[i][j] === '-1') {
        if (selectedDestination !== null) {  // Überprüfung hinzugefügt
          let newBoard = [...board];
          newBoard[i][j] = '-2';
          setBoard(newBoard);
          setSelectedAmazon(null);
          setArrowPhase(false);
          moveAmazon(selectedAmazon, selectedDestination, [i, j]); // Pfeilposition als drittes Argument übergeben
          if (checkGameOver(currentPlayer)) {
            setGameOver(true);
          } else {
            setCurrentPlayer(currentPlayer === '0' ? '1' : '0');
          }
        } else {
          console.error("selectedDestination ist nicht gesetzt");
        }
      }
    } else if (board[i][j] === currentPlayer) {
      selectAmazon(i, j);
    } else if (selectedAmazon !== null && getPossibleMoves().some(([x, y]) => x === i && y === j)) {
      setSelectedDestination([i, j]); // Speichern Sie die Endposition
      setArrowPhase(true);
    }
  };

  const moveAmazon = async (startPos, endPos, arrowPos) => {
    console.log("Player ID:", playerId);
    console.log("Game ID:", gameId);
    console.log("moveAmazon function called");
    console.log("Start position:", startPos);
    console.log("End position:", endPos);
    console.log("Arrow position:", arrowPos);

    if (gameOver) {
      console.log("Game is over, move not allowed");
      return;
    }

    let newBoard = [...board];
    if (newBoard[startPos[0]][startPos[1]] !== currentPlayer) {
      console.log("Invalid start position");
      return;
    }

    if (!startPos || !endPos || !arrowPos) {
      console.error("Ungültige Werte für startPos, endPos oder arrowPos");
      return;
    }

    if (endPos[0] < 0 || endPos[0] >= 10 || endPos[1] < 0 || endPos[1] >= 10) {
      console.log("End position is outside of the board");
      return;
    }

    if (arrowPos[0] < 0 || arrowPos[0] >= 10 || arrowPos[1] < 0 || arrowPos[1] >= 10) {
      console.log("Arrow position is outside of the board");
      return;
    }

    if (newBoard[endPos[0]][endPos[1]] !== '-1') {
      console.log("End position is not empty");
      return;
    }

    // Move Amazon
    newBoard[startPos[0]][startPos[1]] = '-1';
    newBoard[endPos[0]][endPos[1]] = currentPlayer;

    // Shoot arrow
    if (newBoard[arrowPos[0]][arrowPos[1]] !== '-1') {
      console.log("Arrow position is not empty");
      return;
    }
    newBoard[arrowPos[0]][arrowPos[1]] = '-2';

    setBoard(newBoard);

    // Send move to server
    const move = {
      move: {
        start: {
          row: startPos[0],
          column: startPos[1]
        },
        end: {
          row: endPos[0],
          column: endPos[1]
        }
      },
      shot: {
        row: arrowPos[0],
        column: arrowPos[1]
      }
    };

    const url = `https://gruppe15.toni-barth.com/move/${playerId}/${gameId}`;
    console.log("POST URL:", url);
    console.log("POST Body:", move);

    try {
      await axios.post(url, move);
    } catch (error) {
      console.error("Error sending move to server:", error);
    }

    // Check if the other player has any legal moves left
    if (checkGameOver(currentPlayer === '0' ? '1' : '0')) {
      setGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === '0' ? '1' : '0');
    }
  };

  const GameStatus = ({ currentPlayer, gameOver }) => (
    <div>
      <p>Current Player: {currentPlayer}</p>
      {gameOver && <p>Game Over</p>}
    </div>
  );

  const checkGameOver = (player) => {
    console.log(`Checking if game is over for ${player}`);
    // Check if there are any legal moves left for the player
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j] === player) {
          console.log(`Checking legal moves for ${player} at position [${i}, ${j}]`);
          if (hasLegalMoves([i, j])) {
            console.log(`Found legal move for ${player} at position [${i}, ${j}]`);
            return false;
          }
        }
      }
    }
    console.log(`No legal moves left for ${player}, game over`);
    return true;
  };

  const hasLegalMoves = (pos) => {
    console.log(`Checking moves for Amazon at [${pos}]`);
    let [x, y] = pos;
    // Check all cells on the board
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        // Check if the cell is on the same row, column, or diagonal as the selected Amazon
        if (i === x || j === y || Math.abs(i - x) === Math.abs(j - y)) {
          // Check if all cells between the selected Amazon and this cell are empty
          let dx = i > x ? 1 : i < x ? -1 : 0;
          let dy = j > y ? 1 : j < y ? -1 : 0;
          let x1 = x + dx, y1 = y + dy;
          while (x1 !== i || y1 !== j) {
            if (board[x1][y1] === '0' || board[x1][y1] === '1' || board[x1][y1] === '-2') {
              break;
            }
            x1 += dx;
            y1 += dy;
          }
          // If all cells between the selected Amazon and this cell are empty, a legal move has been found
          if (x1 === i && y1 === j && board[i][j] === '-1') {
            console.log(`Found a possible move from [${x}, ${y}] to [${x1}, ${y1}]`);
            return true;
          }
        }
      }
    }
    console.log(`No possible moves found for Amazon at [${pos}]`);
    return false;
  };

  const startGame = () => {
    setBoard(generateRandomBoard());
    setGameOver(false);
    setCurrentPlayer('0');
  };

  return (
    <div>
      <button onClick={startGame}>Start Game</button>
      <GameStatus currentPlayer={currentPlayer} gameOver={gameOver} />
      <Board board={board} onCellClick={handleCellClick} possibleMoves={getPossibleMoves()} />
      {gameOver && <GameOverPopup winner={currentPlayer === '0' ? 'Black' : 'White'} />}
    </div>
  );
};

export default GameLogic;