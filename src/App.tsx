import React from 'react';
import './css/custom.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import {
  RelayEnvironmentProvider,
} from 'react-relay/hooks';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import RelayEnvironment from './RelayEnvironment';
import { HomeScreen } from './components/HomeScreen';
import NewPostScreen from './components/NewPostScreen';

function App() {
  const environment = RelayEnvironment;
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Router>
        <Route path="/" exact component={HomeScreen}></Route>
        <Route path="/new/post" exact component={NewPostScreen}></Route>
      </Router>
    </RelayEnvironmentProvider>
  );
}

export default App;
