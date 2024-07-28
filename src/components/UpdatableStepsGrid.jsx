import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import UpdatableStepCard from './UpdatableStepCard';
import AdminSideMenu from './AdminSideMenu';

export default function UpdatableStepsGrid(props) {
    const { stepsData, updateStepData } = props;
    const [menuHover, setMenuHover] = useState(false);

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
                            <UpdatableStepCard stepData={stepData} updateStepData={(updatedStep) => updateStepData(index, updatedStep)} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
