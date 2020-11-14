import axios from "axios";
import dotenv from "dotenv";
import NaturalLanguageUnderstandingV1 from "ibm-watson/natural-language-understanding/v1";
import { IamAuthenticator } from "ibm-watson/auth";

dotenv.config();

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: "2020-08-01",
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_NLP_API_KEY,
  }),
  serviceUrl: process.env.IBM_NLP_SERVICE_URL,
});

type Poem = {
  title: string;
  author: string;
  lines: string[];
};

function fetchPoem() {
  return axios.get<Poem[]>("https://poetrydb.org/random").then((res) => {
    return res.data;
  });
}

function analyzeText(lines: string) {
  const analyzeParams = {
    text: lines,
    features: {
      keywords: {
        emotion: true,
        limit: 1,
      },
    },
  };

 return naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then((analysisResults: any) => {
      return analysisResults;
    })
    .catch((err: any) => {
      throw new Error(err);
    });
}

export { fetchPoem, analyzeText };
