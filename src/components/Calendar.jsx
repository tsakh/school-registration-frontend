import * as React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
export default function Calendar(props) {
    const options = props.options;
    const selectedDate = props.selectedDate;
    const [date, setDate] = React.useState(selectedDate || options[0]); 

    const handleRadioChange = (event) => {
        setDate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(date);
    }

    return (
    <form onSubmit = {handleSubmit}>
        <FormControl component="fieldset">
            <FormLabel component="legend">აირჩიეთ სასურველი დრო:</FormLabel>
            <RadioGroup value = {date} onChange={handleRadioChange}>
                {options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={option}
                        
                    />
                ))}
            </RadioGroup>
            <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                    Submit
                </Button>
        </FormControl>
    </form>
        
    )
}