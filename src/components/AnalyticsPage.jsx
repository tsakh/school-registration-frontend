import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container, Grid, Button, Menu, MenuItem, Checkbox, ListItemText, FormControl } from '@mui/material';
import { getGrades } from '../services/api';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function AnalyticsPage() {
  
    const [startDate, setStartDate] = React.useState(dayjs('2024-01-01')); // Starting from 1st January 2024
    const [endDate, setEndDate] = React.useState(dayjs()); // Current date
    const [grades, setGrades] = React.useState([]);
    const [chosenGrades, setChosenGrades] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    React.useEffect(() => {
        const loadGrades = async () => {
            try {
                const response = await getGrades();
                setGrades(response.data); 
                setChosenGrades(response.data); 
            } catch (error) {
                console.log("Error during getting grades:", error);
            }
        };

        loadGrades();
    }, []);

    const handleGradeChange = (event) => {
        const value = event.target.value;
        setChosenGrades(value);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleSubmit = () => {
        console.log(startDate.format('MM/DD/YYYY'));
        console.log(endDate.format('MM/DD/YYYY'));
        console.log(chosenGrades);
    };   

    return (
        <Container sx={{ marginTop: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <DatePicker
                            label="საწყისი თარიღი"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                        />
                    </Grid>
                    <Grid item>
                        <DatePicker
                            label="საბოლოო თარიღი"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                        />
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <Button
                                aria-controls={open ? 'grade-menu' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                                variant="contained"
                            >
                                კლასები
                            </Button>
                            <Menu
                                id="grade-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                {grades.map((grade) => (
                                    <MenuItem key={grade} value={grade} onClick={() => handleGradeChange({ target: { value: chosenGrades.includes(grade) ? chosenGrades.filter(g => g !== grade) : [...chosenGrades, grade] } })}>
                                        <Checkbox checked={chosenGrades.includes(grade)} />
                                        <ListItemText primary={grade} />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={handleSubmit}>
                            გენერირება
                        </Button>
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </Container>
    );
}
