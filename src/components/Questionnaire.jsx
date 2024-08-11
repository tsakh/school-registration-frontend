import * as React from 'react';
import { Box,Menu,Container, Grid, Avatar, FormControl, InputLabel, Select, MenuItem, Button, Typography, FormControlLabel, Checkbox,ListItemText,ListItemIcon } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import SchoolDataExtractor from './SchoolList';
import SourceList from './SourceList';
import {  questionnaireAvatar, questionnairePageStyle, selectBoxStyle,questionnareButton, questionnaireLangSwitch } from '../styles';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import { getGrades, getSchoolNames,getPossibleAnswers} from '../services/api';
import { jwtDecode } from 'jwt-decode'; 
import {saveQuestionnaireResponse} from '../services/api';

export default function Questionnaire() {

  const {t : tCommon} =  useTranslation('translation', { keyPrefix: 'Common' });

  const { t , i18n} = useTranslation('translation', { keyPrefix: 'Questionnaire' });

  const [language, setLanguage] = React.useState(null);
  const [grades, setGrades] = React.useState([]);
  const [schools, setSchools] = React.useState([]);
  const [possibleAnswers, setPossibleAnswers] = React.useState([]);
  React.useEffect(() => {
    const loadGrades = async () => {
      try {
        const response = await getGrades();
        setGrades(response.data);
      } catch (error) {
        console.log("error during getting grades");
      }
    };

    const loadSchoolNames = async () => {
      try {
        const response = await getSchoolNames();
        setSchools(response.data);
      } catch (error) {
        console.log("error during getting school names");
      }
    };

    const lang = i18n.language.includes('geo') ? 'GE' : 'ENG';
    const loadPossibleAnswersForInfo = async () => {
      try {
        const response = await getPossibleAnswers(lang);
        setPossibleAnswers(response.data);
      } catch (error) {
        console.log("error during getting possible answers for school info");
      }
    };


    
    loadGrades();
    loadSchoolNames();
    loadPossibleAnswersForInfo();
  }, []);

  

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

  const [formData, setFormData] = React.useState({
    phoneNumber: null,
    currentSchool: '',
    siblingsInSameSchool: false,
    isSENStudent: false,
    schoolInformationId: '',
    gradeApplyingFor: '',
    currentGrade : ''
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'schoolInformationId' ? String(value) : (type === 'checkbox' ? checked : value),
    });
  };

  const handlePhoneNumberChange = (value) => {
    setFormData({
      ...formData,
      phoneNumber: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const token = localStorage.getItem('jwt');
     
      if(token){
         const personalId = jwtDecode(token)?.sub;
         if(personalId != null){
            const response = await saveQuestionnaireResponse(personalId,formData);
            console.log(response); 
         }
      }
    
    } catch (error){
          alert('try again!')
    }
   
  };

  return (
    <Container sx={questionnairePageStyle}>
      <Box style={questionnaireLangSwitch}>
            <Button
                aria-controls="language-menu"
                aria-haspopup="true"
                onClick={handleOpenMenu}
                startIcon={<LanguageIcon />}
                variant="text"
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
                        <img src="/flags/en.png"  width = '15vw' height = '15vh' alt="English" />
                    </ListItemIcon>
                    <ListItemText primary="English" />
                </MenuItem>
                <MenuItem onClick={() => changeLanguage('geo')}>
                    <ListItemIcon>
                        <img src="/flags/geo.png" width = '15vw' height = '15vh' alt="Georgian" />
                    </ListItemIcon>
                    <ListItemText primary="ქართული" />
                </MenuItem>
            
            </Menu>
        </Box>
      <Avatar sx ={questionnaireAvatar} >
                    <QuestionAnswerIcon />
       </Avatar>
      <Typography variant="h6" align="center" sx={{ marginBottom: '2vh' }}>
        {t('FormName')}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MuiTelInput
              label= {t('PhoneNumber')}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handlePhoneNumberChange}
              sx = {selectBoxStyle}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>{t('CurrentGrade')}</InputLabel>
              <Select
                name="currentGrade"
                value={formData.currentGrade}
                onChange={handleChange}
                sx={selectBoxStyle}
              >
                {grades.map((grade, index) => (
                  <MenuItem key={index} value={grade}>{grade}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>{t('GradeApplyingFor')}</InputLabel>
              <Select
                name="gradeApplyingFor"
                value={formData.gradeApplyingFor}
                onChange={handleChange}
                sx={selectBoxStyle}
              >
                {grades.map((grade, index) => (
                  <MenuItem key={index} value={grade}>{grade}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>{t('CurrentSchool')}</InputLabel>
              <Select
                name="currentSchool"
                value={formData.currentSchool}
                onChange={handleChange}
                sx={selectBoxStyle}
              >
                {schools.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>{t('SourceOfInfo')}</InputLabel>
              <Select
                name="schoolInformationId"
                value={formData.schoolInformationId}
                onChange={handleChange}
                sx={selectBoxStyle}
              >
                {possibleAnswers.map((option) => (
                  <MenuItem key={option.possibleAnswerId} value={option.possibleAnswerId}>{option.probableAnswerDescr}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.siblingsInSameSchool}
                  onChange={handleChange}
                  name="siblingsInSameSchool"
                  color="primary"
                />
              }
              label={t('SiblingsInSameSchool')}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isSENStudent}
                  onChange={handleChange}
                  name="isSENStudent"
                  color="primary"
                />
              }
              label={t('SpecialNeeds')}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button type="submit"  variant="contained"sx = {questionnareButton}>
            {t('Submit')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
