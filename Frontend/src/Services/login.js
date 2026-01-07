import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ GET /api/users/
const startUser = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

// ✅ POST /api/users/register
const registerUser = async (data) => {
  console.log("Registering user with data:", data);
  const response = await axiosInstance.post("/users/register", data);
  return response.data;
};

// ✅ POST /api/users/login
const loginUser = async (data) => {
  console.log("Logging in user with data:", data);
  const response = await axiosInstance.post("/users/login", data);
  return response.data;
};

// ✅ GET /api/users/logout
const logoutUser = async () => {
  const response = await axiosInstance.get("/users/logout");
  return response.data;
};

export { startUser, registerUser, loginUser, logoutUser };
