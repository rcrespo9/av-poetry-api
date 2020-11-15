import express from "express";
import { fetchAnalyzedPoemWithImg } from "./api-calls";

const app = express();

app.get("/", async (req, res) => {
  res.send("Welcome to the Voems API!")
});

app.get("/api", async (req, res) => {
  fetchAnalyzedPoemWithImg()
    .then((response) => {
      res.json(response);
    })
  
  fetchAnalyzedPoemWithImg().catch((err) => {
    throw new Error(err);
  });
});

export { app };
