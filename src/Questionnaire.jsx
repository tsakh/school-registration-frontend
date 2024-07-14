import * as React from 'react';
import { Box,Menu,Container, Grid, Avatar, FormControl, InputLabel, Select, MenuItem, Button, Typography, FormControlLabel, Checkbox,ListItemText,ListItemIcon } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import SchoolDataExtractor from './SchoolList';
import SourceList from './SourceList';
import {  questionnaireAvatar, questionnairePageStyle, selectBoxStyle,questionnareButton, questionnaireLangSwitch } from './styles';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';


export default function Questionnaire() {

  const {t : tCommon} =  useTranslation('translation', { keyPrefix: 'Common' });

  const { t , i18n} = useTranslation('translation', { keyPrefix: 'Questionnaire' });


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

  const [formData, setFormData] = React.useState({
    phoneNumber: null,
    currentSchool: '',
    siblingsInSameSchool: false,
    specialNeeds: false,
    informationAboutSchool: ''
  });

  const [options, setOptions] = React.useState([]);
  const [sourceOfInformation, setSourceOfInformation] = React.useState([]);

  const handleDataExtracted = (data) => {
    setOptions(data);
  };

  const handleSourceChanged = (data) => {
    setSourceOfInformation(data);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePhoneNumberChange = (value) => {
    setFormData({
      ...formData,
      phoneNumber: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
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
              <InputLabel>{t('CurrentSchool')}</InputLabel>
              <Select
                name="currentSchool"
                value={formData.currentSchool}
                onChange={handleChange}
                sx={selectBoxStyle}
              >
                {options.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>{t('SourceOfInfo')}</InputLabel>
              <Select
                name="informationAboutSchool"
                value={formData.informationAboutSchool}
                onChange={handleChange}
                sx={selectBoxStyle}
              >
                {sourceOfInformation.map((option, index) => (
                  <MenuItem key={index} value={option}>{option}</MenuItem>
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
                  checked={formData.specialNeeds}
                  onChange={handleChange}
                  name="specialNeeds"
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
      <SchoolDataExtractor onDataExtracted={handleDataExtracted} />
      <SourceList onSourceChanged={handleSourceChanged} />
    </Container>
  );
}
