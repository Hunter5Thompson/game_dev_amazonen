import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">Hilfe</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Typography variant="h6">Spielregeln</Typography>
            <Typography variant="body1" paragraph>
              <pre>{helpText}</pre>
            </Typography>
            <Typography variant="h6">Bedienung der Benutzeroberfläche</Typography>
            <Typography variant="body1">
              <pre>{helpText2}</pre>
            </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Help;
