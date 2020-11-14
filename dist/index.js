"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_calls_1 = require("./api-calls");
const app = express_1.default();
const PORT = 5000;
app.get('/', (req, res) => {
    api_calls_1.fetchPoem().then(poem => {
        const thePoem = poem[0];
        const { title, author, lines } = thePoem;
        const poemText = lines.join('\n');
        api_calls_1.analyzeText(poemText).then((analysis) => {
            const finalResult = Object.assign(Object.assign({}, thePoem), analysis.result);
            res.json(finalResult);
        });
    }).catch(err => { throw new Error(err); });
});
app.listen(PORT, () => console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`));
//# sourceMappingURL=index.js.map