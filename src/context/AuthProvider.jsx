import React from 'react';
import { jwtDecode } from 'jwt-decode'; 

const AuthContext = React.createContext(null); 

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = React.useState({ roles: [], personalId: null, questionnareCompleted :false });
    const [authFinished, setauthFinished] = React.useState(false);

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
        setauthFinished(true);
    }, []);

    const login = (token) => {
        try {
            const decoded = jwtDecode(token);
            const roles = decoded.roles || [];
            const personalId = decoded.sub || null;
            const questionnareCompleted = decoded.isQuestionnaireCompleted || false;
            setAuth({ roles, personalId,questionnareCompleted });
            localStorage.setItem('jwt', token);
        } catch (e) {
            console.error('Failed to decode token:', e);
        }
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
