import React, { useState, useRef } from 'react';

import AmazonsGame from './components/AmazoneGame';
import AudioPlayer from './components/AudioPlayer';
import Navbar from './components/Navbar';
import Help from './components/Help';
import PlayerNameInput from './components/PlayerNameInput';
import GameInit from './components/GameInit';


import './App.css';

function App() {
  const [playerIds, setPlayerIds] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [showHelp, setShowHelp] = useState(false); // Zustand der Hilfeanzeige
  const [isPlaying, setIsPlaying] = useState(true); // Zustand des Audio-Players
  // Referenz zum Audio-Player
const audioRef = useRef(null);
  // Funktion zum Umschalten des Sounds
  const toggleSound = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

const setHelp = () => {
   // Verstecke die Hilfe
   setShowHelp(false);
};

  return (
    <div className="App">
      <Navbar onHelpClick={() => setShowHelp(!showHelp)} />
      <PlayerNameInput setPlayerIds={setPlayerIds} setGameId={setGameId} /> {/* Änderung hier */}
      <GameInit playerIds={playerIds} setGameId={setGameId} />
      <button onClick={toggleSound}>
        {isPlaying ? 'Sound ausschalten' : 'Sound einschalten'}
      </button>
      <AudioPlayer ref={audioRef} />
      <AmazonsGame playerId={playerIds} gameId={gameId}/>
      <div id="help-section">
        <Help showHelp={showHelp} />
      </div>
    </div>
  );
}




export default App;
