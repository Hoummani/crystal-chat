/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ChatContext } from '../../contexts/ChatContext';
import { SEND_CHAT_TO } from '../../apollo-client/chatGql';

export function ChatBoxForm() {

  // states
  const [content, setContent] = useState('');

  // contexts
  const { chatState, dispatch } = useContext(ChatContext);
  const { currentReceiver, chats } = chatState;

  // apollo
  const [sendChatTo, { data: sendChatData }] = useMutation(SEND_CHAT_TO);

  // refs
  const inputRef = useRef();
  // functions
  const handleChange = (e) => {
    setContent(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content !== '' && currentReceiver) {
      try {
        await sendChatTo({
          variables: {
            content: content,
            receiver: currentReceiver
          }
        })
      } catch (err) {
        console.log(err);
      }
    }
  };

  // effects
  useEffect(() => {
    if (sendChatData && sendChatData.sendChatTo) {
      dispatch({ type: 'ADD_CHAT', chats: chats, newChat: sendChatData.sendChatTo });
      setContent('');
      inputRef.current.value = "";
    }
  }, [sendChatData])
  return (
    <div className="chat-box-form fixed bottom-0" style={{width: '63%'}}>
      <form className="flex bg-white border-gray-200 border-t-2 py-4" onSubmit={handleSubmit}>
        <input 
          aria-label="Message" 
          name="message" 
          id="message"
          ref={inputRef}
          onChange={handleChange}
          type="text" 
          placeholder="Message.." 
          className="bg-gray-200 appearance-none border-2 border-gray-200 
            rounded w-full py-2 px-4 text-gray-700 leading-tight 
            focus:outline-none focus:bg-white focus:border-teal-500"
          required 
        />
        <button 
          type="button" 
          className="px-3 rounded-full bg-teal-500 hover:bg-teal-400 ml-1 
            focus:outline-none active:bg-teal-800 focus:bg-teal-800"
        >
          <i className="fas fa-microphone text-xl text-white font-light" />
        </button>
      </form>
    </div>
  )
}