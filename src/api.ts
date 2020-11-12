import { AxiosResponse } from "axios";

import axios from "axios";

function fetchPoem() {
  return axios.get<AxiosResponse>("https://poetrydb.org/random").then((res) => {
    return res.data;
  });
}

export { fetchPoem }