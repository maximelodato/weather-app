// src/components/City.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
} from '@mui/material';

const City = () => {
  const { lat, lon } = useParams();
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=fr`
        );
        if (!response.ok) {
          throw new Error('Échec de la récupération des données météo');
        }
        const data = await response.json();
        setForecast(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();

    // Rafraîchissement toutes les 5 minutes
    const interval = setInterval(fetchForecast, 300000);
    return () => clearInterval(interval);
  }, [lat, lon]);

  if (loading)
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  if (error)
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );

  // Regrouper les prévisions par date
  const forecastByDay = forecast.list.reduce((acc, curr) => {
    const date = curr.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Prévisions pour {forecast.city.name}
      </Typography>
      <Grid container spacing={2}>
        {Object.keys(forecastByDay)
          .slice(0, 5)
          .map((date, index) => {
            const dayData = forecastByDay[date];
            const temperatures = dayData.map((item) => item.main.temp);
            const maxTemp = Math.max(...temperatures);
            const minTemp = Math.min(...temperatures);
            const humidity = dayData[0].main.humidity;
            const windSpeed = dayData[0].wind.speed;
            const weatherDescription = dayData[0].weather[0].description;
            const weatherIcon = dayData[0].weather[0].icon;

            return (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {new Date(date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </Typography>
                    <CardMedia
                      component="img"
                      height="100"
                      image={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                      alt={weatherDescription}
                      sx={{ objectFit: 'contain' }}
                    />
                    <Typography>Max: {maxTemp.toFixed(1)}°C</Typography>
                    <Typography>Min: {minTemp.toFixed(1)}°C</Typography>
                    <Typography>Humidité: {humidity}%</Typography>
                    <Typography>Vent: {windSpeed} m/s</Typography>
                    <Typography>{weatherDescription}</Typography>
                    <Box sx={{ mt: 2 }}>
                      <Link to={`/forecast/${lat}/${lon}/${date}`} style={{ textDecoration: 'none' }}>
                        <Typography color="primary">Voir les prévisions horaires</Typography>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default City;
