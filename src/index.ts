import express from 'express';
import { fetchAnalyzedPoemWithImg } from './api-calls';

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  fetchAnalyzedPoemWithImg().then(response => {
    res.json(response);
  }).catch(err => { throw new Error(err) });
});

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
);