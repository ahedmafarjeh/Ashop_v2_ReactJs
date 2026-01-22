import React from 'react'
import useCart from '../../hooks/useCart'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useMediaQuery,
  Container,
  Button,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Stack
} from '@mui/material';
import useCheckout from '../../hooks/useCheckout';
import { useNavigate } from 'react-router-dom';


export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = React.useState('cash');
  const navigate = useNavigate();
  const { isError, isLoading, data } = useCart();
  const {mutate: checkoutMutate, isPending: isCheckoutPending, isError: isCheckoutError} = useCheckout();
  const handleCheckout = () =>{
    checkoutMutate({paymentMethod});
  }
  return (
    <Container sx={{ my: 5 }} maxWidth='lg'>
      {data?.items.length == 0 ?
      <Alert severity="info" sx={{ mt: 5 , display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
          <Stack direction="row" alignItems="center">
            <Typography>Your cart is empty.</Typography>
            <Button onClick={() => navigate("/")} color="primary">Go Shopping</Button>
          </Stack>
        </Alert>
    :  
    <>
    <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID#</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Count</TableCell>
              <TableCell align="center">Total Price</TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {data?.items.map((item, index) =>
              <TableRow key={item.productId}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{item.productName}</TableCell>
                <TableCell align="center">{item.price}$</TableCell>
                <TableCell align="center">{item.count}</TableCell>
                <TableCell align="center">{item.totalPrice}$</TableCell>

              </TableRow>
            )}

          </TableBody>
        </Table>
      </TableContainer>

      {data.length && <Box
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            minWidth: 300,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          
          }}
        >
          <Typography variant="h6">
            Total
          </Typography>

          <Typography variant="h6" color="primary">
            {data?.cartTotal}$
          </Typography>
        </Paper>
      </Box>}


      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Typography variant="h6" mb={2}>
          Payment Method
        </Typography>

        <RadioGroup
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value="cash" control={<Radio />} label="Cash" />
          <FormControlLabel value="visa" control={<Radio />} label="Visa" />
        </RadioGroup>

        <Button
          variant="contained"
          color="primary"     
          sx={{ mt: 3, width: '100%' }}
          disabled={isCheckoutPending}  
          onClick={handleCheckout}
        >
          {paymentMethod === 'visa' ? 'Pay with Visa' : 'Place Order'}
        </Button>
      </Paper>
    
    </>
    }

    </Container>
  )
}
