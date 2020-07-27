/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { GET_MY_NOTIFICATIONS, ACCEPT_FRIENDSHIP } from '../../apollo-client/chatGql';

export function JoinNotif () {

  // states
  const [isDroped, setIsDroped] = useState(false);
  const [notifs, setNotifs] = useState([]);
  const [acceptedNotif, setAcceptedNotif] = useState(null);

  // apollo
  const [getMyNotifications, { data: notifsData }] = useLazyQuery(GET_MY_NOTIFICATIONS);
  const [acceptFrienship, { data: acceptFriendshipData }] = useMutation(ACCEPT_FRIENDSHIP);

  // functions
  const acceptJoing = async (contact, notifId) => {
    const result = window.confirm("Confirm... this actions");
    if (result) {
      setAcceptedNotif(contact);
      try {
        await acceptFrienship({
          variables: {
            contactId: contact._id,
            notifId: notifId
          }
        })
      } catch (err) {
        console.log(err);
      }
    }
  }
  // effects
  useEffect(() => {
    const loadMyNotifications = async () => {
      try {
        await getMyNotifications();
      } catch (err) {
        console.log(err);
      }
    };
    loadMyNotifications();
  }, [])
  useEffect(() => {
    if (notifsData && notifsData.getMyNotifications) {
      setNotifs(notifsData.getMyNotifications);
    }
  }, [notifsData]);

  // accept friendship effect
  useEffect(() => {
    if (acceptFriendshipData && acceptFriendshipData.acceptFrienship) {
      setNotifs(notifs.filter(item => item._id !== acceptedNotif._id));
    }
  }, [acceptFriendshipData]);
  return (
    <div 
      className="relative z-50"
      onMouseEnter={() => {
        setIsDroped(true);
      }}
    >
      <div 
        className="text-white ml-2 cursor-pointer"
      >
        <button 
          className="focus:outline-none" 
          type="button"
          onClick={() => {
            setIsDroped(!isDroped);
          }}
        >
          <a href="#" className="text-white mr-8 relative">
            <span>
              <i 
                className="fas fa-user-friends font-semibold text-2xl tracking-tight" 
              />
            </span>
            <>
              {notifs && notifs.length > 0 ? (
                <span 
                  className="bg-red-500 text-xs text-white rounded-full px-1 font-bold absolute top-0"
                >
                  {notifs.length}
                </span>
              ) : null}
            </>
          </a>
        </button>
        <>
          {isDroped ? (
            <>
              { notifs && notifs.length > 0 ? (
                <ul 
                  className="w-64 mt-2 py-2 shadow-md absolute right-0 bg-white rounded"
                  onMouseLeave={() => {
                    setIsDroped(false);
                  }}
                >
                  {
                    notifs.map(notif => {
                      return (
                        <li key={notif._id} className="py-2 pl-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                          <div className="flex justify-start">
                            <div className="relative mr-4">
                              <div  
                                className="text-sm w-8 h-8 leading-none 
                                  rounded-full bg-local bg-cover"
                                style={{ backgroundImage: `url('${process.env.REACT_APP_FILES_STORE}${notif.sender.avatar}` }}
                              />
                            </div>
                            <div className="">
                              <span className="block text-gray-700 text-sm">
                                <span className="font-bold">{notif.sender.firstName} {notif.sender.lastName}</span>
                                <span> {notif.content}</span>
                              </span>
                              <Moment fromNow className="block text-gray-400 text-xs">
                                {new Date(Number(notif.createdAt))}
                              </Moment>
                              <div className="mt-1">
                                <button 
                                  type="button"
                                  className="text-xs text-white font-bold 
                                    py-1 bg-teal-400 px-3 focus:outline-none rounded-lg"
                                  onClick={acceptJoing.bind(this, notif.contactAbout, notif._id)}
                                  disabled={notif.visited}
                                >
                                  Accept
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                    })
                  }
              </ul>
              ) : null}
            </>
          ) : null}
        </>
      </div>
    </div>
  )
}