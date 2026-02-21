import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const privateRoutes = ({children}) => {
    const {loading,user} = useAuth()
    if(loading){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    if(!user){
        <Navigate to='/login'></Navigate>
    }
    return children;
};

export default privateRoutes;