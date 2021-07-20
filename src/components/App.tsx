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
import { AuthProvider } from "../contexts/AuthContext"

function App() {
  const environment = RelayEnvironment;
  return (
    <RelayEnvironmentProvider environment={environment}>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={HomeScreen}></Route>
            <Route path="/new/post" component={NewPostScreen}></Route>
            <Route path="/signup" component={Signup}></Route>
          </Switch>
        </Router>
      </AuthProvider>
    </RelayEnvironmentProvider>
  );
}

export default App;
