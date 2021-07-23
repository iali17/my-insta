import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAuth } from '../contexts/AuthContext';


export default function ProtectedRoute({...routeProps}: RouteProps) {
  const { currentUser } = useAuth();

  if(currentUser) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: "/login" }} />;
  }
};
