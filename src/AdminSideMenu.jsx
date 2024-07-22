import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UpdateIcon from '@mui/icons-material/Update';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';

const AdminSideMenu = () => {
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        navigate('/');
        alert('Logged out');
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
                overflow: 'hidden', 
            }}
        >
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <AccountCircleIcon fontSize="large" />
                <Typography variant="h6" sx={{ display: hover ? 'block' : 'none', mt: 1 }}>
                    Admin Info
                </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, width: '100%' }}>
                <Box sx={{ width: '100%', mb: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<UpdateIcon />}
                        sx={{ display: 'flex', justifyContent: hover ? 'flex-start' : 'center', width: '100%' }}
                        onClick={() => handleNavigation('/update')}
                    >
                        {hover && 'Update'}
                    </Button>
                </Box>
                <Box sx={{ width: '100%', mb: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleIcon />}
                        sx={{ display: 'flex', justifyContent: hover ? 'flex-start' : 'center', width: '100%' }}
                        onClick={() => handleNavigation('/add')}
                    >
                        {hover && 'Add'}
                    </Button>
                </Box>
                <Box sx={{ width: '100%', mb: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<HowToRegIcon />}
                        sx={{ display: 'flex', justifyContent: hover ? 'flex-start' : 'center', width: '100%' }}
                        onClick={() => handleNavigation('/register')}
                    >
                        {hover && 'Register'}
                    </Button>
                </Box>
                <Box sx={{ width: '100%', mb: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ManageAccountsIcon />}
                        sx={{ display: 'flex', justifyContent: hover ? 'flex-start' : 'center', width: '100%' }}
                        onClick={() => handleNavigation('/management')}
                    >
                        {hover && 'Management'}
                    </Button>
                </Box>
            </Box>
            <Box sx={{ width: '100%', mb: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<LogoutIcon />}
                    sx={{ display: 'flex', justifyContent: hover ? 'flex-start' : 'center', width: '100%' }}
                    onClick={handleLogout}
                >
                    {hover && 'Logout'}
                </Button>
            </Box>
        </Box>
    );
};

export default AdminSideMenu;
