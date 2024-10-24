// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; // Remplacement par 'react-dom/client'
import App from './App';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Création d'un thème MUI
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Ciblez l'élément root dans le DOM
const rootElement = document.getElementById('root');

// Créez un root avec la méthode createRoot (React 18)
const root = ReactDOM.createRoot(rootElement);

// Utilisez root.render pour rendre l'application
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
