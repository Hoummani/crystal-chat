/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import Moment from 'react-moment';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { GET_USERS, JOIN_USER } from '../../apollo-client/chatGql';
import { AuthContext } from '../../contexts/AuthContext';
import { ChatContext } from '../../contexts/ChatContext';
import { Loader } from '../core/Loader';
import './modal_style.css';

export function InviteContactModal({ setOpenInviteContactModal }) {
  // states
  const [users, setUsers] = useState([]);
  // apollo
  const [getUsers, { data: usersData, loading:usersLoading }] = useLazyQuery(GET_USERS);
  const [joinUser, { data: joinData }] = useMutation(JOIN_USER);
  //contexts
  const { authState } = useContext(AuthContext);
  const { currentUser } = authState;
  const { chatState } = useContext(ChatContext);
  const { myContacts } = chatState;
  // functions
  const handleJoin = async (user) => {
    const result = window
      .confirm(`Make sure you want to add ${user.firstName} ${user.lastName} to your contacts ?`);
    if (result) {
      try {
        await joinUser({
          variables: {
            friendId: user._id
          }
        })
      } catch (err) {
        console.log(err);
      }
    }
  }
  // effects
  useEffect(() => {
    const loadUsers = async () => {
      try {
        await getUsers();
      } catch (err) {
        console.log(err);
      }
    };
    loadUsers();
  }, []);
  useEffect(() => {
    if (usersData && usersData.getUsers) {
      let usersWithOutCurrentUser = [];
      if(currentUser) {
        usersWithOutCurrentUser = usersData.getUsers.filter(item => item._id !== currentUser._id);
      }
      setUsers(usersWithOutCurrentUser);
    }
  }, [usersData]);

  // Joining effects
  useEffect(() => {
    if (joinData && joinData.joinUser) {
      //dispatch({ type: 'SET_MY_CONTACTS', myContacts: [...myContacts, joinData.joinUser.friend] });
      setOpenInviteContactModal(false);
    }
  }, [joinData]);
  return (
    <div className="modal z-50 fixed w-full h-full top-0 left-0 
      flex items-center justify-center"
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto 
        rounded shadow-lg z-50 overflow-y-auto"
      >
        <div 
          className="modal-close absolute top-0 right-0 cursor-pointer flex 
            flex-col items-center mt-4 mr-4 text-white text-sm z-50"
        >
          <svg 
            className="fill-current text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" height="18" 
            viewBox="0 0 18 18"
          >
            <path 
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 
                1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" 
            />
          </svg>
          <span className="text-sm">(Esc)</span>
        </div>
        {/** Add margin if you want to see some of the overlay behind the modal */}
        <div className="modal-content py-4 text-left px-6">
          {/** Title */}
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Make New Friends</p>
            <div className="modal-close cursor-pointer z-50">
              <button 
                type="button"
                className="focus:outline-none"
                onClick={() => {
                  setOpenInviteContactModal(false);
                }}
              >
                <svg 
                  className="fill-current text-black" 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 18 18"
                >
                  <path 
                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 
                      4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" 
                  />
                </svg>
              </button>
            </div>
          </div>
          <hr />
          {/** Body */}
          <div className="py-2">
            <>
              { usersLoading ? (
                <div className="mt-6 flex justify-center">
                  <Loader />
                </div>
              ) : null }
            </>
            <>
              { users && users.length > 0 ? (
                <ul>
                  {users.map(user => {
                    return (
                      <li 
                        className="py-2 pl-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                        key={user._id}
                      >
                        <div className="flex justify-start items-center">
                          <div className="relative mr-4">
                            <div  
                              className="text-sm w-10 h-10 leading-none 
                                rounded-full bg-local bg-cover"
                              style={{ 
                                backgroundImage: `url('${process.env.REACT_APP_FILES_STORE}${user.avatar}')` 
                              }}
                            />
                            <>
                              {user.isOnline ? (
                                <span 
                                  className="absolute w-3 h-3 bg-teal-300 
                                    rounded-full bottom-0 right-0" 
                                />
                              ) : null}
                            </>
                          </div>
                          <div className="">
                            <span 
                              className="block text-gray-700 text-md font-bold"
                            >
                              {user.firstName} {user.lastName}
                            </span>
                            <Moment 
                              format="Do MMM YYYY" 
                              withTitle 
                              className="block text-gray-400 text-sm"
                            >
                              {new Date(Number(user.createdAt))}
                            </Moment>
                          </div>
                          <div className="pl-8">
                            <button 
                              type="button" 
                              className="group w-full py-2 px-4 mr-4 border border-transparent 
                                text-sm leading-5 font-medium rounded-md text-gray-700 
                                bg-gray-300 hover:bg-gray-400 focus:outline-none 
                                focus:border-gray-400 focus:shadow-outline-gray 
                                active:bg-gray-400 active:outline-none transition 
                                duration-150 ease-in-out"
                                
                              onClick={handleJoin.bind(this, user)}
                            >
                              <span className="mr-2">
                                <i className="fas fa-address-book" />
                              </span>
                              Join
                            </button>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <div 
                  className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 
                    px-4 py-3 shadow-md" 
                    role="alert"
                  >
                  <div className="flex">
                    <div className="py-1">
                      <svg 
                        className="fill-current h-6 w-6 text-teal-500 mr-4" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          d="M2.93 17.07A10 10 0 1 1 17.07 2.93 
                            10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 
                            0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 
                            11V9h2v6H9v-4zm0-6h2v2H9V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold">No User is registered</p>
                      <p className="text-sm">The list fitched is empty in this platform</p>
                    </div>
                  </div>
                </div>
              ) }
            </>
          </div>
          {/** Footer */}
          {/**
           * <div className="flex justify-end pt-2">
            <button className="px-4 bg-transparent p-1 rounded-lg text-teal-500 
              hover:bg-gray-100 hover:text-teal-400 mr-2"
            >
              Confirm
            </button>
          </div>
           */}
        </div>
      </div>
    </div>
  )
}