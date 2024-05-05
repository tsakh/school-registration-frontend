import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StepCard = ({ stepData }) => {
    const { stepName } = stepData;

    return (
        <Card>
            <CardContent>
                <Typography>{stepName}</Typography>
            </CardContent>
        </Card>
    );
};

export default StepCard;
