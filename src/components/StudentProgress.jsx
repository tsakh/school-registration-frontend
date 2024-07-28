import * as React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from "@mui/material"

export default function StudentProgress({stepsInfo}) {
    const [steps, setSteps] = React.useState(stepsInfo || []);

    const handleCheckboxChange = (index) => (event) => {
        const updatedSteps = [...steps];
        updatedSteps[index].isPassed = event.target.checked ;
        setSteps(updatedSteps);
    };
    return (
        <List>
        {steps.map((step, index) => (
          <ListItem key={index}>
            <ListItemText primary={step.name} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                checked={step.isPassed}
                onChange={handleCheckboxChange(index)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    )

}