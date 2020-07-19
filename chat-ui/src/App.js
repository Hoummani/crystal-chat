import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Welcome } from './components/Welcome';
import { LoginPage } from './components/LoginPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
