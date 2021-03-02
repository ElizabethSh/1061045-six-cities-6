import axios from 'axios';

const TIMEOUT = 5000;
const BASE_URL = `https://6.react.pages.academy/six-cities`;

const statusCode = {
  UNAUTORIZED: 401,
};

export const createAPI = (unAuthorized) => {
  const api = axios.create({
    baseURL: BASE_URL,
    tiomeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onError = (error) => {
    const {response} = error;

    if (response.status === statusCode.UNAUTORIZED) {
      unAuthorized();

      throw error;
    }

    throw error;
  };

  axios.interceptors.response.use(onSuccess, onError);

  return api;
};

