"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeText = exports.fetchPoem = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const v1_1 = __importDefault(require("ibm-watson/natural-language-understanding/v1"));
const auth_1 = require("ibm-watson/auth");
dotenv_1.default.config();
const naturalLanguageUnderstanding = new v1_1.default({
    version: "2020-08-01",
    authenticator: new auth_1.IamAuthenticator({
        apikey: process.env.IBM_NLP_API_KEY,
    }),
    serviceUrl: process.env.IBM_NLP_SERVICE_URL,
});
function fetchPoem() {
    return axios_1.default.get("https://poetrydb.org/random").then((res) => {
        return res.data;
    });
}
exports.fetchPoem = fetchPoem;
function analyzeText(lines) {
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
        .then((analysisResults) => {
        return analysisResults;
    })
        .catch((err) => {
        throw new Error(err);
    });
}
exports.analyzeText = analyzeText;
//# sourceMappingURL=api-calls.js.map