import React, { useState } from 'react';
import { Button, Box, Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StepCard from './StepCard'; 

const StepCardList = () => {
    const [stepName, setStepName] = useState('');
    const [cards, setCards] = useState([]);

    const handleAddCard = () => {
        const newCard = {
            stepName: stepName.trim() !== '' ? stepName : 'New Step', 
        };
        setCards([...cards, newCard]);
        setStepName(''); 
        cards.forEach((card, index) => {
            console.log(`Step ${index + 1}: ${card.stepName}`);
        });
    };

    return (
        <Box>
            <Box mb={2}>
                <Grid container spacing={2} justifyContent='center' alignItems='center' textAlign='center'>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label="Step Name"
                            variant="outlined"
                            value={stepName}
                            onChange={(e) => setStepName(e.target.value)}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'white', 
                                },
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddCard}
                            disabled={stepName.trim() === ''}
                        >
                            <AddIcon />
                            Add Step
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={2} justifyContent='center' alignItems='center' textAlign='center'>
                {cards.map((card, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <StepCard key={index} stepData={card} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default StepCardList;
