import * as yup from 'yup';

export const SendCodeSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
  });