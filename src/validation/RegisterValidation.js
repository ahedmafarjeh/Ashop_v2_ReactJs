import * as yup from 'yup';

export const registerSchema = yup.object({
    fullName: yup.string().required('Full Name is required'),
    userName: yup.string().required('User Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$@!%*?&_]/, 'Password must contain at least one special character')
      .required('Password is required'),
    phoneNumber: yup.string().required('Phone Number is required'),
  });