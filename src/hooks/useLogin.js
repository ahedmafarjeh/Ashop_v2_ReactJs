import { useMutation } from "@tanstack/react-query";
import axiosinstance from "../Api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../Store/useAuthStore";
import { jwtDecode } from "jwt-decode";

export function useLogin() {
  const {login} = useAuthStore();
  const [serverError, setServerError] = useState();
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: async (userInfo) => {
      return await axiosinstance.post(`/Auth/Account/Login`, userInfo);
    },
    onSuccess: (response) => {
      const decodedToken = jwtDecode(response.data.accessToken);
      const user = {
        name: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      }
      // console.log(user);
      
      login(response.data.accessToken, user);
      navigate('/');

    },
    onError: () => {
      console.error("Error registering user:", error);
      setServerError(error.response.data.message);
    }
  });

  return {serverError, loginMutation}
}