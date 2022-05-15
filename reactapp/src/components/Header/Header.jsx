import React, { useState, useEffect } from 'react';
import './Header.css';
import { useStateValue } from '../../functions/Utils/StateProvider';
import { actionTypes } from '../../functions/Utils/Reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

function AdminHeader({ highlight}) {

  const [{userType}, dispatch] = useStateValue();
  const [menuItems, setMenuItems] = useState([]);
  const [anchorElNav, setAnchorElNav] = useState(null);
  let navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const logoutUser = () => {
    dispatch({
      type: actionTypes.SET_USER,
      user: null,
      userType: null
    })
    AsyncStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    userType.toLowerCase() === 'admin' 
      ? setMenuItems([{"name":'Users', "route": '/admin/displayUsers'}, {"name":'Venues', "route": '/admin/viewVenue'}, {"name":'Teams', "route": '/admin/'}, {"name":'Referees', "route": '/admin/'}]) 
      : userType.toLowerCase() === 'organizer' 
        ? setMenuItems([{"name":'View Events', "route": '/organizer/displayEvents'}, {"name":'Create Event', "route": '/organizer/createEvent'}])
        : setMenuItems([{"name":'Book Tickets', "route": '/user/displayEvents'}, {"name":'View Booked Tickets', "route": '/user/'}])
  }, [userType])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            noWrap
            component="div"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <img src="../assets/Header/logo.png" alt="logo" className="Header-Logo"/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <span className="material-icons">menu</span>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {
                menuItems.map((menuItem) => (
                  <MenuItem key={menuItem.name} onClick={() => navigate(menuItem.route)}>
                    <Typography textAlign="center">{menuItem.name}</Typography>
                  </MenuItem>
                ))
              }
            </Menu>
          </Box>

          <Typography
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src="../assets/Header/logo.png" alt="logo" className="Header-Logo"/>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: '30px' }}>
            {
              menuItems.map(menuItem => (
                <Button 
                  key={menuItem.name} 
                  onClick={() => navigate(menuItem.route)}  
                  className="Header-Button"            
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {menuItem.name}
                </Button>
              ))
            }
          </Box>

          <Button color="inherit" onClick={() => logoutUser()}>Logout</Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default AdminHeader