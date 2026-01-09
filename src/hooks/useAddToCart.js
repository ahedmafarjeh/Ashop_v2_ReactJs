import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import axiosAuthInstance from '../Api/axiosAuthInstance';
import { useMediaQuery } from '@mui/material';

export default function useAddToCart() {
   const queryClient = useQueryClient();
  const addToCartMutation = useMutation({
    mutationFn: async (values) =>{
      return await axiosAuthInstance.post('/Carts',{
        productId: values.productId,
        Count: values.quantity
      });
      
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    }
  });
  return addToCartMutation;
}

