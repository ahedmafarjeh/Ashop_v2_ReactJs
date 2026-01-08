import { useMutation } from '@tanstack/react-query'
import React from 'react'
import axiosAuthInstance from '../Api/axiosAuthInstance';

export default function useAddToCart() {
  
  const addToCartMutation = useMutation({
    mutationFn: async (values) =>{
      return await axiosAuthInstance.post('/Carts',{
        productId: values.productId,
        Count: values.quantity
      });
    }
  });
  return addToCartMutation;
}

