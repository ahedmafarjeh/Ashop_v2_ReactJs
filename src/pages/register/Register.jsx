import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, CircularProgress, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup';
import axiosinstance from '../../Api/axiosInstance';
import { registerSchema } from '../../validation/RegisterValidation';
import { useMutation } from '@tanstack/react-query';
import { useRegister } from '../../hooks/useRegister';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const {serverErrors,registerMutation} = useRegister();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(
    {
      resolver: yupResolver(registerSchema),
      mode: 'onBlur'

    });
  
  const Register = async (userInfo) => {
    
    await registerMutation.mutateAsync(userInfo);
    // try {
    //   const response = await axiosinstance.post(`/Auth/Account/Register`, userInfo);
    //   // console.log(response.data.message)
    //   if (response.status === 201) {
    //     navigate('/auth/login');
    //   }
    // } catch (error) {
    //   console.error("Error registering user:", error);
    //   setServerErrors(error.response.data.errors);
    // }
  }
  return (
    <Box sx={{ bgcolor: "#90caf9", display: "flex", justifyContent: "center", alignItems: "center" }} height='100vh' width='inherit'>
      <Container sx={{ py: 5, bgcolor: "#cfd8dc", borderRadius: 5, boxShadow: 3 }}  >
        <Typography variant="h4" component='h1' textAlign="center">Create Account</Typography>
        {serverErrors?.length > 0 ?
          <Box sx={{ color: '#e91e63', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
            {serverErrors.map((error, index) => (
              <Typography key={index} variant="body2">{error}</Typography>
            ))}
          </Box>
          : null}
        <Box component='form' onSubmit={handleSubmit(Register)} width='inherit' pt={2} pb={5} px={5} display="flex" flexDirection="column" alignItems="center" gap={2}>
          <TextField autoComplete='off' {...register('fullName')} label="Full Name" variant="outlined" fullWidth
            error={errors?.fullName} helperText={errors?.fullName?.message} />
          <TextField autoComplete='off' {...register('userName')} label="User Name" variant="outlined" fullWidth
            error={errors?.userName} helperText={errors?.userName?.message} />
          <TextField autoComplete='off' {...register('email')} label="Email" variant="outlined" fullWidth
            error={errors?.email} helperText={errors?.email?.message} />
          <TextField
            autoComplete='off'
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            label="Password"
            variant="outlined"
            fullWidth
            error={!!errors?.password}
            helperText={errors?.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseUp={(event) => event.preventDefault()}
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
          <TextField autoComplete='off' {...register('phoneNumber')} label="Phone Number" variant="outlined" fullWidth
            error={errors?.phoneNumber} helperText={errors?.phoneNumber?.message} />
          <Button type='submit' variant="contained" color="success" >
            {isSubmitting ? <CircularProgress color='inherit' /> : "Register"}
          </Button>
        </Box>
        <Typography textAlign='center' variant='body2'>Have already an account? <Link to='/auth/login'>Login here</Link></Typography>
      </Container>
    </Box>

  )
}
