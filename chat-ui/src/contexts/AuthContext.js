/* eslint-disable react-hooks/exhaustive-deps */
import React,{ createContext, useReducer } from 'react';
import { authReducer } from '../reducers/authReducer';
export const AuthContext = createContext();
export function AuthContextProvider(props){
  const state = {
    currentUser: null,
    authData: {
      userId: '',
      token: ''
    },
    notifications: []
  };
  const [authState, dispatch] = useReducer(authReducer, state );
  return (
    <AuthContext.Provider
      value={{ authState, dispatch }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}