/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { DashNavBar } from './DashNavBar';
import { AuthContext } from '../../contexts/AuthContext';
import { LOAD_USER } from '../../apollo-client/authGql';

export function Profile() {

  // contexts
  const { authState, dispatch } = useContext(AuthContext);
  const { currentUser } = authState;
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
    <div className="">
      <DashNavBar />
      <div className="p-6 flex justify-center">
        <div className="md:w-2/3 w-full shadow-lg rounded-lg">
          <>
            {currentUser ? (
              <div className="flex">
                <img 
                  src={currentUser.avatar} 
                  className="object-cover h-64 w-64"
                  alt="user_avatar" 
                />
                <div className="pl-4">
                  <p>
                    <span className="text-md text-gray-700 font-bold mr-2">First Name :</span>
                    <span className="text-md text-gray-700">{currentUser.firstName}</span>
                  </p>
                  <p>
                    <span className="text-md text-gray-700 font-bold mr-2">Last Name :</span>
                    <span className="text-md text-gray-700">{currentUser.lastName}</span>
                  </p>
                  <p>
                    <span className="text-md text-gray-700 font-bold mr-2">Email :</span>
                    <span className="text-md text-gray-700">{currentUser.email}</span>
                  </p>
                  <p className="pt-6">
                    <input 
                      type="file"
                      className="bg-teal-500 w-full text-sm text-white 
                        py-1 focus:outline-none hover:bg-teal-400 border border-transparent 
                        leading-5 font-medium rounded-md active:bg-teal-400 
                        active:outline-none transition duration-150 ease-in-out" 
                      name="avatar"
                    />
                  </p>
                </div>
              </div>
            ) : null}
          </>
        </div>
      </div>
    </div>
  )
}