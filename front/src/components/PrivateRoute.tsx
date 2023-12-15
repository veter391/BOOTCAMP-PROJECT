import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import { Navigate } from 'react-router-dom';

function PrivateRoute ({ children }: any) {
  const { user } = useContext(AppContext);
  const token = localStorage.getItem('token');
  console.log(token);
  // const isTokenExpired = jwt.verify(token, process.env.JWT_SECRET);
  const isUserExpired = user?.exp < Date.now();
  // console.log(isTokenExpired);
  //* Añadir al if --->  || isTokenExpired
  if (!user || isUserExpired) {
    return <Navigate to='/*'/>;
  }
  return children;
}

export default PrivateRoute;
