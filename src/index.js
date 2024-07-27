import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import AdminStepCreationPage from './AdminStepCreationPage';
import i18next from 'i18next';
import { I18nextProvider}  from 'react-i18next';
import translations_geo from './locales/translations/geo/translations.json'
import translations_en from './locales/translations/en/translations.json'
import UpdatableStepsGrid from './UpdatableStepsGrid';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import ManagementPage from './ManagementPage';




i18next.init({
  interpolation :{escapeValue: false},
  lng: "en",
  resources :{
    en :{
      translation: translations_en
    },
    geo: {
      translation :translations_geo
    }
  }
})
const steps = [
  { stepName: 'Step 1', additionalInfo: ['16:45 07/04/24', '17:40 07/04/24', '18:00 07/04/24', '18:15 07/04/24', '18:30 07/04/24', '18:45 07/04/24'], isCalendarEvent: true, needsCalendar: true, selected: null},
  { stepName: 'Step 2', additionalInfo: 'Info for Step 2 adding more for testing. Step 2 adding more for testing.', isCalendarEvent: false, needsCalendar: false, selected: null},
  { stepName: 'Step 3', additionalInfo: 'Info for Step 3', isCalendarEvent: false, needsCalendar: false, selected: null },
  { stepName: 'Step 4', additionalInfo: 'Info for Step 4', isCalendarEvent: false, needsCalendar: false, selected: null},
  { stepName: 'Step 5', additionalInfo: 'Info for Step 5', isCalendarEvent: false, needsCalendar: false, selected: null },
  { stepName: 'Step 6', additionalInfo: 'Info for Step 6', isCalendarEvent: false, needsCalendar: false, selected: null },
  { stepName: 'Step 7', additionalInfo: 'Info for Step 7', isCalendarEvent: false, needsCalendar: false, selected: null },
  { stepName: 'Step 8', additionalInfo: 'Info for Step 8', isCalendarEvent: false, needsCalendar: false, selected: null },
  { stepName: 'Step 9', additionalInfo: ['a', 'b', 'c', 'd', 'e', 'f'], isCalendarEvent: true, needsCalendar: true, selected: 'k' },
  { stepName: 'Step 10', additionalInfo: null, isCalendarEvent: false, needsCalendar: false, selected: null },
];

const stepsForUpdate = [{ stepName: 'Step 2', additionalInfo: "info1", isCalendarEvent: true, calendar: [new Date("2024-07-13T10:30:00")], needsCalendar: true, selected: null},
];

const root = ReactDOM.createRoot(document.getElementById('root'));
const logOut = () => {
    console.log("log out")
};

root.render(
  <React.StrictMode>
    <Router>
      <div style={{backgroundColor: '#3d92a6', height: '100vh', width: '100vw', minHeight: '100vh', minWidth: '100vw', margin: 0, padding: 0, overflow:'auto'}}>
        <I18nextProvider i18n={i18next}>
        <CssBaseline/>
          <Routes>

            <Route exact path="/" element= {<SignInForm/>}>
            </Route>

            <Route path='/update' element={<UpdatableStepsGrid stepsData={stepsForUpdate} />}>
            </Route>

            <Route path='/add' element={<AdminStepCreationPage stepsData={steps}/>}>
            </Route>

            <Route exact path="/register" element= {<SignUpForm/>}>
            </Route>

            <Route exact path="/management" element= {<ManagementPage/>}>
            </Route>
            

          </Routes>
        </I18nextProvider>
      </div>
    </Router>
   
    

 
  </React.StrictMode>
);
