import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import { Navigate } from 'react-router-dom';

function PrivateRoute ({ children }: {children : object}) {
  const { user } = useContext(AppContext);
  const isUserExpired = user?.exp < Date.now();

  //* Añadir al if --->  || isTokenExpired
  if (!user || isUserExpired) {
    return <Navigate to='/*'/>;
  }
  return children;
}

export default PrivateRoute;
