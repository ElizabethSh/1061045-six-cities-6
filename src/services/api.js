import axios from "axios";
import { statusCode } from "../common/const";

const TIMEOUT = 5000;
const BASE_URL = `https://6.react.htmlacademy.pro/six-cities`;

export const createAPI = (unAuthorized) => {
  const api = axios.create({
    baseURL: BASE_URL,
    tiomeout: TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onError = (error) => {
    const { response } = error;

    if (response.status === statusCode.UNAUTORIZED) {
      unAuthorized();
    }

    throw error;
  };

  axios.interceptors.response.use(onSuccess, onError);

  return api;
};
