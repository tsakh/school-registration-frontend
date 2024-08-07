import {Outlet, Navigate} from "react-router-dom";
import useAuth from "../customHooks/useAuth";

export default function AuthChecker({accessRole}){
        
        const {auth} = useAuth();
        return (
            auth?.roles.includes(accessRole)
            ? <Outlet/>
            : <Navigate to="/unauthorized"/>
        )

}