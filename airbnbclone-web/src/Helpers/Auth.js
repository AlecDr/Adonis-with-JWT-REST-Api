const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  return token ? token : false;
};

const login = token => {
  localStorage.setItem("token", token);
};

const logout = () => {
  localStorage.removeItem("token");
};

const getToken = () => {
  const token = isAuthenticated();

  return token;
};

export { isAuthenticated, getToken, login, logout };
