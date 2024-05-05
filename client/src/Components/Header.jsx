import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material'; // Import Material-UI components
import { Link } from 'react-router-dom'; // Import Link for routing

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
          Recipe Management
        </Typography>
        <Button component={Link} to="/add" color="inherit">Add Recipe</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
