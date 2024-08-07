import React from 'react';
import { jwtDecode } from 'jwt-decode'; 

const AuthContext = React.createContext(null); 

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = React.useState({ roles: [], personalId: null });

    React.useEffect(() => {
        const prevToken = localStorage.getItem('jwt');
        if (prevToken) {
            try {
                const decoded = jwtDecode(prevToken);
                const roles = decoded.roles || [];
                const personalId = decoded.sub || null;
                setAuth({ roles, personalId });
            } catch (e) {
                console.error('Invalid token:', e);
                setAuth({ roles: [], personalId: null });
                localStorage.removeItem('jwt'); 
            }
        }
    }, []);

    const login = (token) => {
        try {
            const decoded = jwtDecode(token);
            const roles = decoded.roles || [];
            const personalId = decoded.sub || null;
            setAuth({ roles, personalId });
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
        <AuthContext.Provider value={{ auth, login, logout }}> 
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
