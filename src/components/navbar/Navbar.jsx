import React from 'react'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';


const drawerWidth = 240;
const pages = ['home','cart', 'login', 'register'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export default function Navbar(props) {
    const { window } = props;
  const currentPath = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    console.log(currentPath.pathname)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
    const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ASHOP
      </Typography>
      <Divider />
      <List>
        {pages.map((item) => (
          <ListItem  key={item} disablePadding>
            <ListItemButton component={Link} to={item == 'login' || item == 'register' ? `auth/${item}` : `/${item}`}  sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  return (

    <Box sx={{ display: 'flex' }}>  
      <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
           <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              mx:'auto'
            }}
          >
            ASHOP
          </Typography>
    
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => 
            <Button
              component={Link} 
              to={page == 'login' || page == 'register' ? `auth/${page}` : `/${page}`}
              onClick={handleCloseNavMenu}
              sx={{ m: 2, textAlign: 'center', color: 'white', display: 'block', bgcolor: currentPath.pathname === `/${page}` ? '#c62828' : 'inherit' }}
            >
              {page}
            </Button>
            )}
            
          </Box>

        </Toolbar>
      </Container>
    </AppBar>


      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>


    </Box>
  
    
  )
}
