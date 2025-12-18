import React, { useEffect, useState } from 'react'
import axiosinstance from '../../Api/axiosInstance';
import { Container, Grid, Link, Paper, Typography } from '@mui/material';
import {Link as routerLink} from 'react-router-dom'

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const getCategories = async () =>{
    try {
      const response = await axiosinstance.get(`/Categories`);
      // console.log(response)
      setCategories(response.data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() =>{
    getCategories();
  },[]);
return (
    <Container sx={{my:5}} maxWidth='lg'>
      <Grid container spacing={2}>
      {categories?.map((cat) =>
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
