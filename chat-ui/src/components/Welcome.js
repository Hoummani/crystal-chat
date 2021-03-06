import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar } from './core/Navbar';
import { WelcomeImage } from './WelcomeImage';

export function Welcome() {

  const history = useHistory();
  return (
    <div className="welcome">
      <Navbar />
      <br />
      <br />
      <div className="grid md:grid-cols-2 p-5 overflow-hidden">
          {/**
           * <img src="/img/undraw_Updated_re_u4yh.svg" alt="welcome page" />
           */}
        <div className="w-full">
          <WelcomeImage />
        </div>
        <div className="p-5">
          <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-800">
            Welcome to Crystal Chat
          </h2>
          <br />
          <div>
            <p className="text-sm leading-5 text-center text-gray-600">
              The <span className="text-teal-400">Crystal Chat </span> 
              app provide a real time chat room <br/>
              using the latest technologies of GraphQL Subscription. <br/>
              Also provide a way to schedule your agenda
            </p>
          </div>
         {/**
          *  <div className="flex justify-center mt-10">
            <Loader />
          </div>
          */}
          <div className="buttons flex justify-center mt-6">
            <button 
              type="button" 
              className="group py-1 px-4 mr-4 border border-transparent 
                text-sm leading-5 font-medium rounded-md text-white 
                bg-teal-500 hover:bg-teal-400 focus:outline-none 
                focus:border-teal-400 focus:shadow-outline-teal 
                active:bg-teal-400 active:outline-none transition duration-150 ease-in-out" 
              onClick={() => {
                history.push('/register');
              }}
            >
              Register
            </button>
            <button 
              type="button" 
              className="group py-1 px-4 mr-4 border 
                text-sm leading-5 font-medium rounded-md text-gray-700 
                bg-white-500 hover:bg-gray-100 focus:outline-none 
                focus:border-gray-100 focus:shadow-outline-white 
                active:bg-gray-100 active:outline-none transition duration-150 ease-in-out" 
              onClick={() => {
                history.push('/login');
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};