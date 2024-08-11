import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Card, CardContent, Typography, IconButton, CardActions, Collapse, Box } from '@mui/material'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import { stepStyles, getColor } from '../styles';
import Calendar from './Calendar';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



export default function StepCard(props) {

    const obj = props.stepData;

    const [expand, setExpand] = React.useState(false);

    const handleExpandClick = () => {
        setExpand(!expand);
    };

    return (
        <Card sx={{ ...stepStyles, backgroundColor: getColor(obj.passed) }}  >
            <CardContent>
                <Typography>
                    {obj.stepName}
                </Typography>
            </CardContent>

            <CardActions>
                {
                    obj.stepInfo != null  && obj.stepInfo.length !== 0 &&
                    (<ExpandMore
                        expand={expand}
                        onClick={handleExpandClick}
                        aria-expanded={expand}
                    >
                        <KeyboardDoubleArrowDownIcon />
                    </ExpandMore>)
                }
            </CardActions>


            <Collapse in={expand} timeout="auto" >

                <Box sx={{ height: '20vh', overflow: 'auto' }}>
                    { !obj.calendarEvent  ? (
                        <Typography style={{overflowWra: 'break-word' }}>
            
                            {obj.stepInfo}
                        </Typography>
                    ) : (
                        <Calendar options = {obj.timeSlots} selectedDate = {obj.chosenTimeSlot}/>
                    )
                    }
                </Box>

            </Collapse>
        </Card>
    )
}