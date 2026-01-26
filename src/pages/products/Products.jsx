import React from 'react'
import { useProducts } from '../../hooks/useProducts';
import { useForm } from 'react-hook-form';
import { Alert, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProductGrid from '../../components/products/ProductGrid';
import { useCategories } from '../../hooks/useCategories';
import ProductFiltersForm from '../../components/products/ProductFiltersForm';

export default function Products() {
    const { t } = useTranslation();

    const { register, handleSubmit } = useForm({
        defaultValues: {
            search: '',
            categoryId: '',
            minPrice: '',
            maxPrice: ''
        }
    });
    const [activeFilters, setActiveFilters] = React.useState({});
    const { isError, isLoading, data } = useProducts(activeFilters);
    const { data: categoriesData } = useCategories();
    

    const applyFilters = (data) => {
        setActiveFilters({
            search: data.search || null,
            categoryId: data.categoryId || null,
            minPrice: data.minPrice || null,
            maxPrice: data.maxPrice || null
        });
    }

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
                onSubmit={(values) => setActiveFilters(values)}
            />
            <Typography variant='h3' component={"h1"} pb={3} >{t("Products")}</Typography>

            <Grid container spacing={2}>
                {data.response.data?.length?
                   data.response.data?.map((product) =>
                    <ProductGrid key={product.id} product={product} />
                )
                :
                 <Alert severity='info' sx={{width:"100%"}}>There are no data matches your specifications</Alert>
            
            }
            </Grid>
        </Container>
    )
}
