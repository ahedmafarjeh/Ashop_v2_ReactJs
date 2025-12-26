import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress, Container, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axiosinstance from '../../Api/axiosInstance';
import { resetPasswordSchema } from '../../validation/ResetPassword';
import { useResetPassword } from '../../hooks/useResetPassword';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const {serverError, resetPasswordMutation} = useResetPassword();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(
    {
      resolver: yupResolver(resetPasswordSchema),
      mode: 'onBlur'

    });
  const resetPassword = async (userInfo) => {
    userInfo.email = localStorage.getItem('email');
    await resetPasswordMutation.mutateAsync(userInfo);
    localStorage.removeItem('email');
  
  }
  return (
    <Box sx={{ bgcolor: "#90caf9", display: "flex", justifyContent: "center", alignItems: "center" }} height='100vh' width='inherit'>

      <Container sx={{ py: 5, bgcolor: "#cfd8dc", borderRadius: 5, boxShadow: 3 }}  >
        <Typography variant="h4" component='h1' textAlign="center">Reset Password</Typography>
        {serverError ? <Typography mt={1} variant="body2" color="#e91e63" textAlign="center">{serverError}</Typography> : null}
        <Box component='form' onSubmit={handleSubmit(resetPassword)} width='inherit' mt={5} mb={2} px={5} display="flex" flexDirection="column" alignItems="center" gap={2}>

          <TextField
            autoComplete='off'
            {...register('newPassword')}
            type={showPassword ? 'text' : 'password'}
            label="New Password"
            variant="outlined"
            fullWidth
            error={!!errors?.newPassword}
            helperText={errors?.newPassword?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label={
                        showPassword ? 'hide password' : 'show password'
                      }
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField {...register('code')} label="Code" variant="outlined" fullWidth autoComplete='off' />

          <Button type='submit' variant="contained" color="success" >
            {isSubmitting ? <CircularProgress color='inherit' /> : "Reset Password"}
          </Button>
        </Box>

        <Divider sx={{ width: '50%', mx: 'auto' }}>or</Divider>
        ْ<Typography variant='body1' textAlign='center'>Go to <Link to='/auth/login'>login page</Link> </Typography>
      </Container>
    </Box>
  )
}
