import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosAuthInstance from '../Api/axiosAuthInstance';

export default function useCheckout() {
   const queryClient = useQueryClient();
   return useMutation({
    mutationFn: async({paymentMethod}) =>{
      return await axiosAuthInstance.post(`/checkouts`,{paymentMethod});
    },
    onSuccess: (response) =>{
        if (response.data.url){
            location.href = response.data.url;
        }
      queryClient.invalidateQueries({ queryKey: ['carts'] });
    }
   });
}
