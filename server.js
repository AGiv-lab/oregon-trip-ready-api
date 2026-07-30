import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());

app.get('/', (request, response) => {
  response.send('Oregon Trip Ready API is running!');
});

app.get('/conditions', (request, response) => {
  const destination = request.query.destination;

  if (typeof destination !== 'string' || destination.trim() === '') {
    return response.status(400).json({ error: 'Destination is required.' });
  }

  return response.status(200).json({ destination: destination.trim() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
