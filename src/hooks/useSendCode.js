
import { useMutation } from "@tanstack/react-query";
import axiosinstance from "../Api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export function useSendCode() {
  const [serverError, setServerError] = useState();
  const navigate = useNavigate();
  const sendCodeMutation = useMutation({
    mutationFn: async (userInfo) => {
      return await axiosinstance.post(`/Auth/Account/SendCode`, userInfo);
    },
    onSuccess: () => {
      navigate('/auth/reset-password');


    },
    onError: () => {
      console.error("Error registering user:", error);
      setServerError(error.response.data.message);
    }
  });

  return { serverError, sendCodeMutation }
}