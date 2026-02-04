import { useQuery } from "@tanstack/react-query";
import axiosinstance from "../Api/axiosInstance";
import React from 'react'

export default function useFetch(queryKey,url, params = {}, instance = axiosinstance) {
    const fetchData = async () =>{
    const response = await instance.get(url, {params});
    return response.data;
  }

  return useQuery({
    queryKey,
    staleTime:5 * 60 * 1000,
    queryFn: fetchData
  })
}
