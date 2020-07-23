/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { DashNavBar } from './DashNavBar';
import { MyFriends } from './MyFriends';
import { ChatBox } from './ChatBox';
import { AuthContext } from '../../contexts/AuthContext';
import { LOAD_USER } from '../../apollo-client/authGql';

export function Home() {

  //context
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  // apollo
  const [loadUser, { data, error }] = useLazyQuery(LOAD_USER);

  // effects
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        await loadUser();
      } catch (err) {
        console.log(err);
      }
    };
    loadUserInfo();
  }, []);
  useEffect(() => {
    if (data && data.loadUser) {
      dispatch({ type: 'SET_CURRENT_USER', currentUser: data.loadUser });
    }
    if (error) {
      localStorage.removeItem('token');
      history.push('/login');
    }
  }, [data, error])
  return (
    <div className="home">
      <DashNavBar />
      <div 
        className="grid md:grid-cols-3" 
      >
        <MyFriends />
        <ChatBox />
      </div>
    </div>
  );
}