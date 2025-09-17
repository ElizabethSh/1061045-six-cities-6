import axios from "axios";
import { statusCode } from "../common/const";
import { getToken } from "./token";

const TIMEOUT = 5000;
const BASE_URL = `https://16.design.htmlacademy.pro/six-cities`;

const StatusCodeMapping = {
  [statusCode.BAD_REQUEST]: true,
  [statusCode.UNAUTHORIZED]: true,
  [statusCode.NOT_FOUND]: true,
};

const shouldDisplayError = (response) => !!StatusCodeMapping[response.status];

export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers["x-token"] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // TODO: handle errors better
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;
        console.log(`Error: ${detailMessage.message}`);
      }
      throw error;
    }
  );

  return api;
};
