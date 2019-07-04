import api from "../api";

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

const register = async ({ email, password, username }) => {
  try {
    const result = await api.post("/users/create", {
      email,
      password,
      username
    });

    return true;
  } catch (error) {
    throw error;
  }
};

export { isAuthenticated, getToken, login, logout, register };
