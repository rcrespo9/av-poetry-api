import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

type Poem = {
  title: string;
  author: string;
  lines: string[];
}

function fetchPoem() {
  return axios.get<Poem[]>("https://poetrydb.org/random").then((res) => {
    return res.data;
  });
}

export { fetchPoem}