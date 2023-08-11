//help.jsx

import React, { useState, useEffect } from 'react';
import './Help.css';

function Help() {
  const [helpText, setHelpText] = useState('');
  const [helpText2, setHelpText2] = useState('');

  useEffect(() => {
    fetch('./anleitung.txt')
      .then(response => response.text())
      .then(data => {
        setHelpText(data);
      });
  }, []);

  useEffect(() => {
    fetch('/bedienungsanleitung.txt')
      .then(response => response.text())
      .then(data => {
        setHelpText2(data);
      });
  }, []);

  return (
    <div className="help" style={{ fontFamily: 'Georgia, serif' }}>
      <h2 style={{ fontFamily: 'Georgia, serif' }}>Hilfe</h2>
      <h3 style={{ fontFamily: 'Georgia, serif' }}>Spielregeln</h3>
      <pre style={{ fontFamily: 'Georgia, serif' }}>{helpText}</pre>
      <h3 style={{ fontFamily: 'Georgia, serif' }}>Bedienung der Benutzeroberfläche</h3>
      <pre style={{ fontFamily: 'Georgia, serif' }}>{helpText2}</pre>
    </div>
  );
}

export default Help;
