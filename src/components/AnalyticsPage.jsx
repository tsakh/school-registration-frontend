import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container, Grid, Button, Menu, MenuItem, Checkbox, ListItemText, FormControl,Typography, Box,ListItemIcon } from '@mui/material';
import { getGradesForAdmin,getSenStudentsInformation,downloadReport,getSibilingInformation,getSchoolInfo,getRegisteredInMonths,getRegisteredInGrades} from '../services/api';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import AdminSideMenu from './AdminSideMenu';
import {useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import DownloadIcon from '@mui/icons-material/Download';



export default function AnalyticsPage() {
    
    
    const {t : tCommon} =  useTranslation('translation', { keyPrefix: 'Common' });

    const { t , i18n} = useTranslation('translation', { keyPrefix: 'Analytics' });

    const [language, setLanguage] = React.useState(null);


      const handleOpenMenu = (event) => {
        setLanguage(event.currentTarget);
      };
    
      const handleCloseMenu = () => {
        setLanguage(null);
      };
    
      const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        handleCloseMenu();
      };


    const chartSettingsForStudentNum = {
        yAxis: [
          {
            label: t('Quantity')
          },
        ],
        series: [{ dataKey: 'value', label: t('RegisteredStudents') }],
        height :300,
        width : 500
      };

      const chartSettingForGrades = {
        yAxis: [
          {
            label: t('Quantity')
          },
        ],
        series: [{ dataKey: 'grade', label: t('RegisteredInClasses') }],
        height :300,
        width : 500
      };
    const initialStateForSchoolInfo = [{id: '1', count: 0},{id: '2', count: 0},{id: '3', count: 0},{id: '4', count: 0}]

    const [startDate, setStartDate] = React.useState(dayjs('2024-01-01')); // Starting from 1st January 2024
    const [endDate, setEndDate] = React.useState(dayjs()); // Current date
    const [grades, setGrades] = React.useState([]);
    const [chosenGrades, setChosenGrades] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [senStudentsInfo, setSenStudentsInfo] = React.useState([0,0]);
    const [schoolInfo, setSchoolInfo] = React.useState(initialStateForSchoolInfo);
    const [sibilingsInfo, setSibilingsInfo] = React.useState([0,0]);
    const [registeredInMonth, setRegisteredInMonth] = React.useState([]);
    const [registeredInGrades, setRegisteredInGrades] = React.useState([]);
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


    const loadSibilingInformation = async () => {
        const dateStart = startDate.format('YYYY-MM-DD');
        const dateEnd = endDate.format('YYYY-MM-DD');
        try {
            const gradesArr = chosenGrades.join(',');
            const response = await getSibilingInformation({dateStart, dateEnd,gradesArr});
            setSibilingsInfo([response.data.siblingsInSameSchoolNum, response.data.resultSize]); 
        } catch (error) {
            console.log("Error during getting sibilings information:", error);
        }
    };

    const loadSchoolInfo = async () => {
        const dateStart = startDate.format('YYYY-MM-DD');
        const dateEnd = endDate.format('YYYY-MM-DD');
        try {
            const gradesArr = chosenGrades.join(',');
            const response = await getSchoolInfo({dateStart, dateEnd,gradesArr});
            const updatedArray = response.data;
            if(updatedArray.length === 0) {
                setSchoolInfo(initialStateForSchoolInfo);
                return;
            }
            const newSchoolInfo = schoolInfo.map ( elem => {
                const newData = updatedArray.find(item => item.id === elem.id);
                return newData ? { ...elem, count: newData.value } : elem;
            })
           
            setSchoolInfo(newSchoolInfo); 
        } catch (error) {
            console.log("Error during getting schools information:", error);
        }
    };


    const loadRegisteredInMonths = async () => {
        const dateStart = startDate.format('YYYY-MM-DD');
        const dateEnd = endDate.format('YYYY-MM-DD');
        try {
            const gradesArr = chosenGrades.join(',');
            const response = await getRegisteredInMonths({dateStart, dateEnd,gradesArr});
            setRegisteredInMonth(response.data); 
        } catch (error) {
            console.log("Error during month informations:", error);
        }
    };

    const loadRegisteredInGrades = async () => {
        const dateStart = startDate.format('YYYY-MM-DD');
        const dateEnd = endDate.format('YYYY-MM-DD');
        try {
            const gradesArr = chosenGrades.join(',');
            const response = await getRegisteredInGrades({dateStart, dateEnd,gradesArr});
            setRegisteredInGrades(response.data); 
        } catch (error) {
            console.log("Error during month informations:", error);
        }
    }


    React.useEffect(() => {
        loadGrades(); 
    }, []);

    React.useEffect(() => {
        if (chosenGrades.length > 0) {
            loadSenStudents(); 
            loadSibilingInformation();
            loadSchoolInfo();
            loadRegisteredInMonths();
            loadRegisteredInGrades();
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
        loadSibilingInformation();
        loadSchoolInfo();
        loadRegisteredInMonths();
        loadRegisteredInGrades();
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
            const lang = i18n.language.includes('geo') ? 'GE' : 'ENG';
            const reportData = await downloadReport({dateStart,dateEnd,gradesArr,lang});
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
                            label={t('DateStart')}
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                        />
                    </Grid>
                    <Grid item>
                        <DatePicker
                            label={t('DateEnd')}
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
                                startIcon={<SchoolIcon />}
                            >
                                {t('Classes')}
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
                        <Button variant="contained" color="secondary" onClick={handleSubmit}  startIcon={<BarChartIcon />}>
                            {t('Charts')}
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={handleDownloadButton}  startIcon={<DownloadIcon />}>
                         {t('DownloadReport')}
                        </Button>
                    </Grid>

                    <Grid item>
                    <Button
                    aria-controls="language-menu"
                    aria-haspopup="true"
                    onClick={handleOpenMenu}
                    startIcon={<LanguageIcon />}
                    variant="contained"
                >
                {tCommon('Language')}
                </Button>
                <Menu
                    id="language-menu"
                    anchorEl={language}
                    keepMounted
                    open={Boolean(language)}
                    onClose={handleCloseMenu}
                >
                <MenuItem onClick={() => changeLanguage('en')}>
                    <ListItemIcon>
                    <img src="/flags/en.png" width='15vw' height='15vh' alt="English" />
                    </ListItemIcon>
                    <ListItemText primary="English" />
                </MenuItem>
                <MenuItem onClick={() => changeLanguage('geo')}>
                    <ListItemIcon>
                    <img src="/flags/geo.png" width='15vw' height='15vh' alt="Georgian" />
                    </ListItemIcon>
                    <ListItemText primary="ქართული" />
                </MenuItem>
                </Menu>
                    </Grid>
                </Grid>
            </LocalizationProvider>
            
            {
                registeredInMonth.length > 0 ? (
                    <BarChart
                    dataset={registeredInMonth}
                    xAxis={[
                      { scaleType: 'band', dataKey: 'month' },
                    ]}
                    {...chartSettingsForStudentNum}
                />
                ) : (
                    <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
                        {t('missingInfoRegStudents')}
                    </Typography>

                )
            }

            {
                registeredInGrades.length > 0 ? (
                    <BarChart
                    dataset={registeredInGrades}
                    xAxis={[
                      { scaleType: 'band', dataKey: 'studentAmount' },
                    ]}
                    {...chartSettingForGrades}
                />
                ) : (
                    <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
                        {t('missingInfoGrades')}
                       </Typography>

                )
            }
    
           
            {senStudentsInfo[1] > 0 ? (
                <PieChart

                width={400}
                height={200}
                
                    series={[
                        {
                            data: [
                                { id: 0, value: senStudentsInfo[0], label: t('SEN') },
                                { id: 1, value: senStudentsInfo[1] - senStudentsInfo[0], label:  t('NotSEN') },
                            ],
                        },
                    ]}
                  

                    
                 
                />
            ) : (
                <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
                        {t('missingInfoSen')}
                 </Typography>
            )}

        {schoolInfo.reduce((accumulator, current) => accumulator+ current.count, 0) > 0 ? (
                <PieChart

                width={400}
                height={200}
                
                    series={[
                        {
                            data: [
                                { id: 0, value: schoolInfo[0].count, label: t('SchoolWebsite') },
                                { id: 1, value: schoolInfo[1].count, label: t('SocialMedia') },
                                { id: 3, value: schoolInfo[2].count, label: t('Recommendation') },
                                { id: 4, value: schoolInfo[3].count, label: t('Other') },
                            ],
                        },
                        
                    ]}   
                 
                />
            ) : (
                <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
                        {t('missingInfoSibiling')}
                  </Typography>
            )}

            {sibilingsInfo[1] > 0 ? (
                <PieChart

                width={400}
                height={200}
                
                    series={[
                        {
                            data: [
                                { id: 0, value: sibilingsInfo[0], label: t('SiblingInSameSchool') },
                                { id: 1, value: sibilingsInfo[1] - sibilingsInfo[0], label: t('SibilingNotInSameSchool') },
                            ],
                        },
                        
                    ]}   
                 
                />
            ) : (
                <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
                    {t('misingInfoSource')}
                </Typography>
            )}

           
  
    
    </Container>
        </Box>
    );
}
