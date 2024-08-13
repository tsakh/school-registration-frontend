import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Box, Grid, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StepForAdmin from './StepForAdmin';
import AdminSideMenu from './AdminSideMenu';
import { getSteps } from '../services/api';

const AdminStepCreationPage = ({ stepsData }) => {
    const [stepName, setStepName] = useState('');
    const [addInfo, setaddInfo] = useState('');
    const [isCalendarEvent, setIsCalendarEvent] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [menuHover, setMenuHover] = useState(false);

    const [cards, setCards] = useState([]);
    const [originalCards, setOriginalCards] = useState([]); 
    const [deletedStepIds, setDeletedStepIds] = useState([]); 

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
            addInfo: addInfo.trim() !== '' ? addInfo : '',
            isCalendarEvent: isCalendarEvent,
            id: new Date().getTime() // temp id until saved
        };
        setCards([...cards, newCard]);
        setStepName('');
        setaddInfo('');
        setIsCalendarEvent(false);
        setDialogOpen(false);
    };

    const handleDeleteCard = (deletedCard) => {
        if (deletedCard.id && originalCards.some(card => card.id === deletedCard.id)) {
            setDeletedStepIds([...deletedStepIds, deletedCard.id]); 
        }
        const updatedCards = cards.filter(card => card !== deletedCard);
        setCards(updatedCards);
    };
    

    const toggleEditMode = () => {
        if (!editMode) { 
            setOriginalCards([...cards]);
        }
        setEditMode(true);
    };

    const handleSave = async () => {
        const stepsAdded = cards.filter(card => !originalCards.includes(card)).map(card => ({
            name: card.stepName,
            additionalInfo: card.addInfo,
            isCalendarEvent: card.isCalendarEvent
        }));

        try {
            console.log(cards);
            await axios.post('http://localhost:8080/admin/steps/modify', {
                idsDeleted: deletedStepIds,
                stepsAdded
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            });
            console.log('Steps saved successfully!');
        } catch (error) {
            console.error('Failed to save steps:', error.message);
        }

        setDeletedStepIds([]); 
        setEditMode(false); 
    };

    const handleCancel = () => {
        setCards(originalCards); 
        setDeletedStepIds([]);
        setEditMode(false); 
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
                    {editMode ? (
                        <>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleCancel}
                                sx={{ ml: 2 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleDialogOpen}
                                sx={{ ml: 2 }}
                            >
                                <AddIcon />
                                Add Step
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={toggleEditMode}
                        >
                            Edit
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
                            value={addInfo}
                            onChange={(e) => setaddInfo(e.target.value)}
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
