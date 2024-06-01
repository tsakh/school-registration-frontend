import * as React from 'react';
import { Container, TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography,FormControlLabel,Checkbox } from '@mui/material';
import SchoolDataExtractor from './SchoolList';
import SourceList from './SourceList';
import { elementsDiff, questionnairePageStyle, selectBoxStyle } from './styles';


export default function Questionnaire () {
  const [formData, setFormData] = React.useState({
    parentNameSurname: '',
    previousSchool: '',
    siblingsInSameSchool : false,
    specialNeeds: false,
    informationAboutSchool : ''
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <Container sx = {questionnairePageStyle}>
      <Typography variant="h5" align="center" sx= {{marginBottom:'2vh'}}>სკოლაში რეგისტრაციის კითხვარი</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="მშობლის სახელი და გვარი"
          name="parentNameSurname"
          value={formData.parentNameSurname}
          onChange={handleChange}
          sx={{...elementsDiff,...selectBoxStyle}}
        />
        <FormControl fullWidth sx={elementsDiff}>
        <InputLabel>მიმდინარე სკოლა</InputLabel>
          <Select
            name="previousSchool"
            value={formData.previousSchool}
            onChange={handleChange}
            sx={selectBoxStyle}
          >
            
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={elementsDiff}>
        <InputLabel>როგორ მიიღეთ ინფორმაცია ჩვენს სკოლაზე?</InputLabel>
          <Select
            name="informationAboutSchool"
            value={formData.informationAboutSchool}
            onChange={handleChange}
            sx ={selectBoxStyle}
          >
            
            {sourceOfInformation.map((option, index) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.siblingsInSameSchool}
              onChange={handleChange}
              name="siblingsInSameSchool"
              color="primary"
            />
          }
          label="რეგისტრირებულის და/ძმა ამ სკოლის მოსწავლეა"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.specialNeeds}
              onChange={handleChange}
              name="specialNeeds"
              color="primary"
            />
          }
          label="სსსმ მოსწავლე"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={elementsDiff}>
          დადასტურება
        </Button>
      </form>
      <SchoolDataExtractor onDataExtracted={handleDataExtracted} />
      <SourceList onSourceChanged={handleSourceChanged} />
    </Container>
  );
};


