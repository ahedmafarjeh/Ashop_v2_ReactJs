import React, { useState } from 'react'
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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, ButtonBase, Container } from '@mui/material';
import useAuthStore from '../../Store/useAuthStore';
import { useTranslation } from 'react-i18next';
import useThemeStore from '../../Store/useThemeStore';


const drawerWidth = 240;
const pages = ['home', 'cart', 'login', 'register'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export default function Navbar(props) {
  const { window } = props;
  const navigate = useNavigate();
  const currentPath = useLocation();
  const token = useAuthStore((state) => state.token);
  const Logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const { mode, toggleMode } = useThemeStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const container = window !== undefined ? () => window().document.body : undefined;
  const { t, i18n } = useTranslation();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const signout = () => {
    Logout();
    navigate('auth/login');
  }

  const toggleLanguage = () => {
    const newLang = i18n.language == "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  }


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ASHOP
      </Typography>
      <Divider />
      <List>

        <ListItem disablePadding sx={{ display: 'block' }}>
          {token != null ?

            <>
              <ListItemButton component={Link} to={`/`} sx={{ textAlign: 'center', bgcolor: currentPath.pathname === `/` || currentPath.pathname === `/` ? '#c62828' : 'inherit' }}>
                <ListItemText primary={t('Home')} />
              </ListItemButton>

              <ListItemButton component={Link} to={`/cart`} sx={{ textAlign: 'center', bgcolor: currentPath.pathname === `/cart` ? '#c62828' : 'inherit' }}>
                <ListItemText primary={t('Cart')} />
              </ListItemButton>


              <ListItemButton onClick={signout} sx={{ textAlign: 'center' }}>
                <ListItemText primary={t('Logout')} />
              </ListItemButton>
            </>
            :
            // <ListItemButton component={Link} to={item == 'login' || item == 'register' ? `auth/${item}` : `/${item}`}  sx={{ textAlign: 'center' }}>
            <>
              <ListItemButton component={Link} to={`auth/login`} sx={{ textAlign: 'center' }}>
                <ListItemText primary={t('Login')} />
              </ListItemButton>

              <ListItemButton component={Link} to={`auth/register`} sx={{ textAlign: 'center' }}>
                <ListItemText primary={t('Register')} />
              </ListItemButton>
            </>
          }

        </ListItem>

      </List>
    </Box>
  );


  return (

    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
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
                mx: 'auto'
              }}
            >
              ASHOP
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
              {token != null ?
                <>
                  <Button
                    component={Link}
                    to={'/'}
                    // onClick={handleCloseNavMenu}
                    sx={{ m: 2, textAlign: 'center', color: 'white', display: 'block', bgcolor: currentPath.pathname === `/` || currentPath.pathname === `/` ? '#c62828' : 'inherit' }}
                  >
                    {t("Home")}
                  </Button>

                  <Button
                    component={Link}
                    to={`/cart`}
                    // onClick={handleCloseNavMenu}
                    sx={{ m: 2, textAlign: 'center', color: 'white', display: 'block', bgcolor: currentPath.pathname === `/cart` ? '#c62828' : 'inherit' }}
                  >
                    {t("Cart")}
                  </Button>

                  <Button

                    onClick={signout}
                    sx={{ m: 2, textAlign: 'center', color: 'white', display: 'block' }}
                  >
                    {t("Logout")}
                  </Button>
                </>
                :
                <>
                  <Button
                    component={Link}
                    to={`auth/login`}
                    // onClick={handleCloseNavMenu}
                    sx={{ m: 2, textAlign: 'center', color: 'white', display: 'block', bgcolor: currentPath.pathname === `/login` ? '#c62828' : 'inherit' }}
                  >
                    {t("Login")}
                  </Button>

                  <Button
                    component={Link}
                    to={`auth/register`}
                    // onClick={handleCloseNavMenu}
                    sx={{ m: 2, textAlign: 'center', color: 'white', display: 'block', bgcolor: currentPath.pathname === `/register` ? '#c62828' : 'inherit' }}
                  >
                    {t("Register")}
                  </Button>
                </>

              }

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {user && token ?
                <>
                  <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{user.name}</Typography>
                  <Avatar alt={user.name} >{user.name.charAt(0).toUpperCase()}</Avatar>
                </>
                : null}

            </Box>
            <Box>
              <Button color='inherit' onClick={toggleLanguage} >
                {i18n.language == "ar" ? "EN" : "ع"}
              </Button>
            </Box>
            <Box>
              <Button color='inherit' onClick={toggleMode} >
                {mode === "light" ? "🌙" : "☀️"}
              </Button>
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
      <Toolbar disableGutters />

    </Box>


  )
}
