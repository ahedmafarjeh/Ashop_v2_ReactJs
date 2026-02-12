
import React from 'react'
import { useProducts } from '../../hooks/useProducts'
import { Alert, CircularProgress, Container, Grid, Skeleton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProductGrid from '../../components/products/ProductGrid';

export default function ProductsSection() {
  const { isError, isLoading, data } = useProducts();
  const {t} = useTranslation();
  const items = isLoading ? [...Array(6)] : data.response.data;
  if (isError) {
    return <Alert severity='error'>Error in fetching data</Alert>
  }
  return (
    <Container sx={{ my: 5 }} maxWidth='lg' >
      <Typography variant='h3' component={"h1"} pb={3} >{t("Products")}</Typography>

      <Grid container spacing={2}>
        {items?.map((product, index) => (
          product ? (
            <ProductGrid key={product.id} product={product} />
          ) : (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          )
        ))}
      </Grid>
    </Container>
  )
}
