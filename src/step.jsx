import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Card, CardContent, Typography, IconButton, CardActions, Collapse, Paper, Box} from '@mui/material'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

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
        <Card sx = {{width: '20vw'}} >    
            <CardContent>
                <Typography>
                    {obj.stepName}
                </Typography>
            </CardContent>

            <CardActions>
                <ExpandMore
                    expand={expand}
                    onClick={handleExpandClick}
                    aria-expanded={expand}
                    >
                    <KeyboardDoubleArrowDownIcon />
                </ExpandMore>
            </CardActions>
            

            <Collapse in={expand} timeout="auto" >
          
                    <Box sx={{ height: '20vh', overflow: 'auto' }}>
  
                        <Typography style={{overflowWrap : 'break-word'}}>
                                {obj.additionalInfo}
                        </Typography>
                    </Box>
                
            </Collapse>
        </Card>
    )
}