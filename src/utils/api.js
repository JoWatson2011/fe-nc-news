import axios from "axios";

const instance = axios.create({
  baseURL: "https://nc-news-2qmw.onrender.com",
});

export const getRequest = (endpoint, params = {}) => {
  return instance.get(endpoint, params).then(({ data }) => {
    return data;
  });
};
export const patchRequest = (endpoint, params = {}) => {
  return instance.patch(endpoint, params).then(({ data }) => {
    return data;
  });
};
export const postRequest = (endpoint, params = {}) => {
  return instance.post(endpoint, params).then(({ data }) => {
    return data;
  });
};
