import React from 'react';
import Authcontext from "../context/AuthProvider"

const useAuth = () => {
    return React.useContext(Authcontext);
}

export default useAuth;