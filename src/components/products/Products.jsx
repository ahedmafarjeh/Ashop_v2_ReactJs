
import React from 'react'
import { useProducts } from '../../hooks/useProducts'
import { Alert, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Link, Typography } from '@mui/material';
import { Link as routerLink } from 'react-router-dom'

export default function Products() {
  const { isError, isLoading, data } = useProducts();
  if (isLoading) {
    return <CircularProgress />
  }
  if (isError) {
    return <Alert severity='error'>Error in fetching data</Alert>
  }
  return (
    <Container sx={{ my: 5 }} maxWidth='lg'>
      <Grid container spacing={2}>
        {data?.map((product) =>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Link component={routerLink} underline='none'>
              <Card sx={{
                 transition: 'transform 0.2s',
                "&:hover": {
                  transform: 'scale(1.05)',

                }
              }}>
                <CardMedia
                  component={"img"}
                  sx={{ height: 140, objectFit: 'contain' }}
                  image={product.image}
                  title={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Price:{product.price}$
                  </Typography>
                </CardContent>
              </Card>
            </Link>

          </Grid>
        )}
      </Grid>
    </Container>
  )
}
