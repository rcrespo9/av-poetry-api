import express from 'express';
import { fetchPoem, analyzeText } from './api-calls';

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  fetchPoem().then(poem => {
    const thePoem = poem[0];
    const { title, author, lines } = thePoem;
    const poemText = lines.join('\n');

    analyzeText(poemText).then((analysis: any) => {
      const finalResult = { ...thePoem, ...analysis.result }
      res.json(finalResult);
    });
  }).catch(err => {throw new Error(err)})
});

app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
);