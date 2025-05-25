import axios from "axios";

const API_URI = "https://681673e626a599ae7c37eb1d.mockapi.io/";

const axiosConfig = {
  baseURL: API_URI,
  headers: { "Content-Type": "application/json" },
};

const services = {
  get: function (ep, filter = {}) {
    if (ep === "") {
      return;
    }
    const config = {
      ...axiosConfig,
      params: filter,
    };

    return axios.get(ep, config).then((response) => response.data);
  },
  post: function (ep, entity) {
    if (ep === "" || typeof entity !== "object" || !Object.keys(entity).length) {
      return [];
    }

    return axios
      .post(ep, entity, axiosConfig)
      .then((response) => response)
      .catch((error) => {
        console.error(`Create new item in ${ep}. Error: `, error);
        throw error;
      });
  },
  put: function (ep, data) {
    if (ep === "" || typeof data !== "object" || !Object.keys(data).length) {
      return [];
    }

    return axios
      .put(ep, data, axiosConfig)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Update exist item in ${ep}. Error: `, error);
        throw error;
      });
  },
  delete: function (ep, id) {
    if ((ep === "" || id === null, id === undefined)) {
      return false;
    }
    const url = ep + "/" + id;

    return axios
      .delete(url, axiosConfig)
      .then((response) => response)
      .catch((error) => {
        console.error(`Delete recipe with id: ${id}. Error: `, error);
        throw error;
      });
  },
  filter: function (ep, filter, value) {
    if (ep === "" || filter === "" || value === "") {
      return false;
    }
    const config = {
      ...axiosConfig,
      params: {
        [filter]: value,
      },
    };

    return axios
      .get(ep, config)
      .then((response) => response.data)
      .catch((error) => {
        console.error("");
        throw error;
      });
  },
};

export { services };
