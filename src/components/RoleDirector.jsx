import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
import useAuth from '../customHooks/useAuth';

export default function RoleDirector(){
    const navigate = useNavigate();
    const { auth, authFinished } = useAuth();

    useEffect( () => {
        if(!authFinished) return;
        
        
        if(auth.roles.length > 0) {
            if(auth.roles.includes('ROLE_ADMIN')){
                navigate('/management');
            } else if (auth.roles.includes('ROLE_USER')){
                navigate('/parentPage'); // if we have a token saved it means it already filled up the questionnaire
            } else {
                navigate('/login');
            }  
        } else {
            navigate('/login');
        }
           
        
    }

    , [auth,navigate,authFinished]);
    return null;
}