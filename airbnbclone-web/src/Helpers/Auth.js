import api from "../api";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  return token != null ? token : false;
};

const login = async ({ userEmail, password }) => {
  try {
    const response = await api.post("/auth/authenticate", {
      email: userEmail,
      password
    });
    const token = response.data.token.token;
    const { email, name } = response.data.user;

    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);

    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
};

const getToken = () => {
  const token = isAuthenticated();

  return token;
};

const register = async ({ email, password, username }) => {
  try {
    await api.post("/users/create", {
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
