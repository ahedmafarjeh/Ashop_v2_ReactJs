import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import axiosAuthInstance from '../Api/axiosAuthInstance';

export default function useClearCart() {
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId) =>{
        return await axiosAuthInstance.patch('/Carts/clear',{
            productId
        });
    },
    onSuccess: () =>{
        queryClient.invalidateQueries({ queryKey: ['carts'] });
    }
  });
}
