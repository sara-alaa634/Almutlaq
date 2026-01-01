import { useEffect } from 'react';

import { Navigate, useLocation } from "react-router-dom";
import {
  getToken,
  isTokenExpired,
  removeToken,
} from "../Services/TokenService";
// import { getPermissons } from "../Services/PermissionsService";
import { Toast } from "../helpers/Toast";
import {logoutUser} from '../Api/authApi';
import {usePermissions } from '../Context/PermissionsContext'
import LogoLoader from '../helpers/loader'

const ProtectedRoute = ({ children, requiredPermission }) => {
  const token = getToken();
  const location = useLocation();
  const { permissions ,loading } = usePermissions();

  // Handle token expiration
  if (!token || isTokenExpired()) {
    removeToken();
    Toast("warning", "Your Session Ended, We Will Redirect You To Login Page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (loading) {
    return <LogoLoader loading={loading} />;
  }
  // // Wait until permissions are loaded
  // if (permissions === null) {
  //   return <LogoLoader loading={loading} />
  // }

  // Check for required permission
  if (requiredPermission && !permissions.includes(requiredPermission)) {
    Toast("error", "You are not authorized to view this page");
    logoutUser();
    return <Navigate to="/login" replace />;
  }

  return children || <LogoLoader loading={loading}/>;
};


export default ProtectedRoute;
