import axios from "axios";

const instance = axios.create({
  baseURL: "https://nc-news-2qmw.onrender.com/api",
});

export const getRequest = (endpoint, params = {}) => {
  return instance.get(endpoint, params).then(({ data }) => {
    return data;
  });
};
