import React, { createContext, useReducer } from 'react';
import { chatReducer } from '../reducers/chatReducer';

export const ChatContext = createContext();
export function ChatContextProvider(props) {
  // states
  const state = {
    myContacts: [],
    currentContact: null,
    chats: []
  };
  const [chatState, dispatch] = useReducer(chatReducer, state);
  return (
    <ChatContext.Provider value={{ chatState, dispatch }}>
      {props.children}
    </ChatContext.Provider>
  )
}