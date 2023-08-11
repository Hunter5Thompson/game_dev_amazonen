
import React from 'react';
import './GameOverPopUp.css'; // Importieren Sie die CSS-Datei

const GameOverPopup = ({ winner }) => (
    <div className="game-over-popup">
        <h1>Game Over!</h1>
        <p>{winner} hat gewonnen!</p>
    </div>
);

export default GameOverPopup;
