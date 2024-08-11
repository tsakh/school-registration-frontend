import React from 'react';
import { jwtDecode } from 'jwt-decode'; 

const AuthContext = React.createContext(null); 

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = React.useState({ roles: [], personalId: null, questionnareCompleted :false });
    const [authFinished, setAuthFinished] = React.useState(false);

   React.useEffect(() => {
        const prevToken = localStorage.getItem('jwt');
        if (prevToken) {
            try {
                const decoded = jwtDecode(prevToken);
                const roles = decoded.roles || [];
                const personalId = decoded.sub || null;
                const questionnareCompleted = decoded.isQuestionnaireCompleted || false;

                setAuth({ roles, personalId,questionnareCompleted });
            } catch (e) {
                setAuth({ roles: [], personalId: null });
                localStorage.removeItem('jwt'); 
            }
        }
        setAuthFinished(true);
    }, []);

    const login = (token) => {
        return new Promise((resolve, reject) => {
            try {
                setAuthFinished(false); 
                const decoded = jwtDecode(token);
                const roles = decoded.roles || [];
                const personalId = decoded.sub || null;
                const questionnaireCompleted = decoded.isQuestionnaireCompleted || false;
    
                setAuth({ roles, personalId, questionnaireCompleted });
                localStorage.setItem('jwt', token);
                resolve(); 
            } catch (e) {
                console.error('Failed to decode token:', e);
                reject(e); 
            } finally {
                setAuthFinished(true); 
            }
        });
    };

    const logout = () => {
        setAuth({ roles: [], personalId: null });
        localStorage.removeItem('jwt');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout,authFinished }}> 
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
