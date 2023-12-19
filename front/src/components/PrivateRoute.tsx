import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import { Navigate } from 'react-router-dom';

function PrivateRoute ({ children }: {children : any}) {
  const { user }:any = useContext(AppContext);
  const isUserExpired = user?.exp < Date.now();

  //* Añadir al if --->  || isTokenExpired
  if (!user || isUserExpired) {
    return <Navigate to='/*'/>;
  }
  return children;
}

export default PrivateRoute;
