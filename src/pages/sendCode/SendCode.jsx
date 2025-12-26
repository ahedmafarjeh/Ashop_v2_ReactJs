import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress, Container, Divider, TextField, Typography } from '@mui/material';

import { SendCodeSchema } from '../../validation/SendCodeValidation';
import { useSendCode } from '../../hooks/useSendCode';

export default function SendCode() {
  const { serverError, sendCodeMutation } = useSendCode();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(SendCodeSchema),
    mode: 'onBlur'
  });
  const sendCode = async (userInfo) => {
    localStorage.setItem('email', userInfo.email);
    await sendCodeMutation.mutateAsync(userInfo);

  }
  return (
    <Box sx={{ bgcolor: "#90caf9", display: "flex", justifyContent: "center", alignItems: "center" }} height='100vh' width='inherit'>

      <Container sx={{ py: 5, bgcolor: "#cfd8dc", borderRadius: 5, boxShadow: 3 }}  >
        <Typography variant="h4" component='h1' textAlign="center">Send Code</Typography>
        {serverError ? <Typography mt={1} variant="body2" color="#e91e63" textAlign="center">{serverError}</Typography> : null}
        <Box component='form' onSubmit={handleSubmit(sendCode)} width='inherit' mt={5} mb={2} px={5} display="flex" flexDirection="column" alignItems="center" gap={2}>

          <TextField {...register('email')} label="Email" variant="outlined" fullWidth autoComplete='off'
            error={errors?.email} helperText={errors?.email?.message} />

          <Button type='submit' variant="contained" color="success" >
            {isSubmitting ? <CircularProgress color='inherit' /> : "Send Code"}
          </Button>
        </Box>
        <Divider sx={{ width: '50%', mx: 'auto' }}>or</Divider>
        ْ<Typography variant='body1' textAlign='center'>Go to <Link to='/auth/login'>login page</Link> </Typography>

      </Container>
    </Box>
  )
}
