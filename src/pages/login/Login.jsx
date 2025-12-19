import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, CircularProgress, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup';
import axiosinstance from '../../Api/axiosInstance';
import useAuthStore from '../../Store/useAuthStore';

export default function Login() {
  const Login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState();
  const navigate = useNavigate();
  const loginSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$@!%*?&_]/, 'Password must contain at least one special character')
      .required('Password is required'),

  });
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur'
  });
  const login = async (userInfo) => {

    try {
      const response = await axiosinstance.post(`/Auth/Account/Login`, userInfo);
      // console.log(response.data.accessToken)
      // localStorage.setItem('token', response.data.accessToken);
      Login(response.data.accessToken);
      if (response.status === 200) {
        navigate('/home');
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setServerError(error.response.data.message);
    }
  }
  return (
    <Box sx={{ bgcolor: "#90caf9", display: "flex", justifyContent: "center", alignItems: "center" }} height='100vh' width='inherit'>

      <Container sx={{ py: 5, bgcolor: "#cfd8dc", borderRadius: 5, boxShadow: 3 }}  >
        <Typography variant="h4" component='h1' textAlign="center">Login</Typography>
        {serverError ? <Typography mt={1} variant="body2" color="#e91e63" textAlign="center">{serverError}</Typography> : null}
        <Box component='form' onSubmit={handleSubmit(login)} width='inherit' mt={5} mb={5} px={5} display="flex" flexDirection="column" alignItems="center" gap={2}>

          <TextField {...register('email')} label="Email" variant="outlined" fullWidth autoComplete='off'
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

          <Typography textAlign='right' width='100%' variant='body2' color='primary'><Link to='/auth/send-code'>Forgot Password?</Link></Typography>
          <Button type='submit' variant="contained" color="success" >
            {isSubmitting ? <CircularProgress color='inherit' /> : "Login"}
          </Button>
        </Box>
        <Typography textAlign='center' variant='body2'>Dont't have an account? <Link to='/auth/register'>Register here</Link></Typography>

      </Container>
    </Box>
  )
}

