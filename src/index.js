import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import StepCardList from './StepCardList';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
const logOut = () => {
    console.log("log out")
};

root.render(
  <React.StrictMode>
    <CssBaseline/>
    <div style={{backgroundColor: '#5669f5', height: '100vh', width: '100vw', minHeight: '100vh', minWidth: '100vw', margin: 0, padding: 0, overflow:'auto'}}>
        <div>
            <StepCardList steps={steps} />
        </div>
    </div>
  </React.StrictMode>
);
