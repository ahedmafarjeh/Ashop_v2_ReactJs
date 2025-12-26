import { useMutation } from "@tanstack/react-query";
import axiosinstance from "../Api/axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function useRegister() {
  const navigate = useNavigate();

  const [serverErrors, setServerErrors] = useState([]);
  const registerMutation = useMutation({
    mutationFn: async (userInfo) => {
      return await axiosinstance.post(`/Auth/Account/Register`, userInfo);
    },
    onSuccess: () => {
      navigate('/auth/login');
    },
    onError: (error) => {
      console.error("Error registering user:", error);
      setServerErrors(error.response.data.errors);
    }
  });

  return { serverErrors, registerMutation }
}