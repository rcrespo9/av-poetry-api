import express from "express";
import { fetchAnalyzedPoemWithImg } from "./api-calls";

const app = express();

app.get("/", async (req, res) => {
  res.send("Welcome to the Voems API!");
});

app.get("/api", async (req, res) => {
  fetchAnalyzedPoemWithImg()
    .then((response) => {
      res.json(response);
    })
    .catch(error => res.status(500).json({error: error.message}));
});

export { app };
