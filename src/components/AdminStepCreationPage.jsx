import React, { useEffect, useState } from 'react';
import { Button, Box, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StepForAdmin from './StepForAdmin';
import AdminSideMenu from './AdminSideMenu';
import {getSteps} from '../services/api';

const AdminStepCreationPage = ({ stepsData }) => {
    const [stepName, setStepName] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [isCalendarEvent, setIsCalendarEvent] = useState(false);
    //const [cards, setCards] = useState(stepsData); 
    const [editMode, setEditMode] = useState(false); 
    const [dialogOpen, setDialogOpen] = useState(false);
    const [menuHover, setMenuHover] = useState(false);

    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchSteps = async () => {
            try {
                const response = await getSteps();
                setCards(response.data); 
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchSteps();
    }, []);

    const handleAddCard = () => {
        const newCard = {
            stepName: stepName.trim() !== '' ? stepName : 'New Step', 
            additionalInfo: additionalInfo.trim() !== '' ? additionalInfo : 'No additional info', 
            isCalendarEvent: isCalendarEvent
        };
        setCards([...cards, newCard]);
        setStepName(''); 
        setAdditionalInfo('');
        setIsCalendarEvent(false);
        setDialogOpen(false); 
    };

    const handleDeleteCard = (deletedCard) => {
        const updatedCards = cards.filter(card => card !== deletedCard); 
        setCards(updatedCards);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
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
                <Box mb={2} textAlign='center'>
                    <Button
                        variant="contained"
                        color={editMode ? "success" : "primary"} 
                        onClick={toggleEditMode}
                    >
                        {editMode ? 'Save' : 'Edit'}
                    </Button>
                    {editMode && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleDialogOpen}
                            sx={{ ml: 2 }}
                        >
                            <AddIcon />
                            Add Step
                        </Button>
                    )}
                </Box>
                <Grid container spacing={2} justifyContent='center' alignItems='center' textAlign='center'>
                    {cards.map((card, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <StepForAdmin 
                                stepData={card} 
                                onDelete={handleDeleteCard} 
                                disabled={!editMode} 
                            />
                        </Grid>
                    ))}
                </Grid>
                <Dialog open={dialogOpen} onClose={handleDialogClose}>
                    <DialogTitle>Add New Step</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Step Name"
                            type="text"
                            fullWidth
                            value={stepName}
                            onChange={(e) => setStepName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Additional Info"
                            type="text"
                            fullWidth
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isCalendarEvent}
                                    onChange={(e) => setIsCalendarEvent(e.target.checked)}
                                    name="isCalendarEvent"
                                    color="primary"
                                />
                            }
                            label="Is Calendar Event"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddCard} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default AdminStepCreationPage;
