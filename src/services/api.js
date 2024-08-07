import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', 
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const signIn = (signInData) => {
    return apiClient.post('/auth/sign-in', signInData);
};

export const signUp = (signUpData) => {
    return apiClient.post('/auth/sign-up', signUpData);
};