import express from "express";
import { fetchAnalyzedPoemWithImg } from "./api-calls";

const app = express();

app.get("/", (req, res) => res.send("Welcome to the Voems API!"));

app.get("/api", (req, res) => {
  fetchAnalyzedPoemWithImg()
    .then(poemWithImg => res.json(poemWithImg))
    .catch(error => res.status(500).json({error: error.message}));
});

export { app };
