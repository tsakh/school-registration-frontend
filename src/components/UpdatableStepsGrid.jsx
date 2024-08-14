import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid } from '@mui/material';
import UpdatableStepCard from './UpdatableStepCard';
import AdminSideMenu from './AdminSideMenu';

export default function UpdatableStepsGrid() {
    const [stepsData, setStepsData] = useState([]);
    const [menuHover, setMenuHover] = useState(false);
    const [renderAgain, setRenderAgain] = useState(true);

    useEffect(() => {
        const fetchStepsData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/admin/steps', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    },
                });
                setStepsData(response.data); 
            } catch (error) {
                console.error('Error fetching steps data:', error);
            }
        };

        fetchStepsData();
    }, [renderAgain]);

    
    const dataUpdated = () => {
        setRenderAgain(!renderAgain);
    }
    const updateStepData = (index, updatedStep) => {
        const updatedSteps = [...stepsData];
        updatedSteps[index] = updatedStep;
        setStepsData(updatedSteps);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AdminSideMenu onHover={setMenuHover} />
            <Box
                sx={{
                    flexGrow: 1,
                    ml: menuHover ? '20vw' : '5vw',
                    transition: 'margin-left 0.3s',
                    padding: 2,
                }}
            >
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {stepsData.map((stepData, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3} style={{ display: 'flex', justifyContent: 'center' }}>
                            <UpdatableStepCard stepData={stepData} updateStepData={(updatedStep) => updateStepData(index, updatedStep)} onUpdate = {dataUpdated} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
