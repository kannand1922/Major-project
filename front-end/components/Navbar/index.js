"use client"
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    document.cookie = 'userId=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  document.cookie = 'role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/login'); // Redirect to login page
  };

  const handleNavigation = (item) => {
    if (role === '1') {
      if (item === 'Products') {
        router.push('/category');
      } else if (item === 'Order') {
        router.push('/order');
      } else {
        router.push('/');
      }
    } else {
      if (item === 'Products') {
        router.push('/userCategory');
      } else if (item === 'Cart') {
        router.push('/userCart');
      } else if (item === 'Order') {
        router.push('/userOrder');
      } else {
        router.push('/');
      }
    }
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          TradeHub
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {['Home', 'Products', 'Cart', 'Order'].map((item, index) => {
            if (role === '1' && item === 'Cart') {
              return null;
            }

            const icons = {
              Home: <HomeIcon />,
              Products: <CategoryIcon />,
              Cart: <ShoppingCartIcon />,
              Order: <ListAltIcon />
            };

            return (
              <IconButton
                key={item}
                color="inherit"
                onClick={() => handleNavigation(item)}
                onMouseEnter={() => setActiveSection(index)}
                sx={{ position: 'relative' }}
              >
                {icons[item]}
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  {item}
                </Typography>
                {activeSection === index && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  />
                )}
              </IconButton>
            );
          })}
        </Box>
        {/* Logout Button */}
        <Button
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ marginLeft: 2 }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
