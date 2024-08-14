import * as React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from "@mui/material";

export default function StudentProgress({ stepsInfo, onStepsInfoChange}) {
    const [steps, setSteps] = React.useState(stepsInfo);
    const handleCheckboxChange = (index) => (event) => {


      const updatedSteps = steps.map(step => 
        step.stepId === index 
            ? { ...step, passed: event.target.checked } 
            : step
        );
        setSteps(updatedSteps);
        onStepsInfoChange(updatedSteps);
      };

     

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
