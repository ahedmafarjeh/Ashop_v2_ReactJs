import React from 'react'
import useProfile from '../../hooks/useProfile';
// import { Alert, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Container, Alert, Stack, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress } from '@mui/material';
import { format } from 'date-fns';
export default function ProfileOrders() {
  const { isError, isLoading, data } = useProfile();
  if (isLoading) {
    return <CircularProgress />
  }
  if (isError) {
    return <Alert severity='error'>Error in fetching data</Alert>
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {data?.orders.length === 0 ? (
        <Alert
          severity="info"
          sx={{
            mt: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack direction="row" alignItems="center">
            <Typography>There are no orders yet.</Typography>
          </Stack>
        </Alert>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ boxShadow: 3, borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={(theme) => ({
                  backgroundColor: theme.palette.primary.main, // من theme
                })}
              >
                <TableCell
                  align="center"
                  sx={{ color: (theme) => theme.palette.primary.contrastText, fontWeight: 'bold' }}
                >
                  Order Number
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: (theme) => theme.palette.primary.contrastText, fontWeight: 'bold' }}
                >
                  Amount Paid
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: (theme) => theme.palette.primary.contrastText, fontWeight: 'bold' }}
                >
                  Payment Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: (theme) => theme.palette.primary.contrastText, fontWeight: 'bold' }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: (theme) => theme.palette.primary.contrastText, fontWeight: 'bold' }}
                >
                  Order Date
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.orders.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={(theme) => ({
                    backgroundColor:
                      index % 2 === 0
                        ? theme.palette.action.hover // ألوان متدرجة حسب theme
                        : 'inherit',
                    '&:hover': {
                      backgroundColor: theme.palette.action.selected,
                    },
                  })}
                >
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{item.amountPaid}$</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color:
                        item.paymentStatus === 'unpaid'
                          ? 'error.main'
                          : 'success.main',
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                    }}
                  >
                    {item.paymentStatus}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color:
                        item.status === 'Active' ? 'success.main' : 'text.secondary',
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                    }}
                  >
                    {item.status}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(item.orderDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}
