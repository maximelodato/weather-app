// src/components/City.js
import './styles/City.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Box,
} from '@mui/material';
import TemperatureChart from './TemperatureChart';
import HumidityChart from './HumidityChart';
import WindSpeedChart from './WindSpeedChart';
import TemperatureComparisonChart from './TemperatureComparisonChart';

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

  // Transformer les données de la météo pour afficher une prévision par jour
  const dailyForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt_txt).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

    // Regrouper par jour et ne prendre qu'une seule prévision (par exemple, vers midi)
    if (!acc[date] || new Date(item.dt_txt).getHours() === 12) {
      acc[date] = item;
    }
    return acc;
  }, {});

  // Convertir l'objet regroupé en tableau
  const dailyForecastArray = Object.values(dailyForecast);

  // Préparer les données pour les différents graphiques
  const dataForTempChart = dailyForecastArray.map((item) => ({
    date: item.dt_txt,
    maxTemp: item.main.temp_max,
    minTemp: item.main.temp_min,
  }));

  const dataForHumidityChart = dailyForecastArray.map((item) => ({
    date: item.dt_txt,
    humidity: item.main.humidity,
  }));

  const dataForWindSpeedChart = dailyForecastArray.map((item) => ({
    date: item.dt_txt,
    windSpeed: item.wind.speed,
  }));

  const dataForTempComparisonChart = dailyForecastArray.map((item) => ({
    date: item.dt_txt,
    maxTemp: item.main.temp_max,
    minTemp: item.main.temp_min,
  }));

  // Prévisions horaires (affichage des 8 prochaines heures pour le jour courant)
  const hourlyForecast = forecast.list.slice(0, 8); // Les 8 premières heures pour le jour courant

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Prévisions pour {forecast.city.name}
      </Typography>

      {/* Informations météo actuelles */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              p: 2,
              backgroundColor: '#f5f5f5',
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center">
                Météo Actuelle
              </Typography>
              <Box mt={2}>
                <Typography>
                  <strong>Température: </strong>
                  {forecast.list[0].main.temp}°C
                </Typography>
                <Typography>
                  <strong>Humidité: </strong>
                  {forecast.list[0].main.humidity}%
                </Typography>
                <Typography>
                  <strong>Pression: </strong>
                  {forecast.list[0].main.pressure} hPa
                </Typography>
                <Typography>
                  <strong>Vitesse du vent: </strong>
                  {forecast.list[0].wind.speed} m/s
                </Typography>
                <Typography>
                  <strong>Lever du soleil: </strong>
                  {new Date(forecast.city.sunrise * 1000).toLocaleTimeString()}
                </Typography>
                <Typography>
                  <strong>Coucher du soleil: </strong>
                  {new Date(forecast.city.sunset * 1000).toLocaleTimeString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Affichage du graphique des températures */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              p: 2,
              backgroundColor: '#f5f5f5',
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center">
                Graphique des Températures (5 jours)
              </Typography>
              <TemperatureChart data={dataForTempChart} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Prévisions sur les 5 jours */}
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Prévisions sur 5 jours
      </Typography>
      <Grid container spacing={2}>
        {dailyForecastArray.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                p: 2,
                backgroundColor: '#e0f7fa',
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  {new Date(item.dt_txt).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </Typography>
                <Typography align="center">
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt={item.weather[0].description}
                  />
                </Typography>
                <Typography align="center">
                  {item.weather[0].description}
                </Typography>
                <Typography>Max: {item.main.temp_max.toFixed(1)}°C</Typography>
                <Typography>Min: {item.main.temp_min.toFixed(1)}°C</Typography>
                <Typography>Humidité: {item.main.humidity}%</Typography>
                <Typography>Vent: {item.wind.speed} m/s</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Affichage des graphiques supplémentaires */}
      <Grid container spacing={4} sx={{ mb: 4, mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              p: 2,
              backgroundColor: '#f5f5f5',
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center">
                Graphique de l'humidité (5 jours)
              </Typography>
              <HumidityChart data={dataForHumidityChart} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              p: 2,
              backgroundColor: '#f5f5f5',
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center">
                Graphique de la vitesse du vent (5 jours)
              </Typography>
              <WindSpeedChart data={dataForWindSpeedChart} />
            </CardContent>
          </Card>
        </Grid>

        {/* Comparaison des températures maximales et minimales */}
        <Grid item xs={12}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              p: 2,
              backgroundColor: '#f5f5f5',
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center">
                Comparaison des températures (5 jours)
              </Typography>
              <TemperatureComparisonChart data={dataForTempComparisonChart} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Prévisions horaires pour la journée actuelle */}
      <Typography
        variant="h5"
        component="h2"
        align="center"
        gutterBottom
        sx={{ mt: 4 }}
      >
        Prévisions horaires (prochaines 8 heures)
      </Typography>
      <Grid container spacing={2}>
        {hourlyForecast.map((hour, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                p: 2,
                backgroundColor: '#f5f5f5',
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  {new Date(hour.dt_txt).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
                <Typography>Temp: {hour.main.temp}°C</Typography>
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

export default City;
