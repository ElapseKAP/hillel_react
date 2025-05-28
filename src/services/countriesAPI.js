import { API_URI } from "constants/constants";
import axios from "axios";

const axiosConfig = {
  baseURL: API_URI,
  headers: { "Content-Type": "application/json" },
};

const services = {
  get: function (ep) {
    return axios
      .get(ep, axiosConfig)
      .then((response) => response)
      .catch((error) => {
        console.error("Error during getting countries list", error);
      });
  },
};

export { services };
