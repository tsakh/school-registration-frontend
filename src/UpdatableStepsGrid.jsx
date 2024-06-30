import React from 'react';
import { Grid} from '@mui/material';
import UpdatableStepCard from './UpdatableStepCard';

export default function StepsGrid(props) {
    const { stepsData, updateStepData } = props;

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            {stepsData.map((stepData, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3} style={{ display: 'flex', justifyContent: 'center' }}>
                    <UpdatableStepCard stepData={stepData} updateStepData={(updatedStep) => updateStepData(index, updatedStep)} />
                </Grid>
            ))}
        </Grid>
    );
}
