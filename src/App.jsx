import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './route'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import LanguageManager from './utils/LanguageManager';
import { ThemeProvider } from '@emotion/react';
import useThemeStore from './Store/useThemeStore';
import { CssBaseline } from '@mui/material';
import setTheme from './theme.js';


export default function App() {
  const queryClient = new QueryClient();
  const mode = useThemeStore((state) => state.mode);
  const theme = setTheme(mode);
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageManager />
      
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
    
  )
}
