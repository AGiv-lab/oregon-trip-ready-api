import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

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