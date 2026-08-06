# Oregon Trip Ready API

## About

This is the Express backend for Oregon Trip Ready. It accepts an Oregon destination, geocodes it using OpenWeather, retrieves current weather, and returns a simplified JSON response to the frontend. API keys remain on the server and are not exposed in frontend code.

## Current Endpoint

### Health Check

`GET /`

Response:

```text
Oregon Trip Ready API is running!
```


### Oregon Conditions

`GET /conditions?destination=Portland`

Returns weather information for an Oregon destination.

#### Example Response

```json
{
  "destination": "Portland",
  "state": "Oregon",
  "country": "US",
  "latitude": 45.5202471,
  "longitude": -122.674194,
  "weather": {
    "temperature": 87.22,
    "feelsLike": 85.44,
    "humidity": 33,
    "condition": "Clouds",
    "description": "few clouds",
    "windSpeed": 1.01
  }
}
```


 **Note:** The JSON response above is an example. Current weather values such as temperature, humidity, wind speed, and conditions will vary based on the destination and the time of the request.

 ## Error Responses

The API returns standard HTTP status codes for common error conditions.

| Status Code | Description |
|-------------|-------------|
| **400** | Destination is missing or blank. |
| **404** | Oregon destination could not be found. |
| **500** | OpenWeather or another upstream service could not be reached. |

### Example Error Response

```json
{
  "error": "Unable to retrieve weather conditions."
}
```

## Built With

- Node.js
- Express
- Axios
- CORS
- dotenv
- OpenWeather Geocoding API
- OpenWeather Current Weather API
- Nodemon (development)

## Local Setup

1. Clone the repository.

2. Install dependencies:

```bash
npm install
```

## Future Improvements

Potential enhancements for future releases include:

- Integrate official road-condition APIs when stable public endpoints become available.
- Add in-app Air Quality Index (AQI) data when a supported AirNow endpoint becomes available.
- Add server-side caching to reduce duplicate API requests.
- Add rate limiting to protect the API.
- Add automated endpoint testing.
- Prepare the backend for production deployment.

## License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.
