import React, { useEffect, useState } from 'react'
import axiosinstance from '../../Api/axiosInstance';
import { Alert, CircularProgress, Container, Grid, Link, Paper, Typography } from '@mui/material';
import {Link as routerLink} from 'react-router-dom'
import {  useQuery } from '@tanstack/react-query';

export default function Categories() {
  // const [categories, setCategories] = useState([]);
  const fetchCategories = async () =>{
    const response = await axiosinstance.get(`/Categories`);
    return response.data;
  }
  const {isLoading,isError,data} = useQuery({
    queryKey:['categories'],
    // cash for 5 min = 5 * 60 sec * 1000 ms
    staleTime:5 * 60 * 1000, 
    queryFn: fetchCategories
  });
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
  if (isLoading){
    return <CircularProgress />
  }
  if (isError){
    <Alert severity='error'>Error in fetching data</Alert>
  }
return (
    <Container sx={{my:5}} maxWidth='lg'>
      <Grid container spacing={2}>
      {data?.map((cat) =>
        <Grid size={{xs:12, sm:6, md:4}}>
          <Link component={routerLink}   underline='none'>
          <Paper elevation={3} sx={{textAlign:'center',py:2, bgcolor:'#90caf9',
          transition:'transform 0.2s',
          "&:hover":{
              transform: 'scale(1.05)',
              
          }}}>{cat.name}</Paper>
          </Link>
        
      </Grid>
      )}
    </Grid>
    </Container>
  )
}
