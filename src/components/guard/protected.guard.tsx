import { Navigate, Outlet } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { cookieNameSpace } from '@/utils/cookies';
export const Protected = () => {
    const isAuthenticated = true;
    return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};
