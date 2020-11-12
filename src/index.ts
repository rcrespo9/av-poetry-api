import express from 'express';
import { fetchPoem } from './api';

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  fetchPoem().then(poem => {
    res.json(poem);
  })
});

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
);