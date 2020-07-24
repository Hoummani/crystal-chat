/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { Route, Switch } from 'react-router-dom';
import { Welcome } from './components/Welcome';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { Home } from './components/home/Home';
import { AuthContextProvider } from './contexts/AuthContext';
import { Unauthorized } from './components/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import { CHECK_TOKEN_IS_VALID } from './apollo-client/authGql';
import { Profile } from './components/home/Profile';

function App() {
  //token
  let token = localStorage.getItem("token");
  // apollo
  const [checkTokenIsValid, { error }] = useLazyQuery(CHECK_TOKEN_IS_VALID);

  //effects
  useEffect(() => {
    const loadTokenValidation = async () => {
      try {
        await checkTokenIsValid();
      } catch (err) {
        localStorage.removeItem("token");
      }
    };
    loadTokenValidation();
  }, [])
  useEffect(() => {
    if (error) {
      localStorage.removeItem("token");
    }
  }, [error]);
  return (
    <div className="App">
      <AuthContextProvider>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <ProtectedRoute exact path="/home" token={token} component={Home} />
          <ProtectedRoute exact path="/profile" token={token} component={Profile} />
          <Route exact path="/unauthorized" component={Unauthorized} />
          <Route exact path="**" component={Unauthorized} />
        </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;
