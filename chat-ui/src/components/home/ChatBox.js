import React, { useContext, useEffect } from 'react';
import { ChatBoxForm } from './ChatBoxForm';
import { ChatContext } from '../../contexts/ChatContext';

export function ChatBox() {

  // context
  const { chatState } = useContext(ChatContext);
  const { currentChat } = chatState;

  // effects
  useEffect(() => {
    if (currentChat) {
      console.log("Current Chat :" + currentChat);
    }
  }, [currentChat])
  return (
    <>
    <div 
      className="md:col-span-2 p-6 bg-fixed h-full md:overflow-y-auto"
      style={{backgroundImage: "url('/img/bg_oc_things_grey.jpeg')", height: "85vh"}}
    >
      <div 
        className="chat-content"
      >
        <ul className="friend-chat my-6">
          <li>
            <div className="flex justify-start">
              <div className="relative mr-4">
                <div  
                  className="text-sm w-10 h-10 leading-none 
                    rounded-full bg-local bg-cover"
                  style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
                />
              </div>
              <div 
                className="bg-gray-200 text-sm border-1 
                  border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
              >
                Hi there I'am lokking for a simple chart of my life
              </div>
            </div>
          </li>
        </ul>
        <ul className="my-chat my-6">
          <li>
            <div className="flex justify-end">
              <div 
                className="bg-teal-500 text-white text-sm border-1 
                  border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
              >
                Hi there I'am lokking for a simple hhhhhhhhhhhhhhhhhhh chart of my life
              </div>
              <div className="relative mr-4">
                <div  
                  className="text-sm ml-2 w-10 h-10 leading-none 
                    rounded-full bg-local bg-cover"
                  style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
                />
              </div>
            </div>
          </li>
        </ul>
        <ul className="friend-chat my-6">
          <li>
            <div className="flex justify-start">
              <div className="relative mr-4">
                <div  
                  className="text-sm w-10 h-10 leading-none 
                    rounded-full bg-local bg-cover"
                  style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
                />
              </div>
              <div 
                className="bg-gray-200 text-sm border-1 
                  border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
              >
                Hi there I'am lokking for a simple chart of my life
              </div>
            </div>
          </li>
        </ul>
        <ul className="my-chat my-6">
          <li>
            <div className="flex justify-end">
              <div 
                className="bg-teal-500 text-white text-sm border-1 
                  border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
              >
                Hi there I'am lokking for a simple hhhhhhhhhhhhhhhhhhh chart of my life
              </div>
              <div className="relative mr-4">
                <div  
                  className="text-sm ml-2 w-10 h-10 leading-none 
                    rounded-full bg-local bg-cover"
                  style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
                />
              </div>
            </div>
          </li>
        </ul>
        <ul className="friend-chat my-6">
          <li>
            <div className="flex justify-start">
              <div className="relative mr-4">
                <div  
                  className="text-sm w-10 h-10 leading-none 
                    rounded-full bg-local bg-cover"
                  style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
                />
              </div>
              <div 
                className="bg-gray-200 text-sm border-1 
                  border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
              >
                Hi there I'am lokking for a simple chart of my life
              </div>
            </div>
          </li>
        </ul>
        <ul className="my-chat my-6">
          <li>
            <div className="flex justify-end">
              <div 
                className="bg-teal-500 text-white text-sm border-1 
                  border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
              >
                Hi there I'am lokking for a simple hhhhhhhhhhhhhhhhhhh chart of my life
              </div>
              <div className="relative mr-4">
                <div  
                  className="text-sm ml-2 w-10 h-10 leading-none 
                    rounded-full bg-local bg-cover"
                  style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
                />
              </div>
            </div>
          </li>
        </ul>
        <ul className="friend-chat my-6">
          <li>
            <div className="flex justify-start">
              <div className="relative mr-4">
                <div  
                  className="text-sm w-10 h-10 leading-none 
                    rounded-full bg-local bg-cover"
                  style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
                />
              </div>
              <div 
                className="bg-gray-200 text-sm border-1 
                  border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
              >
                Hi there I'am lokking for a simple chart of my life
              </div>
            </div>
          </li>
        </ul>
        <ul className="my-chat my-6">
          <li>
            <div className="flex justify-end">
              <div 
                className="bg-teal-500 text-white text-sm border-1 
                  border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
              >
                Hi there I'am lokking for a simple hhhhhhhhhhhhhhhhhhh chart of my life
              </div>
              <div className="relative mr-4">
                <div  
                  className="text-sm ml-2 w-10 h-10 leading-none 
                    rounded-full bg-local bg-cover"
                  style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
                />
              </div>
            </div>
          </li>
        </ul>
        <ul className="friend-chat my-6">
          <li>
            <div className="flex justify-start">
              <div className="relative mr-4">
                <div  
                  className="text-sm w-10 h-10 leading-none 
                    rounded-full bg-local bg-cover"
                  style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
                />
              </div>
              <div 
                className="bg-gray-200 text-sm border-1 
                  border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
              >
                Hi there I'am lokking for a simple chart of my life
              </div>
            </div>
          </li>
        </ul>
        <ul className="my-chat my-6">
          <li>
            <div className="flex justify-end">
              <div 
                className="bg-teal-500 text-white text-sm border-1 
                  border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
              >
                Hi there I'am lokking for a simple hhhhhhhhhhhhhhhhhhh chart of my life
              </div>
              <div className="relative mr-4">
                <div  
                  className="text-sm ml-2 w-10 h-10 leading-none 
                    rounded-full bg-local bg-cover"
                  style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
                />
              </div>
            </div>
          </li>
        </ul>
        <ul className="friend-chat my-6">
          <li>
            <div className="flex justify-start">
              <div className="relative mr-4">
                <div  
                  className="text-sm w-10 h-10 leading-none 
                    rounded-full bg-local bg-cover"
                  style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
                />
              </div>
              <div 
                className="bg-gray-200 text-sm border-1 
                  border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
              >
                Hi there I'am lokking for a simple chart of my life
              </div>
            </div>
          </li>
        </ul>
        <ul className="my-chat my-6">
          <li>
            <div className="flex justify-end">
              <div 
                className="bg-teal-500 text-white text-sm border-1 
                  border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
              >
                Hi there I'am lokking for a simple hhhhhhhhhhhhhhhhhhh chart of my life
              </div>
              <div className="relative mr-4">
                <div  
                  className="text-sm ml-2 w-10 h-10 leading-none 
                    rounded-full bg-local bg-cover"
                  style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
                />
              </div>
            </div>
          </li>
        </ul>
        <ul className="friend-chat my-6">
          <li>
            <div className="flex justify-start">
              <div className="relative mr-4">
                <div  
                  className="text-sm w-10 h-10 leading-none 
                    rounded-full bg-local bg-cover"
                  style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
                />
              </div>
              <div 
                className="bg-gray-200 text-sm border-1 
                  border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
              >
                Hi there I'am lokking for a simple chart of my life
              </div>
            </div>
          </li>
        </ul>
        <ul className="my-chat my-6">
          <li>
            <div className="flex justify-end">
              <div 
                className="bg-teal-500 text-white text-sm border-1 
                  border-gray-700 rounded-lg w-full md:w-64 px-2 py-2"
              >
                Hi there I'am lokking for a simple hhhhhhhhhhhhhhhhhhh chart of my life
              </div>
              <div className="relative mr-4">
                <div  
                  className="text-sm ml-2 w-10 h-10 leading-none 
                    rounded-full bg-local bg-cover"
                  style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
                />
              </div>
            </div>
          </li>
        </ul>
        <br />
        <br />
      </div>
      
      <ChatBoxForm />
    </div>
    </>
  )
}