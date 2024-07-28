import * as React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate(-1); 
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                backgroundColor: '#f5f5f5', 
                padding: 4
            }}
        >
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" component="h1" color="error" gutterBottom>
                    Unauthorized Access
                </Typography>
                <Typography variant="h6" component="p" color="textSecondary">
                    You do not have the necessary permissions to view this page.
                </Typography>
            </Box>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleGoHome}
                sx={{ mt: 2 }}
            >
                Go to Home Page
            </Button>
        </Container>
    );
}
