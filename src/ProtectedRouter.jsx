
import React from 'react'
import useAuthStore from './Store/useAuthStore';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouter({children}) {
  const token = useAuthStore((state) => state.token);
  if(!token){
    return <Navigate to={'/auth/login'}/>  
  }
  return children;
}
