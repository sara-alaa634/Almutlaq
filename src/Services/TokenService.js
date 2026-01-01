
const TOKEN_KEY = "tk";
const EXPIRATION_KEY = "ex";

export const setToken = (token, expiration) => {
  const expirationTime = Date.now() + expiration * 1000;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRATION_KEY, expirationTime.toString());
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getExpiration = () => {
  return localStorage.getItem(EXPIRATION_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRATION_KEY);
};

export const isTokenExpired = () => {
  const expiration = localStorage.getItem(EXPIRATION_KEY);
  return !expiration || Date.now() >= Number(expiration);
};


