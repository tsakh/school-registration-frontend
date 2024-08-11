import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Collapse, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';

const StepForAdmin = ({ stepData, onDelete, disabled }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">
                        {stepData.stepName}
                    </Typography>
                    <Box display="flex" alignItems="center">
                        {stepData.isCalendarEvent && (
                            <EventIcon style={{ marginLeft: '8px' }} color="primary" />
                        )}
                        <IconButton 
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                        {!disabled && (
                            <IconButton onClick={() => onDelete(stepData)}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Box>
                </Box>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="body2">{stepData.addInfo}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default StepForAdmin;
