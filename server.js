import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());

app.get('/', (request, response) => {
  response.send('Oregon Trip Ready API is running!');
});

app.get('/conditions', async (request, response) => {
  const destination = request.query.destination;

  if (typeof destination !== 'string' || destination.trim() === '') {
    return response.status(400).json({ error: 'Destination is required.' });
  }

  try {
    const geocodingResponse = await axios.get(
      'https://api.openweathermap.org/geo/1.0/direct',
      {
        params: {
          q: `${destination.trim()},OR,US`,
          limit: 1,
          appid: process.env.OPENWEATHER_API_KEY
        }
      }
    );

    const [location] = geocodingResponse.data;

    if (!location) {
      return response.status(404).json({
        error: 'Oregon destination not found.'
      });
    }

    const weatherResponse = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat: location.lat,
          lon: location.lon,
          appid: process.env.OPENWEATHER_API_KEY,
          units: 'imperial'
        }
      }
    );

    const currentWeather = weatherResponse.data;

    return response.status(200).json({
      destination: location.name,
      state: location.state,
      country: location.country,
      latitude: location.lat,
      longitude: location.lon,
      weather: {
        temperature: currentWeather.main.temp,
        feelsLike: currentWeather.main.feels_like,
        humidity: currentWeather.main.humidity,
        condition: currentWeather.weather[0].main,
        description: currentWeather.weather[0].description,
        windSpeed: currentWeather.wind.speed
      }
    });
  } catch (error) {
    return response.status(500).json({
      error: 'Unable to look up destination.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
