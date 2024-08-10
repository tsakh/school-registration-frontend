import React from 'react';
import {Menu,ListItemText,ListItemIcon,Paper,Avatar,Typography,Box,TextField,Button,Grid,Link,Select,MenuItem,FormControl, InputLabel} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LanguageIcon from '@mui/icons-material/Language';
import { signUpPaperStyle, signUpIconStyle, signUpButtonStyle,signUpLangSwichStyle } from '../styles';
import GradeList from './GradeList';
import { useTranslation } from 'react-i18next';


export default function SignUpForm() {

  const {t : tCommon} =  useTranslation('translation', { keyPrefix: 'Common' });

  const { t , i18n} = useTranslation('translation', { keyPrefix: 'SignUpPage' });


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

  const [grades, setGrades] = React.useState([]);
  const [grade, setGrade] = React.useState('');

  const handleGradeListChange = (data) => {
    setGrades(data);
  };

  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      studFirstName: data.get('studentFirstName'),
      studLastName: data.get('studentLastName'),
      parentFirstName: data.get('parentFirstName'),
      parentLastName: data.get('parentLastName'),
      birthday: data.get('birthday'),
      personalNumber : data.get('personalNumber')
    });
  };

  return (
    <Paper style={signUpPaperStyle} elevation={1}>
      <Box style={signUpLangSwichStyle}>
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
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} align="center">
          <Avatar style={signUpIconStyle}>
            <AppRegistrationIcon />
          </Avatar>
          <Typography variant="h6" style={{ marginTop: '5%' }}>
            {t('FormName')}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} mt={3}>
            <Box display="flex" justifyContent="space-between" width="80%" margin="normal">
              <TextField
                margin="normal"
                required
                fullWidth
                id="studentFirstName"
                label= {t('StudentName')}
                name="studentFirstName"
                autoFocus
                style={{ marginRight: '8px' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="studentLastName"
                label={t('StudentSurname')}
                name="studentLastName"
                style={{ marginLeft: '8px' }}
              />
            </Box>
            <TextField
              margin="normal"
              required
              style={{ width: '80%' }}
              id="personalNumber"
              label={t('StudentPersonalId')}
              name="personalNumber"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box display="flex" width="80%" margin="normal">
                <DatePicker
                  id="birthday"
                  name="birthday"
                  required
                  label={t('BirthDate')}
                  />
              </Box>
            </LocalizationProvider>
            <Box display="flex" justifyContent="space-between" width="80%" margin="normal">
              <TextField
                margin="normal"
                required
                fullWidth
                id="parentFirstName"
                label={t('ParentName')}
                name="parentFirstName"
                autoFocus
                style={{ marginRight: '8px' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="parentLastName"
                label={t('ParentSurname')}
                name="parentLastName"
                style={{ marginLeft: '8px' }}
              />
            </Box>
            <TextField
              margin="normal"
              required
              style={{ width: '80%' }}
              id="email"
              label={t('ParentEmail')}
              name="email"
            />
            <FormControl style={{ width: '80%', marginTop: '16px' }} margin="normal" required>
              <InputLabel id="grade-label">{t('Grade')}</InputLabel>
              <Select
                labelId="grade-label"
                name="grade"
                fullWidth
                value={grade}
                onChange={handleChange}
              >
                {grades.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              style={{ width: '80%' }}
              name="password"
              label={t('Password')}
              type="password"
              id="password"
            />
            <Button
              style={signUpButtonStyle}
              type="submit"
              variant="contained"
            >
              {t('ButtonLabel')}
            </Button>
            <Box mt={2}>
              <Box display="flex" justifyContent="space-between" width="80%">
                <Link href="/login" variant="body2">
                {t('LinkToSignIn')}
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <GradeList onGradeListChanged={handleGradeListChange} />
    </Paper>
  );
}
