import React from 'react';
import '../css/custom.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import {
  RelayEnvironmentProvider,
} from 'react-relay/hooks';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import RelayEnvironment from '../RelayEnvironment';
import { HomeScreen } from './HomeScreen';
import NewPostScreen from './NewPostScreen';
import Signup from './authentication/Signup';
import Login from './authentication/Login';
import ForgotPassword from './authentication/ForgotPassword';
import { AuthProvider } from "../contexts/AuthContext";
import ProtectedRoute from './ProtectedRoute';

function App() {
  const environment = RelayEnvironment;
  return (
    <RelayEnvironmentProvider environment={environment}>
      <AuthProvider>
        <Router>
          <Switch>
            <ProtectedRoute path="/" exact component={HomeScreen}></ProtectedRoute>
            <ProtectedRoute path="/new/post" component={NewPostScreen}></ProtectedRoute>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path='/forgot-password' component={ForgotPassword}></Route>
          </Switch>
        </Router>
      </AuthProvider>
    </RelayEnvironmentProvider>
  );
}

export default App;
