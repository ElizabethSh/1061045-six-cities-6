const LOCALSTORAGE_AUTH_TOKEN = "6-sities-auth-token";

const isLocalStorageAvailable = () =>
  typeof window !== "undefined" && !!window.localStorage;

export const getToken = () => {
  try {
    if (
      isLocalStorageAvailable() &&
      typeof window.localStorage.getItem === "function"
    ) {
      const token = localStorage.getItem(LOCALSTORAGE_AUTH_TOKEN);
      return token ? JSON.parse(token) : undefined;
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
};

export const setToken = (token) => {
  try {
    if (
      isLocalStorageAvailable() &&
      typeof window.localStorage.setItem === "function"
    ) {
      localStorage.setItem(LOCALSTORAGE_AUTH_TOKEN, JSON.stringify(token));
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
};

export const dropToken = () => {
  try {
    if (
      isLocalStorageAvailable() &&
      typeof window.localStorage.removeItem === "function"
    ) {
      localStorage.removeItem(LOCALSTORAGE_AUTH_TOKEN);
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
};
