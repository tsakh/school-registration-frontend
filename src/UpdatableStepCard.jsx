import React, { useState } from 'react';
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
    ListItem
} from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


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
    const [additionalInfo, setAdditionalInfo] = useState(obj.additionalInfo || '');
    const [calendar, setCalendar] = useState(
        (obj.calendar || []).map(date => date ? new Date(date) : null)
    );
    const [dialogOpen, setDialogOpen] = useState(false);

    const [tempAdditionalInfo, setTempAdditionalInfo] = useState(obj.additionalInfo || '');
    const [tempCalendar, setTempCalendar] = useState(
        (obj.calendar ? [...obj.calendar] : []).map(date => date ? new Date(date) : null)
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

    const handleSaveClick = () => {
        setAdditionalInfo(tempAdditionalInfo);
        setCalendar(tempCalendar);
        setDialogOpen(false);
        // here updated information should be sent to a server
    };

    const handleTempCalendarChange = (index, date) => {
        const newTempCalendar = [...tempCalendar];
        newTempCalendar[index] = date;
        setTempCalendar(newTempCalendar);
    };

    const handleAddTempCalendarEvent = () => {
        setTempCalendar([...tempCalendar, new Date()]);
    };

    return (
        <Card sx={{ width: '20vw' }}>
            <CardContent>
                <Typography>
                    {obj.stepName}
                </Typography>
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
                    {obj.needsCalendar && (
                        <List>
                            {calendar.map((event, index) => (
                                <ListItem key={index}>
                                    <Typography>{event ? event.toString() : 'Invalid date'}</Typography>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Collapse>

            <CardActions>
                <Button onClick={handleEditClick}>Edit</Button>
            </CardActions>

            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Edit Additional Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {obj.stepName}
                    </DialogContentText>
                    <TextField
                        fullWidth
                        multiline
                        value={tempAdditionalInfo}
                        onChange={(e) => setTempAdditionalInfo(e.target.value)}
                    />
                    {obj.isCalendarEvent && (
                        <List>
                            {tempCalendar.map((event, index) => (
                                <ListItem key={index}>
                                    <div className="customDatePickerContainer">
                                        <DatePicker
                                            selected={event}
                                            onChange={(date) => handleTempCalendarChange(index, date)}
                                            showTimeSelect
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            placeholderText="Select a date and time"
                
                                            minimumDate={moment().toDate()}
                                        />
                                    </div>
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
