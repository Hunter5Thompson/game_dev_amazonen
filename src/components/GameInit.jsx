import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from './ApiService';
import Modal from 'react-modal';
import './GameInit.css';

Modal.setAppElement('#root');

const GameInit = ({ playerIds, setGameId }) => { // playerIds und setGameId als Prop akzeptieren
    const [error, setError] = useState(null);
    const [gameStatus, setGameStatus] = useState('Warte auf Erstellung...'); // Spielstatus

    useEffect(() => {
        const checkAndCreateGame = async () => {
            if (playerIds && playerIds.length === 2) { // Überprüfen, ob Spieler-IDs vorhanden sind
                try {
                    console.log("Fetching games from server...");
                    const response = await axios.get(`${API_BASE_URL}games/`);
                    console.log("Games fetched from server:", response.data);

                    // If there are no games, create a new one
                    if (response.data.games.length === 0) {
                        console.log("No games found, creating a new game...");
                        const createGameResponse = await axios.post(`${API_BASE_URL}games/`, {
                            maxTurnTime: 60000,
                            players: playerIds, // Spieler-IDs verwenden
                            board: {
                                gameSizeRows: 10,
                                gameSizeColumns: 10,
                                squares: [...Array(10)].map(() => Array(10).fill(-1))
                            }
                        });
                        console.log("New game created:", createGameResponse.data);
                        setGameStatus('Spiel erfolgreich erstellt!'); // Spielstatus aktualisieren
                        setGameId(createGameResponse.data.id); // Aktualisieren Sie die gameId
                    }
                } catch (error) {
                    console.error("Error occurred:", error);
                    setError(`Fehler im Paradies, dein Wunsch konnte nicht ausgeführt werden!: ${error.response?.data}`);
                }
            }
        };

        checkAndCreateGame();
    }, [playerIds,setGameId]); // Abhängigkeit von playerIds

    const closeModal = () => {
        setError(null);
    };

    return (
        <div className="game-init">
            <Modal
                isOpen={!!error}
                onRequestClose={closeModal}
                contentLabel="Error Modal"
            >
                <h2>Fehler</h2>
                <p>{error}</p>
                <button onClick={closeModal}>Schließen</button>
            </Modal>
            <h2>{gameStatus}</h2> {/* Spielstatus anzeigen */}
        </div>
    );
};

export default GameInit;
