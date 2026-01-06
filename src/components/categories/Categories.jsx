import React, { useEffect, useState } from 'react'
import { Alert, CircularProgress, Container, Grid, Link, Paper, Typography } from '@mui/material';
import {Link as routerLink} from 'react-router-dom'
import { useCategories } from '../../hooks/useCategories';


export default function Categories() {
  const {isLoading, isError, data} = useCategories();
  // console.log(data)
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
