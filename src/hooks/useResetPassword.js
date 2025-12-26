
import { useMutation } from "@tanstack/react-query";
import axiosinstance from "../Api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export function useResetPassword() {
  const [serverError, setServerError] = useState();
  const navigate = useNavigate();
  const resetPasswordMutation = useMutation({
    mutationFn: async (userInfo) => {
      return await axiosinstance.patch(`/Auth/Account/ResetPassword`, userInfo);
    },
    onSuccess: () => {
      navigate('/auth/login');



    },
    onError: () => {
      console.error("Error registering user:", error);
      setServerError(error.response.data.message);
    }
  });

  return { serverError, resetPasswordMutation }
}