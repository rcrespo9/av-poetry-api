"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPoem = void 0;
const axios_1 = __importDefault(require("axios"));
function fetchPoem() {
    return axios_1.default.get("https://poetrydb.org/random").then((res) => {
        return res.data;
    });
}
exports.fetchPoem = fetchPoem;
//# sourceMappingURL=api.js.map