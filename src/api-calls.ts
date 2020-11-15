import fetch from "node-fetch";
import dotenv from "dotenv";
import NaturalLanguageUnderstandingV1 from "ibm-watson/natural-language-understanding/v1";
import { IamAuthenticator } from "ibm-watson/auth";
import { hasKey } from './utils'

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
    language: 'en',
    returnAnalyzedText: true,
    features: {
      keywords: {
        emotion: true,
        limit: 1,
      },
      concepts: {
        limit: 1
      }
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
  try {
    const poemResponse = await fetchPoem();
    const thePoem = poemResponse[0];
    const poemText = thePoem.lines.filter((line: string) => line !== "").join(" ");

    const poemAnalysis = await fetchPoemAnalysis(poemText);
    const poemKeywordObj = poemAnalysis.result.keywords[0];
    const { emotion } = poemKeywordObj;
    const topEmotion = Object.keys(emotion).reduce((a, b) => {
      if (hasKey(emotion, a) && hasKey(emotion, b)) {
        return emotion[a] > emotion[b] ? a : b;
      }
    });

    const photoResponse = await fetchPhoto(encodeURI(topEmotion));

    const finalResult = {
      poem: thePoem,
      poem_analysis: { ...poemAnalysis.result },
      poem_photo: photoResponse,
    };

    return finalResult;
  } catch (error) {
    throw new Error(error);
  }
}

export { fetchAnalyzedPoemWithImg };
