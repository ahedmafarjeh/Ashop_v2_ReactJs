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
  Alert,
  Stack,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTheme } from '@mui/material/styles';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';
import userRemoveCartItem from '../../hooks/userRemoveCartItem';
import { useNavigate } from 'react-router-dom';
import useClearCart from '../../hooks/useClearCart';



export default function Cart() {
  const { isError, isLoading, data } = useCart();
  console.log(data)
  const navigate = useNavigate();
  const { mutate: updateCartItem, isPending: isUpdatingCartItem } = useUpdateCartItem();
  const { mutate: removeCartItem, isPending: isRemovingCartItem } = userRemoveCartItem();
  const {mutate: clearCart, isPending: isClearingCart} = useClearCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleCartUpdate = (productId, count, action) => {

    if (action == '-') {
      if (count > 1) {
        updateCartItem({ productId, count: count - 1 });

      }
    }
    else {
      updateCartItem({ productId, count: count + 1 });
    }
  }
  const handleClearCart = () => {
    const productsIds = data.items.map(item => item.productId);
    console.log(productsIds)
    clearCart(productsIds);
  }
  if (isLoading) {
    return <CircularProgress />
  }
  // if (isMobile) {
  //   // 📱 عرض موبايل (Cards)
  //   return (
  //     <Box display="flex" flexDirection="column" gap={2}>
  //       {cartItems.map((item) => (
  //         <Paper key={item.id} sx={{ p: 2 }}>
  //           <Typography fontWeight="bold">{item.name}</Typography>
  //           <Typography>Price: ${item.price}</Typography>
  //           <Typography>Qty: {item.qty}</Typography>
  //           <Typography fontWeight="bold">
  //             Total: ${item.price * item.qty}
  //           </Typography>
  //         </Paper>
  //       ))}
  //     </Box>
  //   );
  // }

  //  عرض Desktop (Table)
  return (

    <Container sx={{ my: 5 }} maxWidth='lg'>
      {data?.items.length == 0 ?
        <Alert severity="info" sx={{ mt: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.items.map((item, index) =>
                  <TableRow key={item.productId}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{item.productName}</TableCell>
                    <TableCell align="center">{item.price}$</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          px: 1,
                          width: 'fit-content',
                        }}
                      >
                        <IconButton disabled={isUpdatingCartItem} size="small" color='primary' onClick={() => handleCartUpdate(item.productId, item.count, '-')}>
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography sx={{ minWidth: 24, textAlign: 'center' }}>
                          {item.count}
                        </Typography>

                        <IconButton disabled={isUpdatingCartItem} size="small" color='primary' onClick={() => handleCartUpdate(item.productId, item.count, '+')}>
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{item.totalPrice}$</TableCell>
                    <TableCell align="center">
                      <Button variant='outlined' color='error' disabled={isRemovingCartItem}
                        onClick={() => removeCartItem(item.productId)}>
                        {isRemovingCartItem ? 'Removing...' : 'Remove'}
                      </Button>
                    </TableCell>
                  </TableRow>
                )}

              </TableBody>
            </Table>
          </TableContainer>

          <Box
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
          </Box>


          <Box sx={{ display: "flex", gap: 2 }}>
            <Button onClick={() => navigate("/checkout")} variant='contained' color='primary' sx={{ mt: 3, flexGrow: 1 }}>Checkout</Button>
            <Button onClick={() => navigate("/")} variant='outlined' color='secondary' sx={{ mt: 3, flexGrow: 1 }}>Continue Shoping</Button>
            <Button
              onClick={handleClearCart}
              disabled={isClearingCart}
              variant='outlined'
              color='error'
              sx={{ mt: 3, flexGrow: 1 }}
            >
              Clear Cart
            </Button>

          </Box>
        </>

      }
    </Container>

  );
}
