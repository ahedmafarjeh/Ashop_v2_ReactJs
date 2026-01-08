import axios from "axios";
import useAuthStore from "../Store/useAuthStore";

const axiosAuthInstance = axios.create({
  baseURL: 'https://knowledgeshop.runasp.net/api'
});
axiosAuthInstance.interceptors.request.use((config)=>{
  const token = useAuthStore.getState().token;
  config.headers["Accept-Language"] = "en";
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default axiosAuthInstance;