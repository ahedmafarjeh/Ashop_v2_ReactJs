import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import axiosAuthInstance from '../Api/axiosAuthInstance';

export default function useAddReview() {
   const queryClient = useQueryClient();

    return useMutation ({
        mutationFn: async (values) =>{
            return await axiosAuthInstance.post(`/products/${values.productId}/reviews`,{
                Rating: values.rating,
                Comment: values.comment
            });
        },
        onSuccess: () =>{
      queryClient.invalidateQueries({ queryKey: ['profile'] });

        }
    });
}
