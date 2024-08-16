import * as React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Typography } from "@mui/material";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 

export default function Calendar(props) {
    const options = props.options;
    const selectedDate = props.selectedDate;

    const [selectedOption, setSelectedOption] = React.useState(
        options && options.length > 0 ? {
            timeSlot: selectedDate || options[0].timeSlot,
            id: options[0].id
        } : null
    );

    const handleRadioChange = (event) => {
        const selectedTimeSlot = event.target.value;
        const selectedOption = options.find(option => option.timeSlot === selectedTimeSlot);
        
        setSelectedOption({
            timeSlot: selectedTimeSlot,
            id: selectedOption.id
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        props.handleTimeChange();
        if (!selectedOption) {
            console.error('No option selected');
            return;
        }

        const url = 'http://localhost:8080/user/steps/choose_time_slot';
        const token = localStorage.getItem('jwt');
        let personalId = null;
        
        if (token) {
            personalId = jwtDecode(token)?.sub;
        }
        
        const requestData = {
            personalId: personalId,
            stepId: props.stepId, 
            stepEventId: selectedOption.id
        };
        console.log(props)
        try {
            const response = await axios.post(url, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
       

    };

    return (

        <form onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Please, select your compatible option</FormLabel>
                {options && options.length > 0 ? (
                    <RadioGroup value={selectedOption?.timeSlot || ''} onChange={handleRadioChange}>
                        {options.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={option.timeSlot}
                                control={<Radio />}
                                label={option.timeSlot}
                            />
                        ))}
                    </RadioGroup>
                ) : (
                    <Typography>No available time slots.</Typography>
                )}
                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined" disabled={!selectedOption}>
                    Submit
                </Button>
            </FormControl>
        </form>
    );
}
