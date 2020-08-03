/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from 'react';
import { useLazyQuery, useSubscription } from '@apollo/react-hooks';
import { ChatBoxForm } from './ChatBoxForm';
import { ChatContext } from '../../contexts/ChatContext';
import { AuthContext } from '../../contexts/AuthContext';
import { GET_CHATS, NEW_CHAT } from '../../apollo-client/chatGql';
import { Loader } from '../core/Loader';

export function ChatBox() {

  // context
  const { chatState, dispatch } = useContext(ChatContext);
  const { currentReceiver, chats } = chatState;
  const { authState } = useContext(AuthContext);
  const { currentUser } = authState;
  // apollo
  const [getChats, { data: chatsData, loading: chatsLoading }] = useLazyQuery(GET_CHATS);
  const { data: newChatData, error } = useSubscription(NEW_CHAT);

  // refs
  const scrollabChat = useRef();
  // effects
  useEffect(() => {
    if (currentReceiver) {
      const loadChats = async () => {
        try {
          await getChats({
            variables: {
              receiver: currentReceiver
            }
          })
        } catch (err) {
          console.log(err);
        }
      };
      dispatch({ type: 'CLEAR_CHATS' });
      loadChats();
    }
  }, [currentReceiver]);
  useEffect(() => {
    if (chatsData && chatsData.getChats) {
      dispatch({ type: 'SET_CHATS', chats: chatsData.getChats });
    }
  }, [chatsData]);

  // real staff effects
  useEffect(() => {
    if (newChatData && newChatData.newChat && currentReceiver) {
      //console.log(newChatData.newChat);
      if (newChatData.newChat.sender && 
        newChatData.newChat.sender._id.toString() === currentReceiver.toString()
      ) {
        dispatch({ type: 'ADD_CHAT', chats: chats, newChat: newChatData.newChat });
      }
    }
    if (error) {
      console.log(error);
    }
  }, [newChatData, error]);

  useEffect(() => {
    scrollabChat.current.scrollTop = scrollabChat.current.scrollHeight;
  }, [chats]);
  return (
    <>
    <div 
      className="md:col-span-2 p-6 bg-fixed h-full md:overflow-y-auto"
      style={{backgroundImage: "url('/img/bg_oc_things_grey.jpeg')", height: "85vh"}}
      ref={scrollabChat}
    >
      <div 
        className="chat-content"
      >
        <>
          {chatsLoading ? (
            <div className="mt-6 flex justify-center">
              <Loader />
            </div>
          ) : null}
        </>
        <>
          { chats && chats.length > 0 ? (
            <>
              {chats.map((chat, index) => {
                return (
                  <div key={index}>
                    { currentUser && chat.sender && currentUser._id === chat.sender._id ? (
                      <ul className="my-chat my-6">
                        <li>
                          <div className="flex justify-end">
                            <div 
                              className="bg-teal-500 text-white text-sm border-1 
                                border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
                            >
                              {chat.content}
                            </div>
                            <div className="relative mr-4">
                              <div  
                                className="text-sm ml-2 w-10 h-10 leading-none 
                                  rounded-full bg-local bg-cover"
                                style={{ backgroundImage: `url('${process.env.REACT_APP_FILES_STORE}${currentUser.avatar}` }}
                              />
                            </div>
                          </div>
                        </li>
                      </ul>
                    ): (
                      <ul className="friend-chat my-6">
                        <li>
                          <div className="flex justify-start">
                            <div className="relative mr-4">
                              <div  
                                className="text-sm w-10 h-10 leading-none 
                                  rounded-full bg-local bg-cover"
                                style={{ backgroundImage: `url('${process.env.REACT_APP_FILES_STORE}${chat.sender.avatar}` }}
                              />
                            </div>
                            <div 
                              className="bg-gray-200 text-sm border-1 
                                border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
                            >
                              {chat.content}
                            </div>
                          </div>
                        </li>
                      </ul>
                    ) }
                  </div>
                )
              })}
            </>
          ) : (
            <div 
                className="px-4 py-3" 
                role="alert"
            >
              <div className="py-1">
                <img 
                  src="/img/undraw_Friends_online_re_r7pq.svg" 
                  className="" 
                  alt="no_chat-data" 
                />
              </div>
            </div>
          ) }
        </>
        
        <br />
        <br />
      </div>
      
      <ChatBoxForm />
    </div>
    </>
  )
}