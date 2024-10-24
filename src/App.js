// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import City from './components/City';
import Forecast from './components/Forecast';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:lat/:lon" element={<City />} />
        <Route path="/forecast/:lat/:lon/:date" element={<Forecast />} />
      </Routes>
    </Router>
  );
}

export default App;
