import { Paper, Avatar, Typography,Box,TextField, Button , Grid, Link} from '@mui/material';
import * as React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import { signInPaperStyle, signInIconStyle, signInButtonStyle } from './styles';
export default function SignInForm(){

const handleSubmit = (event) => {
event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        email: data.get('email'),
        password: data.get('password'),
    });
};
    return (
        
            <Paper style={signInPaperStyle} elevation={1}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} align="center">
                  <Avatar style={signInIconStyle}>
                    <SchoolIcon />
                  </Avatar>
                  <Typography variant="h6" style={{marginTop: '5%'}}>
                    სისტემაში შესვლა
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} mt={3}>
                    <TextField
                      margin="normal"
                      required
                      style={{ width: '80%' }}
                      id="email"
                      label="მეილი"
                      name="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      style={{ width: '80%' }}
                      name="password"
                      label="პაროლი"
                      type="password"
                      id="password"
                    />
                    <Button
                      style={signInButtonStyle}
                      type="submit"
                      variant="contained"  
                    >
                      შესვლა
                    </Button>
                    <Box mt={2}>
                      <Box display="flex" justifyContent="space-between" width="80%">
                        <Link href="#" variant="body2">
                          დაგავიწყდა პაროლი?
                        </Link>
                        <Link href="#" variant="body2">
                          რეგისტრაცია
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          
        
    )

}