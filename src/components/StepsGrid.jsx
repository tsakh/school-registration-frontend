import {Grid, Typography} from '@mui/material'
import StepCard from './Step';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 

export default function StepsGrid(props) {

    const [stepsData, setStepsData] = useState([]);

    useEffect(() => {
        const fetchStepsData = async () => {
            try {
                const token = localStorage.getItem('jwt');
                let personalId = null;
                if (token) {
                    personalId = jwtDecode(token)?.sub;
                }
                
                const response = await axios.get('http://localhost:8080/user/steps/get', {
                    params: {
                        personalId: personalId, 
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    },
                });

                setStepsData(response.data); 
            } catch (error) {
                console.error('Error fetching steps data:', error);
            }
        };

        fetchStepsData();
    }, [props.personalId]);

    return (
        <Grid container spacing= '1vw' justifyContent='center' alignItems='center' textAlign='center' >
            {stepsData.map( (stepData, index) => ( //1 for xs, 2 for small, 3 for medium and 4 pcs for large screen
                 <Grid item key= {index} xs={12} sm={6} md={4} lg={3}>
                  <StepCard stepData = {stepData}></StepCard> 
                
             </Grid>
            )
            )}
        </Grid>
    )
}