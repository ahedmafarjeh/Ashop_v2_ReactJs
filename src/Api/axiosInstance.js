import axios from "axios";

const axiosinstance = axios.create({
  baseURL: 'https://knowledgeshop.runasp.net/api'
});

export default axiosinstance;