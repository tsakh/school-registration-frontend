import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    CardActions,
    Collapse,
    Box,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import EventIcon from '@mui/icons-material/Event';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function UpdatableStepCard(props) {
    const obj = props.stepData;

    const [expand, setExpand] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState(obj.stepInfo || '');
    const [calendar, setCalendar] = useState(
        ((obj.timeSlots) || [])
    );
    const [dialogOpen, setDialogOpen] = useState(false);

    const [tempAdditionalInfo, setTempAdditionalInfo] = useState(obj.additionalInfo || '');
    const [tempCalendar, setTempCalendar] = useState(
        (obj.calendar ? [...obj.calendar] : [])
    );

    const handleExpandClick = () => {
        setExpand(!expand);
    };

    const handleEditClick = () => {
        setTempAdditionalInfo(additionalInfo);
        setTempCalendar([...calendar]);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleSaveClick = async () => {
        setAdditionalInfo(tempAdditionalInfo);
        setCalendar(tempCalendar);
        setDialogOpen(false);
    
        try {
            const stepId = obj.stepId; 
            const slots = tempCalendar.map(date => ({
                id: date.id,
                timeSlot: moment(date.timeSlot).toISOString()
            }));
            const requestBody = {
                stepInfo: tempAdditionalInfo,
                timeSlots: slots
            };
    
            await axios.post(`http://localhost:8080/admin/steps?stepId=${stepId}`, requestBody, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json'
                }
            });

            props.onUpdate();
            console.log('Step updated successfully');
        } catch (error) {
            console.error('Error updating step:', error);
        }
    };

    const handleTempCalendarChange = (id, date) => {
        console.log(tempCalendar);
        const newTempCalendar = [...tempCalendar];
        console.log(id,date);
        setTempCalendar(newTempCalendar.map(curr =>  curr.id !== id ? curr : {...curr, timeSlot : moment(date).utcOffset(4).toDate()} ));
    };

    const handleAddTempCalendarEvent = () => {
        const newDate = {
            id: new Date().getTime(),
            timeSlot: new Date()
        }
        setTempCalendar([...tempCalendar, newDate]);
    };


    const handleDeleteTempEvent = (id) => {
        const newTempCalendar = tempCalendar.filter(event  => event.id !== id);
        setTempCalendar(newTempCalendar);
    };

    return (
        <Card sx={{ width: '20vw' }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center"> 
                    <Typography>
                        {obj.stepName}
                    </Typography>
                    {obj.calendarEvent && (
                                <EventIcon style={{ marginLeft: '8px' }} color="primary" />
                            )}
                </Box>
            </CardContent>

            <CardActions>
                <ExpandMore
                    expand={expand}
                    onClick={handleExpandClick}
                    aria-expanded={expand}
                >
                    <KeyboardDoubleArrowDownIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expand} timeout="auto">
                <Box sx={{ height: '20vh', overflow: 'auto' }}>
                    <Typography style={{ overflowWrap: 'break-word' }}>
                        {additionalInfo}
                    </Typography>
                    {obj.calendarEvent && (
                        <List>
                            {calendar.map((event) => (
                                <ListItem key={event.id}>
                                    <ListItemText primary = {event.timeSlot ? moment(event.timeSlot).format('DD/MM/YYYY HH:mm') : 'Invalid date'}/>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Collapse>

            <CardActions>
                <Button onClick={handleEditClick}>Edit</Button>
            </CardActions>

            <Dialog 
                open={dialogOpen} 
                onClose={handleDialogClose}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>Edit Additional Information</DialogTitle>
                <DialogContent sx={{ height: '75vh' }}>
                    <DialogContentText>
                        {obj.stepName}
                    </DialogContentText>
                    <TextField
                        fullWidth
                        multiline
                        value={tempAdditionalInfo}
                        onChange={(e) => setTempAdditionalInfo(e.target.value)}
                    />
                    {obj.calendarEvent && (
                        <List>
                            {tempCalendar.map((event) => (
                                <ListItem key={event.id}>
                                    <div className="customDatePickerContainer">
                                        <DatePicker
                                            selected={event.timeSlot}
                                            showTimeSelect
                                            onChange={(date) => handleTempCalendarChange(event.id, date)}
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            placeholderText="Select a date and time"
                                            minimumDate={moment().toDate()}
                                        />
                                    </div>
                                    <IconButton onClick={() => handleDeleteTempEvent(event.id)}>
                                        <CloseIcon />
                                    </IconButton>
                                </ListItem>
                            ))}
                            <ListItem>
                                <Button onClick={handleAddTempCalendarEvent}>Add Calendar Event</Button>
                            </ListItem>
                        </List>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleSaveClick}>Save</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
