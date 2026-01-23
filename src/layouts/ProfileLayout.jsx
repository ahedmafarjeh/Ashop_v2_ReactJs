import { Box, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveDrawer from '../components/drawer/ResponsiveDrawer'

export default function ProfileLayout() {
    return (
        <Box sx={{ display: 'flex' }}>

            <ResponsiveDrawer />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <Toolbar />
                <Outlet />
            </Box>




        </Box>
    )
}
