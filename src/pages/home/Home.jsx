import React from 'react'
import Categories from '../../components/categories/Categories'
import Products from '../products/Products'
import { Box } from '@mui/material'


export default function Home() {
  return (
    <Box >
      <Categories />   
      <Products />
    </Box>
  )
}
