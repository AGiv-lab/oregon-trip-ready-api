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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
