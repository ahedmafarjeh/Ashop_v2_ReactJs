import { useQuery } from "@tanstack/react-query";
import axiosinstance from "../Api/axiosInstance";

export function useProducts(){
  const fetchProducts = async () =>{
    const response = await axiosinstance.get(`/Products`);
    return response.data.response.data;
  }

  return useQuery({
    queryKey:['products'],
    staleTime:5 * 60 * 1000,
    queryFn: fetchProducts
  })
}