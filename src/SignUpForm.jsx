import React from 'react';
import {Paper,Avatar,Typography,Box,TextField,Button,Grid,Link,Select,MenuItem,FormControl, InputLabel} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { signUpPaperStyle, signUpIconStyle, signUpButtonStyle } from './styles';
import GradeList from './GradeList';

export default function SignUpForm() {
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
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} align="center">
          <Avatar style={signUpIconStyle}>
            <AppRegistrationIcon />
          </Avatar>
          <Typography variant="h6" style={{ marginTop: '5%' }}>
            სკოლაში რეგისტრაცია
          </Typography>

          <Box component="form" onSubmit={handleSubmit} mt={3}>
            <Box display="flex" justifyContent="space-between" width="80%" margin="normal">
              <TextField
                margin="normal"
                required
                fullWidth
                id="studentFirstName"
                label="მოსწავლის სახელი"
                name="studentFirstName"
                autoFocus
                style={{ marginRight: '8px' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="studentLastName"
                label="მოსწავლის გვარი"
                name="studentLastName"
                style={{ marginLeft: '8px' }}
              />
            </Box>
            <TextField
              margin="normal"
              required
              style={{ width: '80%' }}
              id="personalNumber"
              label="პირადი ნომერი"
              name="personalNumber"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box display="flex" width="80%" margin="normal">
                <DatePicker
                  id="birthday"
                  name="birthday"
                  required
                  label="დაბადების თარიღი"
                />
              </Box>
            </LocalizationProvider>
            <Box display="flex" justifyContent="space-between" width="80%" margin="normal">
              <TextField
                margin="normal"
                required
                fullWidth
                id="parentFirstName"
                label="მშობლის სახელი"
                name="parentFirstName"
                autoFocus
                style={{ marginRight: '8px' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="parentLastName"
                label="მშობლის გვარი"
                name="parentLastName"
                style={{ marginLeft: '8px' }}
              />
            </Box>
            <TextField
              margin="normal"
              required
              style={{ width: '80%' }}
              id="email"
              label="მშობლის მეილი"
              name="email"
            />
            <FormControl style={{ width: '80%', marginTop: '16px' }} margin="normal" required>
              <InputLabel id="grade-label">Grade Applying For</InputLabel>
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
              label="პაროლი"
              type="password"
              id="password"
            />
            <Button
              style={signUpButtonStyle}
              type="submit"
              variant="contained"
            >
              რეგისტრაცია
            </Button>
            <Box mt={2}>
              <Box display="flex" justifyContent="space-between" width="80%">
                <Link href="#" variant="body2">
                  გაქვთ ანგარიში? შესვლა
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
