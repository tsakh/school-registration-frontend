import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container, Grid, Button, Menu, MenuItem, Checkbox, ListItemText, FormControl,Typography, Box } from '@mui/material';
import { getGradesForAdmin,getSenStudentsInformation,downloadReport } from '../services/api';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PieChart } from '@mui/x-charts/PieChart';
import AdminSideMenu from './AdminSideMenu';
import {useState } from 'react';

export default function AnalyticsPage() {
  
    const [startDate, setStartDate] = React.useState(dayjs('2024-01-01')); // Starting from 1st January 2024
    const [endDate, setEndDate] = React.useState(dayjs()); // Current date
    const [grades, setGrades] = React.useState([]);
    const [chosenGrades, setChosenGrades] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [senStudentsInfo, setSenStudentsInfo] = React.useState([0,0]);
    const [menuHover, setMenuHover] = useState(false);

    const loadGrades = async () => {
        try {
            const response = await getGradesForAdmin();
            setChosenGrades(response.data); 
            setGrades(response.data); 
        } catch (error) {
            console.log("Error during getting grades:", error);
        }
    };

    const loadSenStudents = async () => {
        const dateStart = startDate.format('YYYY-MM-DD');
        const dateEnd = endDate.format('YYYY-MM-DD');
        try {
            const gradesArr = chosenGrades.join(',');
            const response = await getSenStudentsInformation({dateStart, dateEnd,gradesArr});
            setSenStudentsInfo([response.data.senstudentNum, response.data.studentNum]); 
        } catch (error) {
            console.log("Error during getting sen students:", error);
        }
    };

    React.useEffect(() => {
        loadGrades(); 
    }, []);

    React.useEffect(() => {
        if (chosenGrades.length > 0) {
            loadSenStudents(); 
        }
    }, [grades]);
   

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleSubmit = () => {
        
        loadSenStudents();
    };   

    const handleGradeChange = (currGrade) => {
        

        if(chosenGrades.includes(currGrade)){
            setChosenGrades(chosenGrades.filter(grade => grade !== currGrade));
        } else {
            setChosenGrades([...chosenGrades,currGrade]);
        }
    }

    const handleDownloadButton = async() => {
        const dateStart = startDate.format('YYYY-MM-DD');
        const dateEnd = endDate.format('YYYY-MM-DD');
        const gradesArr = chosenGrades.join(',');

        try{
            const reportData = await downloadReport({dateStart,dateEnd,gradesArr});
            const url = window.URL.createObjectURL(new Blob([reportData.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
            const link = document.createElement('a');
            link.href = url;
            link.download = 'analytics.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch(error){
            console.log(error);

        }
        


    }

    return (
        <Box sx={{ display: 'flex' }}>
        <AdminSideMenu onHover={setMenuHover} />
        <Container sx={{ marginTop: 2, ml: menuHover ? '20vw' : '5vw', transition: 'margin-left 0.3s' }}>
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
                                sx={{
                                    maxHeight: 400, 
                                    overflowY: 'auto', 
                                    
                                }}
                            >
                                {grades.map((grade) => (
                                    <MenuItem key={grade} value={grade} onClick={() => handleGradeChange(grade)}>
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

                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={handleDownloadButton}>
                            გადმოწერა
                        </Button>
                    </Grid>
                </Grid>
            </LocalizationProvider>
            
           
            {senStudentsInfo[1] > 0 ? (
                <PieChart

                width={400}
                height={200}
                
                    series={[
                        {
                            data: [
                                { id: 0, value: senStudentsInfo[0], label: 'სსმმ' },
                                { id: 1, value: senStudentsInfo[1] - senStudentsInfo[0], label: 'არა სსმმ' },
                            ],
                        },
                    ]}
                  

                    
                 
                />
            ) : (
                <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
                    დროის მოცემულ ინტერვალში სპეციალური საჭიროების მქონე მოსწავლეებზე ინფორმაცია არ არსებობს
                </Typography>
            )}

            
        </Container>
        </Box>
    );
}
