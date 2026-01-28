import React from 'react'
import useFetch from './useFetch'
import i18n from '../i18n';

export default function useCategoryProducts(categoryId) {
  return useFetch(['categoryProducts', categoryId, i18n.language], `/Products/category/${categoryId}`);
}
