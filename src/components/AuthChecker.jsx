import {Outlet, Navigate} from "react-router-dom";
import useAuth from "../customHooks/useAuth";

export default function AuthChecker({accessRole}){
        
        const {auth,authFinished} = useAuth();
        if(!authFinished) return null;
    
        return (
            auth?.roles.includes(accessRole)
            ? <Outlet/>
            : <Navigate to="/unauthorized"/>
        )

}