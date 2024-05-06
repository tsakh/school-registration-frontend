import React, { useState } from 'react';
import { Button, Box, Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StepCard from './StepCard'; 

const StepCardList = () => {
    const [stepName, setStepName] = useState('');
    const [cards, setCards] = useState([]);
    const [editMode, setEditMode] = useState(false); 

    const handleAddCard = () => {
        if (editMode) {
            const newCard = {
                stepName: stepName.trim() !== '' ? stepName : 'New Step', 
            };
            setCards([...cards, newCard]);
            setStepName(''); 
        }
    };

    const handleDeleteCard = (deletedCard) => {
        if (editMode) {
            const updatedCards = cards.filter(card => card !== deletedCard); 
            setCards(updatedCards);
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
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
                            disabled={!editMode} 
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddCard}
                            disabled={!editMode || stepName.trim() === ''}
                        >
                            <AddIcon />
                            Add Step
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color={editMode ? "success" : "primary"} 
                            onClick={toggleEditMode}
                        >
                            {editMode ? 'Save' : 'Edit'} {}
                        </Button>
                    </Grid>
                    
                </Grid>
            </Box>
            <Grid container spacing={2} justifyContent='center' alignItems='center' textAlign='center'>
                {cards.map((card, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <StepCard 
                            stepData={card} 
                            onDelete={handleDeleteCard} 
                            disabled={!editMode} 
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default StepCardList;
