import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../Components/LoadingSpinner';

const PrivateRouter = ({ children }) => {

    const { user, loading } = use(AuthContext);
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