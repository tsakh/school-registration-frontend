import * as React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from "@mui/material";
import {modifyUserStep} from '../services/api.js'

export default function StudentProgress({ stepsInfo, personalId}) {
    const [steps, setSteps] = React.useState(stepsInfo);
    const handleCheckboxChange = (index) => (event) => {

      sendUpdatedInfoToBack({stepId :index, isPassed : event.target.checked })

      const updatedSteps = steps.map(step => 
        step.stepId === index 
            ? { ...step, passed: event.target.checked } 
            : step
        );
        setSteps(updatedSteps);
      };

      const sendUpdatedInfoToBack  = async(changedStep) =>{
        try{
            const response = await modifyUserStep(personalId, changedStep);
            console.log(response);
        }catch(error){
            console.log(error);
        }
          
      }

    return (
        <List>
            {steps.map((step, index) => (
                <ListItem key={index}>
                    <ListItemText primary={step.stepName} /> 
                    <ListItemSecondaryAction>
                        <Checkbox
                            edge="end"
                            checked={step.passed} 
                            onChange={handleCheckboxChange(step.stepId)}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
}
