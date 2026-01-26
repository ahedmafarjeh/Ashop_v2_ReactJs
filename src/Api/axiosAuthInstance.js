import axios from "axios";
import useAuthStore from "../Store/useAuthStore";
import { jwtDecode } from "jwt-decode";

const axiosAuthInstance = axios.create({
  baseURL: 'https://knowledgeshop.runasp.net/api',
  withCredentials: true
});
const axiosRefresh = axios.create({
  baseURL: 'https://knowledgeshop.runasp.net/api',
  withCredentials: true
});
axiosAuthInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers["Accept-Language"] = "en";
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});
axiosAuthInstance.interceptors.response.use((response) => {
  console.log("response success");
  return response;
}, async (error) => {
  console.log("response error");
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshResponse = await axiosRefresh.post('/auth/Account/RefreshToken', {});
      const newAccessToken = refreshResponse.data.accessToken;
      const decodedToken = jwtDecode(response.data.accessToken);
      const user = {
        name: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      }

      useAuthStore.getState().login(newAccessToken, user);
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axiosAuthInstance(originalRequest);
    } catch (refreshTokenError) {
      useAuthStore.getState().logout();
      return Promise.reject(refreshTokenError);
    }
  }

  return Promise.reject(error);
}

);
export default axiosAuthInstance;