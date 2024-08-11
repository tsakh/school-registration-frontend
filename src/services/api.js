import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080', 
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
    },
});


apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt');
    
    // add authorization header only if token exists and the request is not for sign-in or sign-up
    if (token && !config.url.includes('/auth/sign-in') && !config.url.includes('/auth/sign-up')) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
});

export const signIn = (signInData) => {
    return apiClient.post('/auth/sign-in', signInData);
};

export const signUp = (signUpData) => {
    return apiClient.post('/auth/sign-up', signUpData);
};

export const getSteps = () => {
    return apiClient.get('/admin/steps/get');
};

export const getStudentsList = () => {
    return apiClient.get('admin/management/user-information');
};

export const getStudentSteps = (personalId) => {
    return apiClient.get('admin/management/user-steps' , {params : {personalId : personalId}});
};

export const modifyUserStep = (personalId, stepInfomation) => {
    const stepInfomationArray = Array.isArray(stepInfomation)
        ? stepInfomation
        : [stepInfomation];
    console.log(personalId,stepInfomationArray )
    return apiClient.post('admin/management/user-steps' ,stepInfomationArray, {params : {personalId : personalId}});

}