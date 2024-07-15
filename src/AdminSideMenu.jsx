import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AdminSideMenu = () => {
    const [hover, setHover] = useState(false);

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    return (
        <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                position: 'fixed',
                left: 0,
                top: 0,
                height: '100vh',
                width: hover ? 200 : 60,
                backgroundColor: 'white',
                transition: 'width 0.3s',
                color: 'black',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 2,
                boxShadow: 3, 
            }}
        >
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <AccountCircleIcon fontSize="large" />
                <Typography variant="h6" sx={{ display: hover ? 'block' : 'none', mt: 1 }}>
                    Admin Info
                </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ display: hover ? 'block' : 'none' }}
                    onClick={() => alert('Logout')}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
};

export default AdminSideMenu;
