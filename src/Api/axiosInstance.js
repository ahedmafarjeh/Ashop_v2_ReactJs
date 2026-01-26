import axios from "axios";
import i18n from "../i18n";

const axiosinstance = axios.create({
  baseURL: 'https://knowledgeshop.runasp.net/api',
  withCredentials:true
});
axiosinstance.interceptors.request.use((config)=>{
  config.headers["Accept-Language"] = i18n.language;
  return config;
});

export default axiosinstance;