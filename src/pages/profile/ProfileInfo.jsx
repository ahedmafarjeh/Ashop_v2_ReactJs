import React from 'react'
import useProfile from '../../hooks/useProfile';
import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';

export default function ProfileInfo() {
   const { isError, isLoading, data } = useProfile();
    console.log(data)
  return (
    <Card sx={{  width: { xs: '90%', sm: 500 }  }}>
  <CardContent>
    <Typography variant="h6" gutterBottom>
      User Information
    </Typography>

    <List>
      <ListItem>
        <ListItemText primary="Name" secondary={data?.fullName} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Email" secondary={data?.email} />
      </ListItem>
      <ListItem>
        <ListItemText primary="City" secondary={data?.city} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Phone" secondary={data?.phoneNumber} />
      </ListItem>
    </List>
  </CardContent>
</Card>

  )
}
