import React from 'react';
import ReactDOM from 'react-dom/client';
import StepsGrid from './StepsGrid';
import PageHeader from './ParentPageHeader';

const steps = [
  { stepName: 'Step 1', additionalInfo: 'Info for Step 1', isPassed: true, needsCalendar: true },
  { stepName: 'Step 2', additionalInfo: 'Info for Step 2 adding more for testing. Step 2 adding more for testing.', isPassed: true, needsCalendar: true },
  { stepName: 'Step 3', additionalInfo: 'Info for Step 3', isPassed: true, needsCalendar: false },
  { stepName: 'Step 4', additionalInfo: 'Info for Step 4', isPassed: false, needsCalendar: true },
  { stepName: 'Step 5', additionalInfo: 'Info for Step 5', isPassed: false, needsCalendar: false },
  { stepName: 'Step 6', additionalInfo: 'Info for Step 6', isPassed: false, needsCalendar: true },
  { stepName: 'Step 7', additionalInfo: 'Info for Step 7', isPassed: false, needsCalendar: false },
  { stepName: 'Step 8', additionalInfo: 'Info for Step 8', isPassed: false, needsCalendar: true },
  { stepName: 'Step 9', additionalInfo: 'Info for Step 9', isPassed: false, needsCalendar: false },
  { stepName: 'Step 10', additionalInfo: 'Info for Step 10', isPassed: false, needsCalendar: true },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
const logOut = () => {
    console.log("log out")
};

root.render(
  <React.StrictMode>

    <PageHeader onLogout={logOut}/>
      <main  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <StepsGrid stepsData = {steps}/>
      </main>
    </React.StrictMode>
);


