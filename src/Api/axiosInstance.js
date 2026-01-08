import axios from "axios";

const axiosinstance = axios.create({
  baseURL: 'https://knowledgeshop.runasp.net/api'
});
axiosinstance.interceptors.request.use((config)=>{
  config.headers["Accept-Language"] = "en";
  return config;
});

export default axiosinstance;