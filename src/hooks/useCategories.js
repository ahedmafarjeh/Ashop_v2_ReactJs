
import i18n from "../i18n";
import useFetch from "./useFetch";

export function useCategories(){

  return useFetch(['categories',i18n.language],'/Categories');

    // const [categories, setCategories] = useState([]);
  // const fetchCategories = async () =>{
  //   const response = await axiosinstance.get(`/Categories`);
  //   return response.data.response;
  // }
  // const {isLoading,isError,data} = useQuery({
  //   queryKey:['categories'],
  //   // cash for 5 min = 5 * 60 sec * 1000 ms
  //   staleTime:5 * 60 * 1000, 
  //   queryFn: fetchCategories
  // });
  // const getCategories = async () =>{
  //   try {
  //     const response = await axiosinstance.get(`/Categories`);
  //     // console.log(response)
  //     setCategories(response.data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // useEffect(() =>{
  //   getCategories();
  // },[]);

  // return {isLoading, isError, data}
}