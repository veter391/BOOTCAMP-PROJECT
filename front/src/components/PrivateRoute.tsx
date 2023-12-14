import React, { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import { Navigate } from 'react-router-dom';

function PrivateRoute ({ children }) {
  const { user } = useContext(AppContext);
  const isExpired = user?.exp < Date.now();
  console.log(user?.exp);

  if (!user || isExpired) {
    return <Navigate to='/*'/>;
  }
  return children;
}

export default PrivateRoute;
