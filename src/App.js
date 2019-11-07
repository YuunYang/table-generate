import React from 'react';
import Generate from './Generate';
import Table from './table';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/table">
            <Table />
          </Route>
          <Route path="/">
            <Generate />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
