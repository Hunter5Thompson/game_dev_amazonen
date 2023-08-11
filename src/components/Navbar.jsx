import React, { useCallback} from 'react';
import { useMediaQuery } from 'react-responsive';
import './Navbar.css';
import { API_BASE_URL } from './ApiService';



// Navigationsleistenkomponente
const Navbar = () => {
  
  // Funktion zum Löschen aller Spieler
  const deleteAllPlayers = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}reset/`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log('All players have been deleted.');
    } catch (error) {
      console.error('Error while deleting all players:', error);
    }
  }, []);

  // Media Queries zur Bestimmung der Gerätegröße
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const isTabletOrMobile = useMediaQuery({ maxDeviceWidth: 1224 });

  // Render-Methode der Komponente
  return (
  <nav className={`navbar ${isTabletOrMobile ? 'mobile' : ''}${isDesktopOrLaptop ? 'desktop' : ''}`}>
    <ul>
      <li><a href="#spieler">Spieler</a></li>  {/* Link zur Spielersektion */}
      <li><a href="#spiel">Spiel</a></li>  {/* Link zur Spielsektion */}
      <li><a href="#zuege">Züge</a></li>  {/* Link zur Zügesection */}
      <li><a href="#reset" onClick={deleteAllPlayers}>Reset</a></li>  {/* Link zum Zurücksetzen des Spiels */}
      <li><a href="#help-section">Hilfe</a></li>  {/* Link zur Hilfesection */}
      </ul>
    </nav>
  );
}

export default Navbar;