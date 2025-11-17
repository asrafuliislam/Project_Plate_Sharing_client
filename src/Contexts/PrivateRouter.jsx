import React from 'react';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../Components/LoadingSpinner';
import UseAuth from '../hooks/UseAuth';

const PrivateRouter = ({ children }) => {

    const { user, loading } = UseAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ Form: location }} replace></Navigate>
};

export default PrivateRouter;