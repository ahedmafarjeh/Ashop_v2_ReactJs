import React from 'react'
import { useParams } from 'react-router-dom'
import useCategoryProducts from '../../hooks/useCategoryProducts';
import { Alert, CircularProgress, Container, Grid, Typography } from '@mui/material';
import ProductGrid from '../../components/products/ProductGrid';
import { useTranslation } from 'react-i18next';

export default function CategoryProducts() {
    const {categoryId} = useParams();
    const {data, isLoading, isError} = useCategoryProducts(categoryId);
    // console.log(data)
    const {t} = useTranslation();
    if (isLoading) {
        return <CircularProgress />
      }
      if (isError) {
        return <Alert severity='error'>Error in fetching data</Alert>
      }
  return (
    <Container sx={{ my: 5 }} maxWidth='lg' >
      <Typography variant='h3' component={"h1"} pb={3} >{t("Products")}</Typography>

      <Grid container spacing={2}>
        {data.response?.map((product) =>
          <ProductGrid key={product.id} product={product} />
        )}
      </Grid>
    </Container>
  )
}
