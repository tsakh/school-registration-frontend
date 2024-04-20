import {Grid} from '@mui/material'
import StepCard from './step';

export default function StepsGrid(props) {

    const stepsData = props.stepsData;

    return (
        <Grid container spacing= '1vw'>
            {stepsData.map( (stepData, index) => ( //1 for xs, 2 for small, 3 for medium and 4 pcs for large screen
                 <Grid item key= {index} xs={12} sm={6} md={4} lg={3}>
                 <StepCard stepData = {stepData}></StepCard>
             </Grid>
            )
            )}
        </Grid>
    )
}