import { Navigate } from 'react-router-dom'
import { FC } from 'react';

type PrivateRoutePropsType = {
  data: object,
  pathTo: string,
  children: FC // functionComponent type
}

function PrivateRoute({data ,pathTo, children} : PrivateRoutePropsType) {
  if(!data) {
    return <Navigate to={pathTo} replace />
  }

  return children
}

function PublicRoute({ data, children }: PrivateRoutePropsType) {
  if (!data) {
    return <Navigate to={'/login'} replace />
  }

  return children
}

export {
  PrivateRoute,
  PublicRoute
};
