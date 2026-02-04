
import i18n from "../i18n";
import useFetch from "./useFetch";

export function useProducts(filters={}, page=1, limit=3) {
    const params = { ...filters, page, limit };
  return useFetch(['products',i18n.language,filters,page,limit],'/Products',params);

  // const fetchProducts = async () =>{
  //   const response = await axiosinstance.get(`/Products`);
  //   return response.data.response.data;
  // }

  // return useQuery({
  //   queryKey:['products'],
  //   staleTime:5 * 60 * 1000,
  //   queryFn: fetchProducts
  // })
}