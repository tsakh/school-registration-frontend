import React from 'react';
import {Menu,ListItemText,ListItemIcon,Paper,Avatar,Typography,Box,TextField,Button,Grid,Link,Select,MenuItem,FormControl, InputLabel} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LanguageIcon from '@mui/icons-material/Language';
import { signUpPaperStyle, signUpIconStyle, signUpButtonStyle,signUpLangSwichStyle } from '../styles';
import { useTranslation } from 'react-i18next';
import {signUp} from '../services/api';
import MessageBox from './MessageBox';

export default function SignUpForm() {

  const {t : tCommon} =  useTranslation('translation', { keyPrefix: 'Common' });

  const { t , i18n} = useTranslation('translation', { keyPrefix: 'SignUpPage' });
  const formRef = React.useRef(null);

  const [language, setLanguage] = React.useState(null);
  const [messageBoxOpen, setMessageBoxOpen] = React.useState(false);
  const [messageBoxMessage, setMessageBoxMessage] = React.useState();

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

  const handleMessageBoxClose = () => {
    setMessageBoxOpen(false);
  }



  const handleSubmit =  async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const personalId = data.get('personalNumber');
    const firstName = data.get('studentFirstName');
    const lastName = data.get('studentLastName');
    const email = data.get('email');
    const password =  data.get('password');
    const birthday = data.get('birthday');
    const parentFirstname =  data.get('parentFirstName');
    const parentLastname =  data.get('parentLastName');

    
    const [month, day, year] = birthday.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    try {
      const response = await signUp({ personalId,
                                      firstName,
                                      lastName,
                                      email,
                                      password,
                                      formattedDate,
                                      parentFirstname,
                                      parentLastname}); 
  
        setMessageBoxMessage(t('SuccessfullRegistration'));
        formRef.current.reset();
    } catch (error) {
      if(error?.response?.status === 409){
          
        setMessageBoxMessage(t('PersonalIdAlreadyExists'));
      } else {
        setMessageBoxMessage(t('ErrorDuringRegistration'));
      }
        
        
    }

    setMessageBoxOpen(true);
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

          <Box component="form" onSubmit={handleSubmit} mt={3} ref={formRef}>
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
      <MessageBox open={messageBoxOpen} onClose={handleMessageBoxClose} message={messageBoxMessage} />

     
    </Paper>
  );
}
