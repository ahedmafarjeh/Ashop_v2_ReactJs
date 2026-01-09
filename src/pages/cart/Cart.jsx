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
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useTheme } from '@mui/material/styles';
import useUpdateCartItem from '../../hooks/useUpdateCartItem';
import userRemoveCartItem from '../../hooks/userRemoveCartItem';



export default function Cart() {
  const { isError, isLoading, data } = useCart();
  // console.log(data)
  const { mutate: updateCartItem, isPending: isUpdatingCartItem } = useUpdateCartItem();
  const { mutate: removeCartItem , isPending: isRemovingCartItem } = userRemoveCartItem();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleCartUpdate = (productId, count, action) => {
    
    if (action == '-') {
      updateCartItem({ productId, count: count - 1 });
    }
    else {
      updateCartItem({ productId, count: count + 1 });
    }
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

  // 💻 عرض Desktop (Table)
  return (
    <Container sx={{ my: 5 }} maxWidth='lg'>
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
                    <IconButton disabled={isUpdatingCartItem} size="small" color='primary' onClick={()=>handleCartUpdate(item.productId,item.count,'-')}>
                      <RemoveIcon fontSize="small" />
                    </IconButton>

                    <Typography sx={{ minWidth: 24, textAlign: 'center' }}>
                      {item.count}
                    </Typography>

                    <IconButton disabled={isUpdatingCartItem} size="small" color='primary' onClick={()=>handleCartUpdate(item.productId,item.count,'+')}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="center">{item.totalPrice}$</TableCell>
                <TableCell align="center">
                  <Button variant='outlined' color='error' disabled={isRemovingCartItem}
                   onClick={()=>removeCartItem(item.productId)}>
                    {isRemovingCartItem ? 'Removing...' : 'Remove'}
                    </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
