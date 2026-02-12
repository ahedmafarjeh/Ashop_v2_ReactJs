import React, { useEffect, useState } from 'react'
import { Alert, CircularProgress, Container, Grid, Link, Paper, Skeleton, Typography } from '@mui/material';
import { Link as routerLink } from 'react-router-dom'
import { useCategories } from '../../hooks/useCategories';
import { useTranslation } from 'react-i18next';


export default function Categories() {
  const { isLoading, isError, data } = useCategories();
  // console.log(data)
  const { t } = useTranslation();
  const items = isLoading ? [...Array(6)] : data.response;

 
  if (isError) {
   return <Alert severity='error'>Error in fetching data</Alert>
  }
  return (
    <Container sx={{ my: 5 }} maxWidth='lg'>
      <Typography variant='h3' component={"h1"} pb={3} >{t("Categories")}</Typography>
      <Grid container spacing={2}>
        {items?.map((cat,index) =>
          <Grid key={cat?.id || index} size={{ xs: 12, sm: 6, md: 4 }}>
            {isLoading ? (
          <Paper elevation={3} sx={{ py: 2, px: 2 }}>
            <Skeleton variant="text" height={30} />
          </Paper>
        ) : (
          <Link
            component={routerLink}
            underline='none'
            to={`/products/category/${cat.id}`}
          >
            <Paper
              elevation={3}
              sx={{
                textAlign: 'center',
                py: 2,
                transition: 'transform 0.2s',
                "&:hover": {
                  transform: 'scale(1.05)',
                }
              }}
            >
              {cat.name}
            </Paper>
          </Link>
        )}

          </Grid>
        )}
      </Grid>
    </Container>
  )
}
