import React from 'react'
import axiosAuthInstance from '../Api/axiosAuthInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function userRemoveCartItem() {
  const queryClient = useQueryClient();
   return useMutation({
    mutationFn: async(cartItemId) =>{
      return await axiosAuthInstance.delete(`/carts/${cartItemId}`);
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    }
   });
}
