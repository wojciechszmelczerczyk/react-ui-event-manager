import axios from "axios";

const BASE_URL = "http://192.168.0.103:3000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
