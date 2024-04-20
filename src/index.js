import React from 'react';
import ReactDOM from 'react-dom/client';
import StepsGrid from './stepsGrid';

const steps = [
  { stepName: 'Step 1', additionalInfo: 'Info for Step 1', isPassed: true, needsCalendar: false },
  { stepName: 'Step 2', additionalInfo: 'Info for Step 2 adding more for testing. Step 2 adding more for testing.', isPassed: false, needsCalendar: true }
  // Add more steps as needed
]; 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StepsGrid stepsData = {steps}/>
  </React.StrictMode>
);


