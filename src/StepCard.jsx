import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

const StepCard = ({ stepData, onDelete, disabled }) => {
    const { stepName } = stepData;

    const handleDelete = () => {
        onDelete(stepData);
    };

    return (
        <Card>
            <CardContent>
                <Typography>{stepName}</Typography>
            </CardContent>
            <CardActions>
                {disabled ? null : (
                    <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default StepCard;
