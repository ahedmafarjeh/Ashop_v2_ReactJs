import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { InfoOutline, Logout, ShoppingCart } from '@mui/icons-material';
import useAuthStore from '../../Store/useAuthStore';
import { Button } from '@mui/material';
import useThemeStore from '../../Store/useThemeStore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';


const drawerWidth = 240;

export default function ResponsiveDrawer() {
  //   const { window } = props;
  const { t } = useTranslation();
  const { mode, toggleMode } = useThemeStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const currentPath = useLocation();
  // console.log(currentPath)
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const signout = () => {
    logout();
    navigate('/auth/login');
  }
  const drawer = (
    <Box>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AccountCircleIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography sx={{ml:2}}>{t("WLC")} {useAuthStore.getState().user?.name}</Typography>
      </Toolbar>      
      <Divider />
      <List>

        <ListItem disablePadding>
          <ListItemButton sx={{ bgcolor: currentPath.pathname === `/profile` ? '#c62828' : 'inherit' }} component={Link} to="/profile">
            <ListItemIcon>
              <InfoOutline />
            </ListItemIcon>
            <ListItemText primary={t("Info")} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton sx={{ bgcolor: currentPath.pathname === `/profile/orders` ? '#c62828' : 'inherit' }} component={Link} to="/profile/orders">
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary={t("Orders")} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={signout} >
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={t("Logout")} />
          </ListItemButton>
        </ListItem>

      </List>

    </Box>
  );

  // Remove this const when copying and pasting into your project.
  //   const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{display:"flex", justifyContent:"space-between", width:"100%"}}>
             <Typography variant="h6" noWrap component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            AShop
          </Typography>
           <Box >
              <Button color='inherit' onClick={toggleMode} >
                {mode === "light" ? "🌙" : "☀️"}
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          //   container={container}
          variant="temporary"
          
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{

            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
         
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box', width: drawerWidth,


            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}