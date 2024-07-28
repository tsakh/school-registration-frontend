import React from 'react';

const AuthContext = React.createContext(null);

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = React.useState(null);

    return (<AuthContext.Provider value={{auth,setAuth}}>
        {children}
    </AuthContext.Provider>)

}

export default AuthContext;