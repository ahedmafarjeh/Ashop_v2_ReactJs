import { useMutation } from "@tanstack/react-query";
import axiosinstance from "../Api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../Store/useAuthStore";


export function useLogin() {
  const {login} = useAuthStore();
  const [serverError, setServerError] = useState();
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: async (userInfo) => {
      return await axiosinstance.post(`/Auth/Account/Login`, userInfo);
    },
    onSuccess: (response) => {
      login(response.data.accessToken);
      navigate('/home');

    },
    onError: () => {
      console.error("Error registering user:", error);
      setServerError(error.response.data.message);
    }
  });

  return {serverError, loginMutation}
}