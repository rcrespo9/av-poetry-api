import express from "express";
import { fetchAnalyzedPoemWithImg } from "./api-calls";

const app = express();

app.get("/", (req, res) => {
  fetchAnalyzedPoemWithImg()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      throw new Error(err);
    });
});

export { app };
