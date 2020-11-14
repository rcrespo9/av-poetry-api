import fetch from "node-fetch";
import dotenv from "dotenv";
import NaturalLanguageUnderstandingV1 from "ibm-watson/natural-language-understanding/v1";
import { IamAuthenticator } from "ibm-watson/auth";

dotenv.config();

async function fetchPoem() {
  try {
    const response = await fetch("https://poetrydb.org/random");
    const poem = response.json();

    return poem;
  } catch (error) {
    throw new Error(error);
  }
}

async function fetchPoemAnalysis(text: string) {
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: "2020-08-01",
    authenticator: new IamAuthenticator({
      apikey: process.env.IBM_NLP_API_KEY,
    }),
    serviceUrl: process.env.IBM_NLP_SERVICE_URL,
  });

  const analyzeParams = {
    text: text,
    features: {
      keywords: {
        emotion: true,
        limit: 1,
      },
    },
  };

  try {
    const response = await naturalLanguageUnderstanding.analyze(analyzeParams);

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

async function fetchPhoto(word: string) {  
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const photoResult = response.json();

    return photoResult;
  } catch (error) {
    throw new Error(error);
  }
}

async function fetchAnalyzedPoemWithImg() {
  const poemResponse = await fetchPoem();
  const thePoem = poemResponse[0];
  const poemText = thePoem.lines.join('\n');

  const poemAnalysis = await fetchPoemAnalysis(poemText);
  const poemEmotion = poemAnalysis.result.keywords[0].text;
  
  const photoResponse = await fetchPhoto(poemEmotion);

  return {...thePoem, ...poemAnalysis.result, ...photoResponse};
}

export { fetchAnalyzedPoemWithImg };
