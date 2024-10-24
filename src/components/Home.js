// src/components/Home.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Autocomplete, Typography, Container } from '@mui/material';

const Home = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 3) {
      try {
        const encodedQuery = encodeURIComponent(value);
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodedQuery}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des suggestions');
        }
        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        setError(err.message);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectCity = (event, value) => {
    if (value) {
      navigate(`/city/${value.lat}/${value.lon}`);
      // Sauvegarder la ville dans le localStorage
      let cities = JSON.parse(localStorage.getItem('recentCities')) || [];
      cities = [value, ...cities.filter(c => c.name !== value.name).slice(0, 4)];
      localStorage.setItem('recentCities', JSON.stringify(cities));
    }
  };

  const recentCities = JSON.parse(localStorage.getItem('recentCities')) || [];

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Weather App
      </Typography>
      <Autocomplete
        freeSolo
        options={suggestions}
        getOptionLabel={(option) => `${option.name}, ${option.country}`}
        onInputChange={handleSearch}
        onChange={handleSelectCity}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Rechercher une ville"
            variant="outlined"
            fullWidth
            error={!!error}
            helperText={error}
          />
        )}
      />
      {recentCities.length > 0 && (
        <>
          <Typography variant="h5" component="h2" align="center" sx={{ mt: 4 }}>
            Villes récentes
          </Typography>
          <Box sx={{ mt: 2 }}>
            {recentCities.map((city, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  borderBottom: '1px solid #ddd',
                  cursor: 'pointer',
                }}
                onClick={() => handleSelectCity(null, city)}
              >
                <Typography variant="body1">
                  {city.name}, {city.country}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Container>
  );
};

export default Home;
