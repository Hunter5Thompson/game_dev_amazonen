import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { API_BASE_URL } from './ApiService';
import './PlayerNameInput.css';

Modal.setAppElement('#root');

const PlayerNameInput = ({ setGameId, setPlayerIds }) => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [controllable, setControllable] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (name1.trim() && name2.trim()) {
            try {
                const player1Response = await axios.post(`${API_BASE_URL}players/`, {
                    name: name1.trim(),
                    controllable: true
                });
    
                const player2Response = await axios.post(`${API_BASE_URL}players/`, {
                    name: name2.trim(),
                    controllable: controllable
                });
    
                setPlayerIds([player1Response.data.id, player2Response.data.id]);
    
                const gamesResponse = await axios.get(`${API_BASE_URL}games/`);
                setGameId(gamesResponse.data.games[0].id);
    
                setName1('');
                setName2('');
            } catch (error) {
                setError('Fehler im Paradies, dein Wunsch konnte nicht ausgeführt werden!');
            }
        } else {
            setError('Bitte gib gültige Spielernamen ein!');
        }
    };
    

    const closeModal = () => {
        setError(null);
    };

    return (
        <div className="player-name-input">
            <Modal
                isOpen={!!error}
                onRequestClose={closeModal}
                contentLabel="Error Modal"
            >
                <h2>Fehler</h2>
                <p>{error}</p>
                <button onClick={closeModal}>Schließen</button>
            </Modal>
            <form onSubmit={handleSubmit}>
                <label>
                    Name Spieler 1:
                    <input type="text" value={name1} onChange={e => setName1(e.target.value)} required />
                </label>
                <label>
                    Name Spieler 2:
                    <input type="text" value={name2} onChange={e => setName2(e.target.value)} required />
                </label>
                <label>
                    Controllable:
                    <input type="checkbox" checked={controllable} onChange={e => setControllable(e.target.checked)} />
                </label>
                <button type="submit">Spiel erstellen</button>
            </form>
        </div>
    );
};

export default PlayerNameInput;
