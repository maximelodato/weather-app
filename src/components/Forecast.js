// src/components/Forecast.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const Forecast = () => {
  const { lat, lon, date } = useParams();
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [cityName, setCityName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHourlyForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=fr`
        );
        if (!response.ok) {
          throw new Error('Échec de la récupération des données météo');
        }
        const data = await response.json();
        const dayForecast = data.list.filter((item) => item.dt_txt.startsWith(date));
        setHourlyForecast(dayForecast);
        setCityName(data.city.name);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHourlyForecast();
  }, [lat, lon, date]);

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

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Prévisions horaires pour {cityName} le{' '}
        {new Date(date).toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })}
      </Typography>
      <Grid container spacing={2}>
        {hourlyForecast.map((hour, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {new Date(hour.dt_txt).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
                <CardMedia
                  component="img"
                  height="80"
                  image={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                  alt={hour.weather[0].description}
                  sx={{ objectFit: 'contain' }}
                />
                <Typography>Température: {hour.main.temp.toFixed(1)}°C</Typography>
                <Typography>Humidité: {hour.main.humidity}%</Typography>
                <Typography>Vent: {hour.wind.speed} m/s</Typography>
                <Typography>{hour.weather[0].description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Forecast;
