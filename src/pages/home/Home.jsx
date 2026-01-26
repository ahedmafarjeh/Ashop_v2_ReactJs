import React from 'react'
import Categories from '../../components/categories/Categories'
import { Box } from '@mui/material'
import ProductsSection from '../products/ProductsSection'


export default function Home() {
  return (
    <Box >
      <Categories />   
      <ProductsSection />
    </Box>
  )
}
