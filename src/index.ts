import express from 'express';
import { fetchPoem } from './api';

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  fetchPoem().then(poem => {
    res.json(poem[0]);
  }).catch(err => {throw new Error(err)})
});

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
);