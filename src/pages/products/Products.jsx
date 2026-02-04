import React, { useState } from 'react'
import { useProducts } from '../../hooks/useProducts';
import { useForm } from 'react-hook-form';
import { Alert, CircularProgress, Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProductGrid from '../../components/products/ProductGrid';
import { useCategories } from '../../hooks/useCategories';
import ProductFiltersForm from '../../components/products/ProductFiltersForm';

export default function Products() {
    const { t } = useTranslation();

    const [page, setPage] = useState(1);
    const limit = 6;
    const [activeFilters, setActiveFilters] = useState({});
    const { isError, isLoading, data } = useProducts(activeFilters, page, limit);
    const totalPages = Math.ceil(data?.response?.totalCount / limit);

    const { data: categoriesData } = useCategories();


    if (isLoading) {
        return <CircularProgress />
    }
    if (isError) {
        return <Alert severity='error'>Error in fetching data</Alert>
    }
    return (
        <Container sx={{ my: 5 }} maxWidth='lg' >
            <ProductFiltersForm
                categories={categoriesData?.response}
                onSubmit={(values) => {
                    setActiveFilters(values);
                    setPage(1);
                }}
            />
            <Typography variant='h3' component={"h1"} pb={3} >{t("Products")}</Typography>

            <Grid container spacing={2}>
                {data.response.data?.length ?
                    data.response.data?.map((product) =>
                        <ProductGrid key={product.id} product={product} />
                    )
                    :
                    <Alert severity='info' sx={{ width: "100%" }}>There are no data matches your specifications</Alert>

                }
            </Grid>

            {totalPages > 1 && (
                <Stack alignItems="center" mt={4}>
                    <Pagination
                        page={page}
                        count={totalPages}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                    />
                </Stack>
            )}
        </Container>
    )
}
