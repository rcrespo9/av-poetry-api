"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = require("./api");
const app = express_1.default();
const PORT = 5000;
app.get('/', (req, res) => {
    api_1.fetchPoem().then(poem => {
        res.json(poem);
    });
});
app.listen(PORT, () => console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`));
//# sourceMappingURL=index.js.map