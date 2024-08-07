import { Paper, Avatar, Typography, Box, TextField, Button, Grid, Link, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import * as React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import { signInPaperStyle, signInIconStyle, signInButtonStyle, signInLangSwichStyle } from '../styles';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import { useNavigate } from 'react-router-dom';
import useAuth from '../customHooks/useAuth';
import {signIn} from '../services/api';

export default function SignInForm() {
  const navigate = useNavigate();
  const { t: tCommon } = useTranslation('translation', { keyPrefix: 'Common' });
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'SignInPage' });
  const { auth, login } = useAuth();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const personalId = data.get('personalId');
    const password = data.get('password');

    try {
      const response = await signIn({ personalId, password }); 
      login(response.data.token);
      const roles = auth.roles;
      if(roles.includes('ADMIN')){
          navigate('/update');
      }else if (roles.includes('USER')){
          navigate('/parentPage');

      } 
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Paper style={signInPaperStyle} elevation={1}>
      <Box style={signInLangSwichStyle}>
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
      </Box>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} align="center">
          <Avatar style={signInIconStyle}>
            <SchoolIcon />
          </Avatar>
          <Typography variant="h6" style={{ marginTop: '5%' }}>
            {t('FormName')}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} mt={3}>
            <TextField
              margin="normal"
              required
              style={{ width: '80%' }}
              id="personalId"
              label={t('PersonalId')}
              name="personalId"
              autoFocus
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
              style={signInButtonStyle}
              type="submit"
              variant="contained"
            >
              {t('ButtonLabel')}
            </Button>
            <Box mt={2}>
              <Box display="flex" justifyContent="space-between" width="80%">
                <Link href="#" variant="body2">
                  {t('ForgotPassword')}
                </Link>
                <Link href="#" variant="body2">
                  {t('Register')}
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
