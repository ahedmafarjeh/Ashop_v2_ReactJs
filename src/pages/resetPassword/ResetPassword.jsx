import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress, Container, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axiosinstance from '../../Api/axiosInstance';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState();
  const navigate = useNavigate();
  const resetPasswordSchema = yup.object({
    newPassword: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$@!%*?&_]/, 'Password must contain at least one special character')
      .required('Password is required'),
  });
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(
    {
      resolver: yupResolver(resetPasswordSchema),
      mode: 'onBlur'

    });
  const resetPassword = async (userInfo) => {
    userInfo.email = localStorage.getItem('email');
    try {
      const response = await axiosinstance.patch(`/Auth/Account/ResetPassword`, userInfo);
      // console.log(response)
      if (response.status === 200) {
        navigate('/auth/login');
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setServerError("Invalid code or other error occurred");
    }
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
