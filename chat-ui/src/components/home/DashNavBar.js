/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { AccountDropDown } from '../core/AccountDropDown';

export function DashNavBar() {
  return (
    <nav 
      className="flex items-center justify-between 
        flex-wrap bg-teal-500 shadow-md p-5 w-full m-0"
    >
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <i 
          className="fab fa-rocketchat font-semibold text-2xl tracking-tight" 
          style={{marginRight: '5px'}} 
        />
        <span className="font-semibold text-2xl tracking-tight">
          <Link to="/">Crystal Chat</Link>
        </span>
      </div>
      <div className="flex justify-end items-center">
        <a href="#" className="text-white mr-8 relative">
          <span>
            <i 
              className="fab fa-facebook-messenger font-semibold text-2xl tracking-tight" 
            />
          </span>
          <span 
            className="bg-red-500 text-xs text-white rounded-full px-1 font-bold absolute top-0"
          >
            3
          </span>
        </a>
        <div className="relative">
          <div  
            className="text-sm w-10 h-10 leading-none 
              rounded-full bg-local bg-cover hidden md:inline-block"
            style={{ backgroundImage: " url('/img/bg-1.jpg')" }}
          />
        </div>
        {/**
         * <a href="#" className="text-white ml-2">
          <span>
            <i 
              className="far fa-caret-square-down font-semibold text-xl tracking-tight" 
            />
          </span>
        </a>
         */}
        <AccountDropDown />
      </div>
    </nav>
  )
}