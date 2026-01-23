import React from 'react'
import useFetch from './useFetch'
import axiosAuthInstance from '../Api/axiosAuthInstance';

export default function useProfile() {
  return useFetch(['profile'], '/Profile', axiosAuthInstance);
}
