import axios from "axios";

// Axios Instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`,
  withCredentials: true,
});

// Register API

export async function registerUser({ username, email, password }) {
  try {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log("Register Error:", err.response?.data || err.message);
    throw err;
  }
}

// Login API
// Login API
export async function loginUser({ email, password }) {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.log("Login Error:", err.response?.data || err.message);
    throw err;
  }
}

// Logout API
export async function logoutUser() {
  try {
    const response = await api.get("/logout", {});
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

// Get Me API
export async function getMe() {
  try {
    const response = await api.get("/get-me");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
